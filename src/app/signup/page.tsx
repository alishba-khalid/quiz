import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | QuizKraft",
  description: "Create your free QuizKraft account — try 1 free worksheet, no credit card required.",
};

export default async function SignupPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-14 px-4 bg-canvas">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8.5 L6.5 12.5 L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-lg text-ink">
              Quiz<span className="text-accent">Kraft</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold text-ink mb-1">Create your account</h1>
          <p className="text-sm text-muted">1 free worksheet. No credit card needed.</p>
        </div>
        <div className="bg-surface rounded-2xl border border-hairline shadow-sm p-8">
          <SignupForm googleEnabled={!!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} />
        </div>
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:text-accent-dark font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
