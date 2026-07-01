import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, ArrowRight, Printer } from "lucide-react";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";

const WORKSHEET_SUBJECTS = [
  { slug: "math", name: "Math" },
  { slug: "reading-comprehension", name: "Reading Comprehension" },
  { slug: "biology", name: "Biology" },
  { slug: "algebra", name: "Algebra" },
  { slug: "spelling", name: "Spelling" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "world-history", name: "World History" },
  { slug: "grammar", name: "Grammar" },
  { slug: "physics", name: "Physics" },
  { slug: "geometry", name: "Geometry" },
  { slug: "vocabulary", name: "Vocabulary" },
  { slug: "us-history", name: "US History" },
];

const faqs = [
  { q: "What subjects can I make worksheets for?", a: "Any subject — math, reading comprehension, science, history, spelling, grammar, foreign languages, and more. If you can type the topic, QuizKraft can build the worksheet." },
  { q: "Can I print the worksheets?", a: "Yes. Every worksheet has a clean, exam-style print layout designed to look professional on paper. Free users print directly from the browser. Pro users can also export to PDF with no watermark." },
  { q: "Do worksheets include answer keys?", a: "Yes. Every worksheet comes with a full answer key and short explanations for each question — available on all plans, no extra steps required." },
  { q: "What grade levels are supported?", a: "Kindergarten through college. Just select the grade when setting up your worksheet and QuizKraft calibrates difficulty accordingly." },
  { q: "Can I generate a worksheet from my own notes?", a: "Yes, on the Pro plan. Paste in text from your notes, textbook, or any source and QuizKraft generates worksheet questions directly from that material." },
  { q: "How is this different from the quiz generator?", a: "Same underlying tool — the difference is how you use the output. Worksheets are formatted for print with answer lines and bubble choices. Use the same generator output in Quiz Mode for digital practice." },
  { q: "How many free worksheets can I generate?", a: "The free plan includes 1 worksheet generation, no credit card required. Upgrade to Pro for unlimited generation at $9/month." },
];

export const metadata: Metadata = {
  title: "AI Worksheet Generator — Printable | QuizKraft",
  description:
    "Generate a complete, printable worksheet in 10 seconds. Any subject, any grade. Multiple question types, answer keys included. Free to try.",
  alternates: { canonical: "https://www.quizkraft.tech/worksheet-generator" },
  openGraph: {
    title: "AI Worksheet Generator — Printable | QuizKraft",
    description: "Generate printable worksheets in 10 seconds. Any subject, any grade, answer keys included.",
    type: "website",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft AI Worksheet Generator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech/worksheet-generator",
  description:
    "AI-powered worksheet generator that creates print-ready practice sheets with answer keys for any subject and grade level.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Worksheet Generator", item: "https://www.quizkraft.tech/worksheet-generator" },
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
  { title: "Any subject, any grade", desc: "K-12 to college. Math, science, ELA, history, languages — describe the topic and QuizKraft handles the rest." },
  { title: "Mixed question types", desc: "Multiple choice, true/false, short answer, and fill-in-the-blank — set the mix or let QuizKraft decide." },
  { title: "Clean print layout", desc: "Worksheets are formatted for paper from the start: numbered questions, answer lines, and bubble-style MCQ options." },
  { title: "Answer keys with explanations", desc: "Every worksheet includes an answer key with explanations for each question. Free on all plans." },
  { title: "Digital quiz mode", desc: "The same worksheet works as an online quiz. Students get scored and wrong answers come back for review." },
  { title: "Generate from your notes", desc: "Paste in source material — a textbook chapter, article, or study guide — and get questions built from it. (Pro)" },
];

export default async function WorksheetGeneratorPage() {
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
            <Printer className="h-3.5 w-3.5" />
            Print-ready in seconds
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            AI Worksheet Generator — Printable Practice Sheets in Seconds
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
            Generate a complete, classroom-ready worksheet for any subject and grade. Choose question types,
            set difficulty, and get a print-ready sheet with an answer key in about 10 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            {["Free to try", "Answer keys included", "Print-ready layout"].map((s) => (
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
            Worksheets worth handing out.
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
            Worksheet generators by subject
          </h2>
          <p className="text-sm text-muted mb-8">
            Subject-specific guides with example questions, grade ranges, and practice tips.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {WORKSHEET_SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={`/worksheet-generator/${s.slug}`}
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
            { href: "/quiz-generator", label: "Quiz Generator" },
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
            Questions about the worksheet generator
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
          Your first worksheet is free.
        </h2>
        <p className="text-muted mb-6 text-sm">No card required. Ready to hand out in under a minute.</p>
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
