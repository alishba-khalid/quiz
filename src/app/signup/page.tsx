import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | QuizKraft",
  description:
    "Create your free QuizKraft account and start generating educational worksheets and quizzes with AI.",
};

export default async function SignupPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xl mb-4"
          >
            <GraduationCap className="h-7 w-7" />
            QuizKraft
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900">Create your account</h1>
          <p className="text-zinc-500 mt-2 text-sm">
            5 free worksheets/month. No credit card needed.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
