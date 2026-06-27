import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Zap, Download, Star, Users, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
  description:
    "Generate age-appropriate printable educational worksheets and quizzes for any subject, grade level, and format in seconds using AI. Free to start.",
  keywords: [
    "worksheet generator",
    "quiz maker",
    "teacher tools",
    "AI education",
    "printable worksheets",
    "educational worksheets",
  ],
  openGraph: {
    title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
    description:
      "Generate educational worksheets and quizzes in seconds using AI. Free for teachers.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Zap className="h-3.5 w-3.5" />
            AI-powered in seconds
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight tracking-tight">
            Create Worksheets &amp; Quizzes{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            QuizKraft uses AI to generate age-appropriate, printable worksheets and quizzes
            for any subject, grade level, and format — in under 10 seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz-generator"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              <Brain className="h-5 w-5" />
              Generate Free Worksheet
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-zinc-700 text-base font-semibold rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            5 free worksheets/month. No credit card required.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-zinc-100 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "10s", label: "Generation time" },
            { value: "5+", label: "Question formats" },
            { value: "K–12", label: "All grade levels" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-zinc-900">Everything teachers need</h2>
            <p className="mt-3 text-zinc-500">Built for the classroom, from K through 12.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="h-6 w-6 text-indigo-600" />,
                title: "AI-Powered Generation",
                description:
                  "Gemini AI creates curriculum-aligned questions tailored to your topic and grade level.",
              },
              {
                icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
                title: "Multiple Formats",
                description:
                  "Multiple choice, fill-in-the-blank, short answer, matching, and true/false.",
              },
              {
                icon: <Download className="h-6 w-6 text-indigo-600" />,
                title: "Printable PDF Export",
                description:
                  "Download any worksheet as a clean, print-ready PDF in one click.",
              },
              {
                icon: <Star className="h-6 w-6 text-indigo-600" />,
                title: "Answer Key Included",
                description:
                  "Pro users get a complete answer key with every generated worksheet.",
              },
              {
                icon: <Users className="h-6 w-6 text-indigo-600" />,
                title: "Any Subject",
                description:
                  "Math, science, history, reading comprehension, vocabulary — whatever you need.",
              },
              {
                icon: <Zap className="h-6 w-6 text-indigo-600" />,
                title: "Save & Organize",
                description:
                  "All your generated worksheets are saved to your dashboard for later.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-zinc-900">How it works</h2>
            <p className="mt-3 text-zinc-500">Three steps from idea to printable worksheet.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter your topic",
                desc: "Type in any subject — fractions, photosynthesis, the American Revolution.",
              },
              {
                step: "2",
                title: "Set parameters",
                desc: "Choose grade level, worksheet type, and how many questions you need.",
              },
              {
                step: "3",
                title: "Download and print",
                desc: "Your worksheet is ready in seconds. Download as PDF and hand it out.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to save hours of prep time?
          </h2>
          <p className="text-indigo-100 mb-8">
            Join teachers who use QuizKraft to create better worksheets faster.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-indigo-700 text-base font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
}
