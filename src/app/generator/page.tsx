import type { Metadata } from "next";
import { auth } from "@/auth";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";

export const metadata: Metadata = {
  title: "AI Worksheet & Quiz Generator | QuizKraft",
  description:
    "Generate customized educational worksheets and quizzes for any subject, grade level, and question type using AI. Free — no credit card required.",
  openGraph: {
    title: "AI Worksheet & Quiz Generator | QuizKraft",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds.",
    type: "website",
  },
};

export default async function GeneratorPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <QuizGeneratorForm isLoggedIn={!!session} isPro={isPro} />
    </div>
  );
}
