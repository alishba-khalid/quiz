import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, ArrowRight, BookOpen } from "lucide-react";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";

const faqs = [
  { q: "Does it work directly with PDF files?", a: "Currently the tool works with pasted text. Open your PDF, select the relevant section, and paste the text into the source material field. Most PDF readers support copy-paste, and the resulting questions are built from your exact content." },
  { q: "How much text can I paste in?", a: "Several pages worth — enough for a full textbook chapter or a long article. For very long documents, paste the most important sections for the most focused quiz." },
  { q: "Will the questions actually match my specific content?", a: "Yes. Questions reference the specific concepts, terms, and ideas in the text you pasted — not generic topic questions. This is the core difference from standard quiz generation." },
  { q: "Is source material input a Pro feature?", a: "Yes. Pasting your own source material requires a Pro plan ($9/month). Standard quiz generation from a topic description is free." },
  { q: "What question types can I get from my notes?", a: "All four types: multiple choice, true/false, short answer, and fill-in-the-blank. Set the mix you want or let QuizKraft decide based on the content." },
  { q: "Can students take the quiz online after I generate it?", a: "Yes. Switch to Quiz Mode after generating. Students click through questions, get scored, and wrong answers come back for review until they've mastered them." },
  { q: "Does this work with lecture slides, articles, or study guides?", a: "Yes — any text content works. Lecture slide text, articles, study guides, textbook excerpts, your own typed notes. If you can paste it, QuizKraft can quiz it." },
];

const steps = [
  { n: "01", title: "Copy your text", desc: "Open your PDF, notes, or article. Select the relevant section — a chapter, key pages, or full article — and copy." },
  { n: "02", title: "Paste into QuizKraft", desc: "On the generator, choose 'Source material' and paste what you copied. Set the grade level, question types, and count." },
  { n: "03", title: "Generate", desc: "Hit generate. In about 10 seconds you have quiz questions built from the exact material you pasted — not generic topic questions." },
  { n: "04", title: "Study with the loop", desc: "Switch to Quiz Mode. Wrong answers come back for review until they're mastered. One session = genuine active recall practice." },
];

export const metadata: Metadata = {
  title: "Turn Notes & Source Material into a Quiz | QuizKraft",
  description:
    "Paste your notes, textbook chapter, or any text and get a quiz built from your exact content in 10 seconds. Active recall from your own material. Pro feature.",
  alternates: { canonical: "https://www.quizkraft.tech/pdf-to-quiz" },
  openGraph: {
    title: "Turn Notes into a Quiz | QuizKraft",
    description: "Paste text from any source and get a quiz built from your exact content in 10 seconds.",
    type: "website",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft — Quiz From Notes",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech/pdf-to-quiz",
  description:
    "AI quiz generator that creates quizzes from pasted source material — notes, textbook chapters, articles — in about 10 seconds.",
  offers: { "@type": "Offer", price: "9", priceCurrency: "USD" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to turn your notes into a quiz with QuizKraft",
  description: "Generate a quiz from any text in 4 steps using QuizKraft's source material input.",
  totalTime: "PT1M",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.desc,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "PDF to Quiz", item: "https://www.quizkraft.tech/pdf-to-quiz" },
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

export default async function PdfToQuizPage() {
  const props = await getGeneratorProps();

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={softwareSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-surface border-b border-hairline py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent mb-6">
            <BookOpen className="h-3.5 w-3.5" />
            Quiz from your own content
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Turn Your Source Material into a Quiz in 60 Seconds
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
            Copy a chapter, paste your notes, or pull text from any document — then let QuizKraft
            build a quiz from the exact material your students need to know. Not generic questions
            about the topic. Questions from <em>your</em> content.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            {["Questions from your exact text", "10-second generation", "Active recall practice"].map((s) => (
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

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-12 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            How it works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.n}>
                <div
                  className="text-5xl font-medium text-hairline mb-3 leading-none select-none"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.n}
                </div>
                <h3 className="font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why active recall */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Why quizzing yourself is better than re-reading
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Passive re-reading is one of the least effective study strategies. You recognize words you've
            seen before and mistake that recognition for understanding. Active recall — trying to retrieve
            information before looking it up — forces your brain to actually reconstruct the knowledge.
          </p>
          <p className="text-muted leading-relaxed">
            Turning your source material into a quiz takes about 60 seconds. One session with the study loop
            means actively engaging with the material at least twice. That&apos;s more learning in less time.
          </p>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6">
          <p className="text-sm font-medium text-ink">Also on QuizKraft:</p>
          {[
            { href: "/quiz-generator", label: "AI Quiz Generator" },
            { href: "/worksheet-generator", label: "Worksheet Generator" },
            { href: "/quiz-maker-for-teachers", label: "Quiz Maker for Teachers" },
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
            Questions about quizzing from notes
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
        <p className="text-muted mb-2 text-sm">Source material input is a Pro feature.</p>
        <p className="text-muted mb-6 text-sm">Try standard topic generation free — upgrade to Pro for your own content.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
          >
            <Zap className="h-4 w-4" />
            Start free
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-hairline/60 transition-colors text-sm"
          >
            See Pro pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
