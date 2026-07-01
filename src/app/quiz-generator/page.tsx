import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";

const QUIZ_SUBJECTS = [
  { slug: "biology", name: "Biology" },
  { slug: "algebra", name: "Algebra" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "us-history", name: "US History" },
  { slug: "grammar", name: "Grammar" },
  { slug: "physics", name: "Physics" },
  { slug: "geometry", name: "Geometry" },
  { slug: "spanish", name: "Spanish" },
  { slug: "world-history", name: "World History" },
  { slug: "vocabulary", name: "Vocabulary" },
  { slug: "earth-science", name: "Earth Science" },
  { slug: "fractions", name: "Fractions" },
];

const faqs = [
  { q: "What types of quiz questions can it generate?", a: "QuizKraft generates multiple choice, true/false, short answer, and fill-in-the-blank questions. You can mix all four types in a single quiz or choose just the types you need." },
  { q: "How many questions can I add to a quiz?", a: "You can generate up to 20 questions per quiz. For longer assessments, run two quick generations and combine them." },
  { q: "Can I make a quiz from my own notes or textbook?", a: "Yes — on the Pro plan. Paste in text from your notes, a textbook chapter, or any source material and QuizKraft generates questions directly from that content." },
  { q: "Does the quiz generator include answer keys?", a: "Yes. Every quiz includes a full answer key with explanations for each question, available on all plans." },
  { q: "Can students take the quiz online?", a: "Yes. After generating, switch to Quiz Mode and students can click through questions, get instant scores, and wrong answers cycle back for review until mastered." },
  { q: "What grade levels does the quiz generator support?", a: "All grade levels from kindergarten through college. Just select the grade when setting up your quiz." },
  { q: "How many free quizzes can I generate?", a: "The free plan includes 1 quiz generation — no credit card required. Upgrade to Pro for unlimited generation at $9/month." },
];

export const metadata: Metadata = {
  title: "AI Quiz Generator — Free | QuizKraft",
  description:
    "Generate a complete quiz in 10 seconds — multiple choice, short answer, true/false, fill-in-the-blank, mixed automatically. Answer keys included. Free to try.",
  alternates: { canonical: "https://www.quizkraft.tech/quiz-generator" },
  openGraph: {
    title: "AI Quiz Generator — Free | QuizKraft",
    description: "Generate a complete quiz in 10 seconds. Any subject, any grade. Answer keys included.",
    type: "website",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft AI Quiz Generator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech/quiz-generator",
  description:
    "AI-powered quiz generator that creates mixed-format quizzes with answer keys for any subject and grade level.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Quiz Generator", item: "https://www.quizkraft.tech/quiz-generator" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const features = [
  { title: "4 question types", desc: "Multiple choice, true/false, short answer, and fill-in-the-blank — mix them all in one quiz." },
  { title: "Answer keys included", desc: "Every quiz comes with a complete answer key and explanations for every question, free on all plans." },
  { title: "Quiz mode study loop", desc: "Students answer online, get scored instantly, and wrong answers cycle back until mastered." },
  { title: "Any subject, any grade", desc: "K-12 to college. Math, science, history, languages, ELA — just type the topic." },
  { title: "Generate from your material", desc: "Paste notes or a chapter and get questions built from your exact content. Available on Pro." },
  { title: "Print or export to PDF", desc: "Clean, exam-style print layout for handouts. PDF export with no watermark on Pro." },
];

export default async function QuizGeneratorPage() {
  const props = await getGeneratorProps();

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-surface border-b border-hairline py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent mb-6">
            <Zap className="h-3.5 w-3.5" />
            Generates in ~10 seconds
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            AI Quiz Generator — Any Subject, Any Grade
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
            Type a topic, pick question types, and get a complete quiz with an answer key in about 10 seconds.
            Multiple choice, short answer, true/false, and fill-in-the-blank — mixed automatically.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            {["Free to try", "Answer keys included", "No card required"].map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-correct" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tool embed */}
      <QuizGeneratorForm {...props} />

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-10 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Everything a good quiz needs — nothing it doesn&apos;t.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-canvas rounded-2xl border border-hairline p-5">
                <h3 className="font-semibold text-ink mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-2"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Quiz generators by subject
          </h2>
          <p className="text-sm text-muted mb-8">
            Subject-specific guides with example questions and grade-level tips.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {QUIZ_SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={`/quiz-generator/${s.slug}`}
                className="group flex items-center justify-between px-4 py-3 bg-surface rounded-xl border border-hairline hover:border-accent/40 hover:bg-accent-soft transition-all text-sm font-medium text-ink"
              >
                {s.name}
                <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6">
          <p className="text-sm font-medium text-ink">Also on QuizKraft:</p>
          {[
            { href: "/worksheet-generator", label: "Worksheet Generator" },
            { href: "/quiz-maker-for-teachers", label: "Quiz Maker for Teachers" },
            { href: "/pdf-to-quiz", label: "Quiz From Notes" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-accent hover:text-accent-dark font-medium flex items-center gap-1 transition-colors"
            >
              {l.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-10 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Questions about the quiz generator
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-hairline pb-6 last:border-0">
                <h3 className="font-semibold text-ink mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline text-center">
        <h2
          className="text-3xl font-medium text-ink tracking-[-0.02em] mb-4"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Start with one free quiz.
        </h2>
        <p className="text-muted mb-6 text-sm">No card required. Takes 30 seconds to sign up.</p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
        >
          <Zap className="h-4 w-4" />
          Get started free
        </Link>
      </section>
    </div>
  );
}
