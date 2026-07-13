import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Us | QuizKraft",
  description:
    "Learn about QuizKraft's mission to save teachers time and help them create rigorous, high-quality classroom worksheets and quizzes.",
  alternates: { canonical: "https://www.quizkraft.tech/about" },
  openGraph: {
    title: "About Us | QuizKraft",
    description: "Our mission is simple: help teachers save time with concept-driven classroom resources.",
    type: "website",
  },
};

const pillars = [
  {
    icon: Heart,
    title: "Designed for Teachers",
    desc: "Teachers spend up to 10+ hours a week grading and creating assignments. QuizKraft was built to give those hours back so teachers can focus on what they do best: teaching.",
  },
  {
    icon: BookOpen,
    title: "Pedagogical Integrity",
    desc: "Our generator isn't a generic writer. It's tuned to construct concept-driven questions (MCQ, short answer, matching) that measure real understanding rather than surface-level memorization.",
  },
  {
    icon: ShieldCheck,
    title: "No-Gimmick Simplicity",
    desc: "We don't believe in complex prompts or technical jargon. You define your curriculum topics or paste text, and we output beautifully formatted, ready-to-print materials.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.quizkraft.tech/about" },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "QuizKraft",
    "url": "https://www.quizkraft.tech",
    "logo": "https://www.quizkraft.tech/apple-icon.png",
    "description": "QuizKraft is dedicated to simplifying how educators build classroom materials, worksheets, quizzes, and study guides.",
    "knowsAbout": ["AI worksheet generator", "quiz maker for teachers", "educational assessments"]
  }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={aboutPageSchema} />
      
      {/* Hero Section */}
      <section className="border-b border-hairline bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent mb-4">
            <Sparkles className="h-4 w-4" />
            Our Mission
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Assisting teachers, one worksheet at a time.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            QuizKraft is a focused, solo-founded effort dedicated to simplifying how educators build classroom materials, quizzes, and study guides.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div className="space-y-6 text-base text-muted leading-relaxed">
          <h2 className="text-2xl font-bold text-ink mb-4">Why QuizKraft exists</h2>
          <p>
            Every teacher knows the struggle of Sunday evening: searching the web for worksheets, formatting layouts, and crafting multiple-choice questions that actually test student comprehension.
          </p>
          <p>
            Generic AI text generators don't solve this. They produce plain, unformatted blocks of text, write questions that are too easy, and often fabricate incorrect answers. 
          </p>
          <p>
            QuizKraft was created to change that. By tailoring AI generations directly to educational standards (like Bloom's Taxonomy) and combining them with professional, printable formatting, QuizKraft enables teachers to build materials worth handing out in seconds.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-surface border-t border-b border-hairline py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink text-center mb-12"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            What we stand for
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-canvas border border-hairline rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Ready to reclaim your weekends?
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto">
            Join the teachers using QuizKraft to build worksheets and assessments.
          </p>
          <div>
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20"
            >
              Start Generating Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
