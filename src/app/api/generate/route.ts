import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { MAX_TRANSCRIPT_CHARS } from "@/lib/constants";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Please log in to generate quizzes.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Everything below ends up in the AI prompt, so cap lengths and whitelist enums.
    const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const subject = str(body.subject, 100);
    const grade = str(body.grade, 50);
    const topic = str(body.topic, 300);
    const sourceMaterial = str(body.sourceMaterial, MAX_TRANSCRIPT_CHARS);
    const difficulty = ["Easy", "Medium", "Hard"].includes(body.difficulty) ? body.difficulty : "Medium";
    const rawVideo = body.videoInfo && typeof body.videoInfo === "object" ? body.videoInfo : null;
    const videoInfo = rawVideo
      ? {
          videoId: str(rawVideo.videoId, 20),
          title: str(rawVideo.title, 200),
          author: str(rawVideo.author, 100),
          thumbnail: str(rawVideo.thumbnail, 300),
          url: str(rawVideo.url, 300),
        }
      : null;

    if (!topic || !grade) {
      return NextResponse.json({ error: "Topic and grade are required." }, { status: 400 });
    }

    const qCount = Math.min(Math.max(parseInt(body.questionsCount, 10) || 5, 3), 15);
    const ALLOWED_TYPES = ["multiple-choice", "true-false", "short-answer", "fill-in-the-blank"];
    const requestedTypes: string[] = Array.isArray(body.questionTypes)
      ? body.questionTypes.filter((t: unknown) => typeof t === "string" && ALLOWED_TYPES.includes(t))
      : [];
    const types = requestedTypes.length > 0 ? [...new Set(requestedTypes)] : ["multiple-choice"];

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI service is not configured." }, { status: 500 });
    }

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan !== "PRO") {
      return NextResponse.json(
        { error: "Generating quizzes requires a Pro plan.", code: "PRO_REQUIRED" },
        { status: 403 }
      );
    }

    // DB-based rate limit: check most recent worksheet creation time
    const now = Date.now();
    const recent = await db.worksheet.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
    if (recent && now - recent.createdAt.getTime() < 10_000) {
      return NextResponse.json(
        { error: "Please wait 10 seconds between generations." },
        { status: 429 }
      );
    }

    // Lazy monthly reset: if lastResetDate is older than 30 days, reset usage
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    if (!user.lastResetDate || user.lastResetDate < thirtyDaysAgo) {
      await db.user.update({
        where: { id: user.id },
        data: { usageCount: 0, lastResetDate: new Date() },
      });
      user.usageCount = 0;
    }

    // Prepare source text (capped at MAX_TRANSCRIPT_CHARS)
    const cleanedSource = sourceMaterial ? sourceMaterial.slice(0, MAX_TRANSCRIPT_CHARS) : "";
    const sourceSection = cleanedSource
      ? `\nSource material / video transcript to base all questions on:\n"""\n${cleanedSource}\n"""`
      : "";

    const prompt = `You are an expert teacher creating a high-quality educational assessment.

Subject: ${subject || topic}
Grade level: ${grade}
Topic: ${topic}
Question types to use (mix these): ${types.join(", ")}
Difficulty: ${difficulty}
Number of questions: ${qCount}${sourceSection}

Return ONLY valid JSON matching this exact schema — no markdown, no code blocks:
{
  "title": "Descriptive worksheet title",
  "questions": [
    {
      "type": "multiple-choice",
      "q": "Conceptual, thought-provoking question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option B",
      "explanation": "One sentence explaining why this is correct."
    }
  ]
}

Rules:
- For "multiple-choice": include 4 options array, answer must match one option exactly
- For "true-false": options must be ["True", "False"], answer is "True" or "False"
- For "short-answer": omit options, answer is a concise phrase
- For "fill-in-the-blank": question contains "______" blank(s), omit options, answer fills the blank
- Write conceptual questions that test understanding, not just recall
- Age-appropriate language for the grade level
- All ${qCount} questions must be included${
      cleanedSource
        ? "\n- All questions MUST be directly based on the provided source material or transcript."
        : ""
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    if (!response.text) throw new Error("Empty response from AI");

    const data = JSON.parse(response.text.trim());
    // Drop malformed items so a bad AI response can't break the worksheet view.
    type AIQuestion = { type: string; q: string; options?: unknown; answer: unknown; explanation?: unknown };
    const questions = (Array.isArray(data.questions) ? data.questions : []).filter(
      (q: AIQuestion | null): q is AIQuestion =>
        !!q &&
        typeof q.q === "string" &&
        q.q.trim() !== "" &&
        ALLOWED_TYPES.includes(q.type) &&
        q.answer != null &&
        (q.type !== "multiple-choice" || (Array.isArray(q.options) && q.options.length >= 2))
    );
    if (questions.length === 0) throw new Error("AI returned no usable questions");

    const content = questions.map((q: AIQuestion, i: number) => ({
      i,
      type: q.type,
      q: q.q,
      options: Array.isArray(q.options) ? q.options.map(String) : null,
    }));

    const answerKey = questions.map((q: AIQuestion, i: number) => ({
      i,
      type: q.type,
      q: q.q,
      answer: String(q.answer),
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    }));

    const worksheet = await db.worksheet.create({
      data: {
        userId: user.id,
        title: data.title || (videoInfo?.title ? `${videoInfo.title} Quiz` : `${topic} Worksheet`),
        topic: videoInfo?.title ? `YouTube: ${videoInfo.title}` : topic,
        gradeLevel: grade,
        worksheetType: types.join(","),
        questionsCount: content.length,
        content,
        answerKey,
      },
    });
    await db.user.update({ where: { id: user.id }, data: { usageCount: { increment: 1 } } });

    return NextResponse.json({
      id: worksheet.id,
      title: data.title || (videoInfo?.title ? `${videoInfo.title} Quiz` : `${topic} Worksheet`),
      subject: subject || topic,
      grade,
      topic,
      difficulty,
      questionsCount: content.length,
      questions: content,
      answerKey,
      isPro: true,
      videoInfo: videoInfo || null,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      {
        // Don't surface internal error text (JSON parse errors, SDK messages) to users.
        error: "Couldn't generate that one. Try a more specific topic or check the transcript and try again.",
      },
      { status: 500 }
    );
  }
}
