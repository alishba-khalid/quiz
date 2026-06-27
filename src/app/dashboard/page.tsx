import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | QuizKraft",
  description: "View and manage your generated worksheets and quizzes.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const params = await searchParams;

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      worksheets: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          topic: true,
          gradeLevel: true,
          worksheetType: true,
          questionsCount: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) redirect("/login");

  const isPro = user.plan === "PRO";
  const remaining = Math.max(0, 5 - user.usageCount);
  const showSuccess = params.success === "true";

  const worksheets = user.worksheets.map((w) => ({
    ...w,
    createdAt: w.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col flex-1 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
            <p className="text-zinc-500 mt-1 text-sm">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>
          <Link
            href="/quiz-generator"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            + New Worksheet
          </Link>
        </div>

        {showSuccess && (
          <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-medium">
            You&apos;re now on Pro! Enjoy unlimited worksheets and answer keys.
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-zinc-100 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {user.worksheets.length}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Total worksheets</div>
          </div>
          <div className="bg-white rounded-xl border border-zinc-100 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {isPro ? "∞" : `${user.usageCount}/5`}
            </div>
            <div className="text-xs text-zinc-500 mt-1">This month</div>
          </div>
          <div className="bg-white rounded-xl border border-zinc-100 p-4 text-center">
            <div
              className={`text-sm font-bold px-2 py-1 rounded-full inline-block ${
                isPro
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {isPro ? "PRO" : "FREE"}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Current plan</div>
          </div>
        </div>

        {/* Upgrade banner */}
        {!isPro && (
          <div className="mb-6 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Unlock unlimited worksheets + answer keys
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {remaining > 0
                  ? `${remaining} free worksheet${remaining === 1 ? "" : "s"} remaining this month.`
                  : "You've used all 5 free worksheets this month."}
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0"
            >
              Upgrade to Pro — $9/mo
            </Link>
          </div>
        )}

        <DashboardClient worksheets={worksheets} />
      </div>
    </div>
  );
}
