import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Best-effort in-memory rate limiting
const rateLimitCache = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Rate Limiting (10 seconds between generations)
    const lastRequest = rateLimitCache.get(user.id);
    const nowMs = Date.now();
    if (lastRequest && (nowMs - lastRequest) < 10000) {
      return NextResponse.json(
        { error: "Please wait 10 seconds between worksheet generations." },
        { status: 429 }
      );
    }
    rateLimitCache.set(user.id, nowMs);

    // 2. Enforce Free Usage Limit (5 per month)
    const now = new Date();
    const lastReset = new Date(user.lastResetDate);
    const diffTime = Math.abs(now.getTime() - lastReset.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let currentUsage = user.usageCount;
    if (diffDays >= 30) {
      await db.user.update({
        where: { id: user.id },
        data: {
          usageCount: 0,
          lastResetDate: now,
        },
      });
      currentUsage = 0;
    }

    const isPro = user.plan === "PRO";
    if (!isPro && currentUsage >= 5) {
      return NextResponse.json(
        { error: "Free limit reached. You have generated 5 worksheets this month. Upgrade to Pro for unlimited generation!" },
        { status: 403 }
      );
    }

    // 3. Parse input
    const { topic, gradeLevel, worksheetType, questionsCount } = await req.json();

    if (!topic || !gradeLevel || !worksheetType || !questionsCount) {
      return NextResponse.json(
        { error: "Missing required fields: topic, gradeLevel, worksheetType, questionsCount" },
        { status: 400 }
      );
    }

    const qCount = parseInt(questionsCount, 10);
    if (isNaN(qCount) || qCount < 1 || qCount > 30) {
      return NextResponse.json(
        { error: "Question count must be a number between 1 and 30" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // 4. Call Gemini API
    const promptText = `
You are an expert teacher's assistant. Generate a high-quality educational worksheet/quiz.
Subject/Topic: "${topic}"
Grade Level: "${gradeLevel}"
Worksheet Type: "${worksheetType}" (e.g., multiple-choice, fill-in-the-blank, short-answer, matching, true-false)
Number of questions: ${qCount}

Provide the response in raw JSON format matching this schema:
{
  "title": "Title of the worksheet",
  "instructions": "General instructions for students",
  "questions": [
    {
      "id": 1,
      "question": "Question text. For matching type, present a list of terms to match (e.g., 'Match the capital with the country.'). For fill-in-the-blank, use blank underscores (______).",
      "options": ["Option A", "Option B", "Option C", "Option D"], // Only include this array for multiple-choice or true-false. Otherwise, leave it out or set it to null.
      "answer": "The clear correct answer or matching pairs for this question"
    }
  ]
}
Ensure the content is age-appropriate for the grade level, grammatically correct, and covers the topic thoroughly. Do not wrap the JSON response in markdown code blocks. Return only valid JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini API");
    }

    const generatedData = JSON.parse(responseText.trim());

    // 5. Structure content and answer key
    const contentQuestions = generatedData.questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: q.options || null,
    }));

    const answerKeyData = generatedData.questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
    }));

    // 6. Save to DB
    const worksheet = await db.worksheet.create({
      data: {
        userId: user.id,
        title: generatedData.title || `${topic} Worksheet`,
        topic,
        gradeLevel,
        worksheetType,
        questionsCount: qCount,
        content: contentQuestions as any,
        answerKey: answerKeyData as any,
      },
    });

    // 7. Increment user usage count
    await db.user.update({
      where: { id: user.id },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    });

    // 8. Return response
    return NextResponse.json({
      id: worksheet.id,
      title: worksheet.title,
      topic: worksheet.topic,
      gradeLevel: worksheet.gradeLevel,
      worksheetType: worksheet.worksheetType,
      questionsCount: worksheet.questionsCount,
      content: contentQuestions,
      answerKey: isPro ? answerKeyData : null, // Paywall: Free users don't get the answer key
      isPro,
    });

  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate worksheet. Please try again." },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
