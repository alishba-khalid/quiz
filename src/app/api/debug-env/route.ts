import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasGemini: !!process.env.GEMINI_API_KEY,
    geminiLen: process.env.GEMINI_API_KEY?.length ?? 0,
    hasDb: !!process.env.DATABASE_URL,
    hasNextauth: !!process.env.NEXTAUTH_SECRET,
    nodeEnv: process.env.NODE_ENV,
  });
}

export const dynamic = "force-dynamic";
