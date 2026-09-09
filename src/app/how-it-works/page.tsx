import type { Metadata } from "next";
import Link from "next/link";
import { Zap, BookOpen, Star, Sparkles, Check, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How It Works — AI Worksheet & Quiz Generation | QuizKraft",
  description:
    "Learn how QuizKraft uses AI to generate classroom assessments, printable worksheets, and online practice quizzes in 3 simple steps.",
  alternates: { canonical: "https://www.quizkraft.tech/how-it-works" },
  keywords: [
    "how to make AI worksheets",
    "how AI quiz generator works",
    "worksheet creation process",
    "teacher AI workflow"
  ],
  openGraph: {
    title: "How It Works — AI Worksheet & Quiz Generation | QuizKraft",
    description: "Generate conceptual quizzes and worksheets from your curriculum in seconds. Learn the process.",
    type: "website",
    url: "https://www.quizkraft.tech/how-it-works",
    siteName: "QuizKraft",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How QuizKraft Works | AI Quiz & Worksheet Creator",
    description: "Create printable worksheets and interactive quizzes in 3 simple steps.",
    images: ["/opengraph-image"],
  },
};

const steps = [
  {
    num: "01",
    title: "Configure Your Settings",
    desc: "Specify your topic, target grade level (from early elementary up to university), and choose from over 5 different question types. You can adjust the difficulty level to perfectly match your students' current capabilities.",
  },
  {
    num: "02",
    title: "Generate with AI",
    desc: "Our educational AI reads your configuration—or your uploaded notes, readings, and textbooks—and constructs high-quality, concept-focused questions and explanations in about 10 seconds. No random questions, just solid learning checkpoints.",
  },
  {
    num: "03",
    title: "Deliver & Practice",
    desc: "Print out the clean, watermark-free PDF worksheet for physical handouts, or send a link to let students practice online. Our built-in retake loop guides students to review wrong answers until they've mastered the concepts.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "How It Works", item: "https://www.quizkraft.tech/how-it-works" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create Worksheets & Quizzes with QuizKraft",
  "description": "Learn the 3 simple steps to generate high-quality worksheets and online practice quizzes with AI.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure Your Settings",
      "text": "Specify your topic, target grade level (from early elementary up to university), and choose from over 5 different question types. You can adjust the difficulty level to perfectly match your students' current capabilities."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Generate with AI",
      "text": "Our educational AI reads your configuration—or your uploaded notes, readings, and textbooks—and constructs high-quality, concept-focused questions and explanations in about 10 seconds."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Deliver & Practice",
      "text": "Print out the clean, watermark-free PDF worksheet for physical handouts, or send a link to let students practice online. Our built-in retake loop guides students to review wrong answers until they've mastered the concepts."
    }
  ]
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />
      
      {/* Header */}
      <section className="border-b border-hairline bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Three steps to assessment bliss.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            QuizKraft bridges the gap between lesson plans and structured classroom practice, saving hours of weekly manual preparation.
          </p>
        </div>
      </section>

      {/* Steps List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-16">
          {steps.map((step) => (
            <div key={step.num} className="grid md:grid-cols-12 gap-8 items-start border-b border-hairline pb-12 last:border-0 last:pb-0">
              <div className="md:col-span-3">
                <div
                  className="text-7xl font-semibold text-hairline leading-none select-none"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {step.num}
                </div>
              </div>
              <div className="md:col-span-9 space-y-3">
                <h2 className="text-2xl font-bold text-ink">{step.title}</h2>
                <p className="text-muted leading-relaxed text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Behind the scenes: AI Generation Quality */}
      <section className="bg-surface border-t border-b border-hairline py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles className="h-4 w-4" />
            AI Content Quality
          </div>
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Why our questions are different.
          </h2>
          <p className="text-muted leading-relaxed text-base max-w-2xl mx-auto">
            Unlike general-purpose writing assistants, QuizKraft&apos;s generator is explicitly trained on structured educational design principles. It creates highly plausible distractors for multiple-choice questions that target common student misconceptions, rather than offering obviously incorrect choices.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto pt-6">
            <div className="bg-canvas border border-hairline rounded-2xl p-6">
              <h3 className="font-semibold text-ink mb-2">Standard AI Generators</h3>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-wrong flex-shrink-0" /> Simple recall and trivia-based questions</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-wrong flex-shrink-0" /> Obvious and weak wrong answers (distractors)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-wrong flex-shrink-0" /> Inconsistent grade levels and formatting</li>
              </ul>
            </div>
            <div className="bg-canvas border border-hairline rounded-2xl p-6">
              <h3 className="font-semibold text-ink mb-2">QuizKraft Educational AI</h3>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-correct flex-shrink-0" /> Conceptual and application-based questions</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-correct flex-shrink-0" /> Plausible distractors modeled after real classroom misconceptions</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-correct flex-shrink-0" /> Exact grade-specific vocabulary alignment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-medium text-ink leading-tight mb-6 tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Ready to save time?
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link
            href="/generator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm text-sm"
          >
            <Zap className="h-4 w-4" />
            Create assessment free
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-hairline/60 transition-colors text-sm"
          >
            Explore features
          </Link>
        </div>
        <p className="text-xs text-muted">Generate your first worksheet in under a minute.</p>
      </section>
    </div>
  );
}
