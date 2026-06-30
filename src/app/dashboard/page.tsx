import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import BillingPortalButton from "@/components/BillingPortalButton";

export const metadata: Metadata = {
  title: "Dashboard | QuizKraft",
  description: "View and manage your generated worksheets.",
  alternates: { canonical: "https://www.quizkraft.tech/dashboard" },
  robots: { index: false, follow: false },
};

const FREE_LIMIT = 1;

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
  const remaining = Math.max(0, FREE_LIMIT - user.usageCount);
  const showSuccess = params.success === "true";

  const worksheets = user.worksheets.map((w: (typeof user.worksheets)[number]) => ({
    ...w,
    createdAt: w.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col flex-1 bg-canvas py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
            <p className="text-muted text-sm mt-1">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20"
          >
            + New worksheet
          </Link>
        </div>

        {showSuccess && (
          <div className="mb-6 px-4 py-3 bg-correct-soft border border-correct/20 text-correct rounded-xl text-sm font-medium">
            You&apos;re now on Pro. Enjoy unlimited worksheets and PDF exports.
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface rounded-xl border border-hairline p-4 text-center">
            <div className="text-2xl font-bold text-accent">{user.worksheets.length}</div>
            <div className="text-xs text-muted mt-1">Total worksheets</div>
          </div>
          <div className="bg-surface rounded-xl border border-hairline p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {isPro ? "∞" : `${user.usageCount}/${FREE_LIMIT}`}
            </div>
            <div className="text-xs text-muted mt-1">This month</div>
          </div>
          <div className="bg-surface rounded-xl border border-hairline p-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`text-sm font-bold px-2.5 py-1 rounded-full inline-block ${
                  isPro ? "bg-accent-soft text-accent" : "bg-canvas border border-hairline text-muted"
                }`}
              >
                {isPro ? "PRO" : "FREE"}
              </span>
              {isPro && <BillingPortalButton />}
            </div>
            <div className="text-xs text-muted mt-2">Current plan</div>
          </div>
        </div>

        {!isPro && (
          <div className="mb-6 bg-accent-soft border border-accent/20 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-ink">Unlock unlimited worksheets + PDF export</p>
              <p className="text-xs text-muted mt-0.5">
                {remaining > 0
                  ? `${remaining} free worksheet${remaining === 1 ? "" : "s"} remaining this month.`
                  : "You've used your free worksheet for this month."}
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-5 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors flex-shrink-0"
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
