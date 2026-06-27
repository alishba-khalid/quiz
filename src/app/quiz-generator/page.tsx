import type { Metadata } from "next";
import { auth } from "@/auth";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";

export const metadata: Metadata = {
  title: "AI Worksheet & Quiz Generator | QuizKraft",
  description:
    "Generate customized educational worksheets and quizzes for any subject, grade level, and format using AI. Free for teachers — no credit card required.",
  keywords: [
    "worksheet generator",
    "quiz maker",
    "AI teacher tool",
    "free worksheets",
    "educational quiz generator",
  ],
  openGraph: {
    title: "AI Worksheet & Quiz Generator | QuizKraft",
    description:
      "Generate educational worksheets in seconds using AI. Free for teachers.",
    type: "website",
  },
};

export default async function QuizGeneratorPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-gradient-to-b from-indigo-50 to-white border-b border-zinc-100 py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-zinc-900">
          Worksheet &amp; Quiz Generator
        </h1>
        <p className="mt-2 text-zinc-500 max-w-lg mx-auto">
          Enter a topic and let AI build a complete, printable worksheet in seconds.
        </p>
        {!session && (
          <p className="mt-3 text-sm text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full inline-block px-4 py-1.5">
            Sign in to save worksheets and track your usage
          </p>
        )}
      </div>
      <QuizGeneratorForm isLoggedIn={!!session} isPro={isPro} />
    </div>
  );
}
