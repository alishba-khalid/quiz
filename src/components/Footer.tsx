import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex justify-center md:order-2 space-x-6 text-sm text-zinc-500">
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="/quiz-generator" className="hover:text-indigo-600 transition-colors">Quiz Maker</Link>
            <Link href="/math-worksheet-generator" className="hover:text-indigo-600 transition-colors">Math worksheets</Link>
            <Link href="/reading-comprehension-generator" className="hover:text-indigo-600 transition-colors">Reading Comprehension</Link>
          </div>
          <div className="md:order-1 flex items-center justify-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            <p className="text-center text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} QuizKraft. All rights reserved. Built for teachers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
