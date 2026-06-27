import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In | QuizKraft",
  description:
    "Sign in to your QuizKraft account to generate and manage educational worksheets.",
};

export default async function LoginPage() {
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
          <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
          <p className="text-zinc-500 mt-2 text-sm">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
