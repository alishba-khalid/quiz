import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const FREE_LIMIT = 1;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

    const isPro = user.plan === "PRO";
    if (!isPro && user.usageCount >= FREE_LIMIT) {
      return NextResponse.json(
        { error: `You've used your ${FREE_LIMIT} free worksheet. Upgrade to Pro for unlimited generation.` },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      subject,
      grade,
      topic,
      questionTypes,
      difficulty = "Medium",
      questionsCount,
      sourceMaterial,
    } = body;

    if (!topic || !grade) {
      return NextResponse.json({ error: "Topic and grade are required." }, { status: 400 });
    }

    const qCount = Math.min(Math.max(parseInt(questionsCount, 10) || 5, 3), 15);
    const types: string[] = Array.isArray(questionTypes) && questionTypes.length > 0
      ? questionTypes
      : ["multiple-choice"];

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI service is not configured." }, { status: 500 });
    }

    const sourceSection = sourceMaterial
      ? `\nSource material to base questions on:\n"""\n${sourceMaterial.slice(0, 4000)}\n"""`
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
- All ${qCount} questions must be included`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    if (!response.text) throw new Error("Empty response from AI");

    const data = JSON.parse(response.text.trim());
    const questions: any[] = data.questions || [];

    const content = questions.map((q: any, i: number) => ({
      i,
      type: q.type,
      q: q.q,
      options: q.options || null,
    }));

    const answerKey = questions.map((q: any, i: number) => ({
      i,
      type: q.type,
      q: q.q,
      answer: q.answer,
      explanation: q.explanation,
    }));

    const worksheet = await db.worksheet.create({
      data: {
        userId: user.id,
        title: data.title || `${topic} Worksheet`,
        topic,
        gradeLevel: grade,
        worksheetType: types.join(","),
        questionsCount: qCount,
        content: content as any,
        answerKey: answerKey as any,
      },
    });

    await db.user.update({ where: { id: user.id }, data: { usageCount: { increment: 1 } } });

    return NextResponse.json({
      id: worksheet.id,
      title: worksheet.title,
      subject: subject || topic,
      grade,
      topic,
      difficulty,
      questionsCount: qCount,
      questions: content,
      answerKey,
      isPro,
    });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error.message || "Couldn't generate that one. Try a more specific topic and generate again." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
