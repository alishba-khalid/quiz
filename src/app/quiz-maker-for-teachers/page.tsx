import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, ArrowRight, Clock } from "lucide-react";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";
import { FREE_TOPIC_LIMIT, FREE_SOURCE_LIMIT } from "@/lib/constants";

const faqs = [
  { q: "How long does it take to make a quiz?", a: "About 10 seconds from hitting Generate. Setting up your topic, grade, and question types takes another 30 seconds — so most teachers have a quiz ready in under a minute." },
  { q: "Can I make quizzes at different difficulty levels?", a: "Yes. Set difficulty to Easy, Medium, or Hard. For differentiated instruction, generate two versions of the same quiz at different difficulty levels in under two minutes." },
  { q: "Can I use my textbook, notes, or YouTube videos as the source?", a: `Yes! Free accounts include ${FREE_SOURCE_LIMIT} free YouTube/source generations per month (${FREE_TOPIC_LIMIT} total generations). Paste text or a YouTube link and QuizKraft creates questions directly from that content.` },
  { q: "Can students take the quiz online?", a: "Yes. Share the link or have students use Quiz Mode directly in the app. They click through questions, get scored instantly, and wrong answers come back for review until mastered." },
  { q: "Do I need to create an account?", a: `You can try your first quiz immediately without signing up. Create a free account in 30 seconds to get ${FREE_TOPIC_LIMIT} free generations each month — no credit card needed.` },
  { q: "Is there a school or district plan?", a: "Yes. The School plan is $19 per teacher per month and includes shared team libraries, class management, and centralized billing. Contact us for custom quotes for larger teams." },
  { q: "What question types are supported?", a: "Multiple choice, true/false, short answer, and fill-in-the-blank. You can specify a mix or let QuizKraft decide based on the topic." },
];

const useCases = [
  { title: "Exit tickets", desc: "A 3–5 question check-in that used to take 15 minutes now takes 30 seconds. Know what students understood before they leave the room." },
  { title: "Weekly quizzes", desc: "Set up your topic, grade, and question count. Done. Consistent weekly assessment without the consistent Sunday night prep." },
  { title: "Sub plans", desc: "Emergency sub plans that include a real quiz activity — not just a worksheet copied from a textbook. Generate one in 60 seconds." },
  { title: "Chapter tests", desc: "Longer unit reviews and chapter tests with mixed question types. Adjust difficulty for different class sections without writing from scratch." },
  { title: "Study guides", desc: "Flip the script — give students the answer key first, then the quiz without answers. The answer key becomes their study guide." },
  { title: "Homework sheets", desc: "Practice worksheets that look professional and include an answer key for self-checking. Done while you're making coffee." },
];

export const metadata: Metadata = {
  title: "AI Quiz Maker for Teachers — Free Test & Worksheet Creator | QuizKraft",
  description:
    "Make quizzes, exit tickets, sub plans, and printable worksheets in under 60 seconds with AI. Designed specifically for teachers across all subjects & grade levels. Free to try.",
  alternates: { canonical: "https://www.quizkraft.tech/quiz-maker-for-teachers" },
  keywords: [
    "quiz maker for teachers",
    "free teacher test creator",
    "AI classroom assessment tool",
    "exit ticket generator",
    "sub plan quiz builder",
    "differentiated learning test maker",
    "printable teacher worksheets",
    "automatic grading quiz maker"
  ],
  openGraph: {
    title: "AI Quiz Maker for Teachers — Free Test & Worksheet Creator | QuizKraft",
    description: "Make quizzes, exit tickets, sub plans, and printable worksheets in under 60 seconds with AI. Answer keys included.",
    type: "website",
    url: "https://www.quizkraft.tech/quiz-maker-for-teachers",
    siteName: "QuizKraft",
    images: ["/quiz-maker-for-teachers/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Quiz Maker for Teachers | QuizKraft",
    description: "Save hours every week with AI quiz generation, printable worksheets, and instant answer keys.",
    images: ["/quiz-maker-for-teachers/opengraph-image"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft Quiz Maker for Teachers",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech/quiz-maker-for-teachers",
  description:
    "AI quiz maker designed for teachers. Generate exit tickets, chapter tests, sub plans, and homework sheets in seconds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Quiz Maker for Teachers", item: "https://www.quizkraft.tech/quiz-maker-for-teachers" },
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

export default async function QuizMakerForTeachersPage() {
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
            <Clock className="h-3.5 w-3.5" />
            Under 60 seconds per quiz
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            The AI Quiz Maker Designed for Teachers
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
            Stop writing questions from scratch on Sunday evening. Generate exit tickets, weekly quizzes,
            unit tests, and sub plans in about ten seconds — complete with instant answer keys.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            {["Answer keys included", "Multiple question types", "Print or quiz online", `${FREE_TOPIC_LIMIT} free generations / month`].map((s) => (
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

      {/* Use cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-12 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            What teachers use QuizKraft for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="bg-canvas rounded-2xl border border-hairline p-6">
                <h3 className="font-semibold text-ink mb-2">{u.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6">
          <p className="text-sm font-medium text-ink">Also on QuizKraft:</p>
          {[
            { href: "/youtube-to-quiz", label: "YouTube to Quiz" },
            { href: "/pdf-to-quiz", label: "PDF to Quiz" },
            { href: "/quiz-generator", label: "AI Quiz Generator" },
            { href: "/worksheet-generator", label: "Worksheet Generator" },
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-10 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Questions from teachers
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline text-center">
        <h2
          className="text-3xl font-medium text-ink tracking-[-0.02em] mb-4"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Get your Sunday evening back.
        </h2>
        <p className="text-muted mb-6 text-sm">{FREE_TOPIC_LIMIT} free generations every month, no card required.</p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
        >
          <Zap className="h-4 w-4" />
          Start free
        </Link>
      </section>
    </div>
  );
}
