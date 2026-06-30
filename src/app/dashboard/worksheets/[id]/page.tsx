import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

interface ContentItem {
  i: number;
  type: "multiple-choice" | "true-false" | "short-answer" | "fill-in-the-blank";
  q: string;
  options?: string[] | null;
}

interface AnswerKeyItem {
  i: number;
  type: string;
  q: string;
  answer: string;
  explanation: string;
}

const typeLabel: Record<string, string> = {
  "multiple-choice": "Multiple choice",
  "true-false": "True / False",
  "short-answer": "Short answer",
  "fill-in-the-blank": "Fill in the blank",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const worksheet = await db.worksheet.findUnique({
    where: { id },
    select: { title: true },
  });
  return { title: worksheet ? `${worksheet.title} | QuizKraft` : "Worksheet | QuizKraft" };
}

export default async function WorksheetViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const worksheet = await db.worksheet.findUnique({
    where: { id },
    include: { user: { select: { email: true } } },
  });

  if (!worksheet || worksheet.user.email !== session.user.email) notFound();

  const content = worksheet.content as ContentItem[];
  const answerKey = worksheet.answerKey as AnswerKeyItem[] | null;

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-8 pb-6 border-b border-hairline">
          <h1 className="text-2xl font-semibold text-ink">{worksheet.title}</h1>
          <p className="text-sm text-muted mt-1">
            {worksheet.gradeLevel} · {worksheet.worksheetType} · {worksheet.questionsCount} questions
          </p>
          <div className="mt-3 flex gap-8 text-sm text-muted">
            <span>
              Name:{" "}
              <span className="inline-block w-40 border-b border-ink/30 ml-1" />
            </span>
            <span>
              Date:{" "}
              <span className="inline-block w-24 border-b border-ink/30 ml-1" />
            </span>
          </div>
        </div>

        <div className="space-y-7">
          {content.map((q, i) => (
            <div key={i}>
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <span className="inline-block text-xs font-medium text-muted bg-canvas border border-hairline rounded-full px-2 py-0.5 mr-2 mb-1">
                    {typeLabel[q.type] ?? q.type}
                  </span>
                  <p className="font-medium text-ink">{q.q}</p>
                </div>
              </div>

              <div className="ml-9">
                {q.type === "multiple-choice" && q.options ? (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2.5 text-sm text-ink px-3 py-2.5 rounded-xl border border-hairline bg-canvas"
                      >
                        <span className="font-semibold text-muted w-4 flex-shrink-0">
                          {String.fromCharCode(65 + j)}.
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                ) : q.type === "true-false" ? (
                  <div className="flex gap-3">
                    {["True", "False"].map((opt) => (
                      <div
                        key={opt}
                        className="flex items-center gap-2 text-sm text-ink px-4 py-2.5 rounded-xl border border-hairline bg-canvas"
                      >
                        <div className="w-4 h-4 rounded-full border-2 border-hairline flex-shrink-0" />
                        {opt}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 border-b border-hairline" />
                    <div className="h-8 border-b border-hairline" />
                  </div>
                )}

                {answerKey?.[i] && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-correct bg-correct-soft border border-correct/20 rounded-xl px-3 py-2.5">
                    <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{answerKey[i].answer}</span>
                      <p className="text-xs text-muted mt-0.5">{answerKey[i].explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
