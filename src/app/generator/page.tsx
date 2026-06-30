import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";

export const metadata: Metadata = {
  title: "AI Worksheet & Quiz Generator | QuizKraft",
  description:
    "Generate customized educational worksheets and quizzes for any subject, grade level, and question type using AI. Free — no credit card required.",
  alternates: { canonical: "https://www.quizkraft.tech/generator" },
  openGraph: {
    title: "AI Worksheet & Quiz Generator | QuizKraft",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds.",
    type: "website",
  },
};

const FREE_LIMIT = 1;

export default async function GeneratorPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  let usageCount = 0;
  if (session?.user?.email && !isPro) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { usageCount: true },
    });
    usageCount = user?.usageCount ?? 0;
  }

  const creditsLeft = isPro ? Infinity : Math.max(0, FREE_LIMIT - usageCount);

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <QuizGeneratorForm isLoggedIn={!!session} isPro={isPro} creditsLeft={creditsLeft} />
    </div>
  );
}
