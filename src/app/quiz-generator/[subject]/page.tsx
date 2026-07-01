import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Zap, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { quizSubjects, getQuizSubject } from "@/lib/subjects";

export function generateStaticParams() {
  return quizSubjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const data = getQuizSubject(subject);
  if (!data) return { title: "Not Found" };

  const title = `AI ${data.name} Quiz Generator — ${data.gradeRange} | QuizKraft`;
  const description = `Generate ${data.name.toLowerCase()} quiz questions in seconds — multiple choice, short answer, true/false, and fill-in-the-blank. ${data.gradeRange}. Free to try.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.quizkraft.tech/quiz-generator/${subject}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

const qTypeLabel: Record<string, string> = {
  "multiple-choice": "Multiple choice",
  "true-false": "True / False",
  "short-answer": "Short answer",
  "fill-in-the-blank": "Fill in the blank",
};

export default async function QuizSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const data = getQuizSubject(subject);
  if (!data) notFound();

  const canonicalUrl = `https://www.quizkraft.tech/quiz-generator/${subject}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
      { "@type": "ListItem", position: 2, name: "Quiz Generator", item: "https://www.quizkraft.tech/quiz-generator" },
      { "@type": "ListItem", position: 3, name: `${data.name} Quiz Generator`, item: canonicalUrl },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `QuizKraft — ${data.name} Quiz Generator`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description: `AI-powered ${data.name.toLowerCase()} quiz generator for ${data.gradeRange}. Generates multiple choice, short answer, true/false, and fill-in-the-blank questions with answer keys.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedSubjects = quizSubjects.filter((s) =>
    data.relatedSlugs.includes(s.slug)
  );

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-surface border-b border-hairline py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link href="/quiz-generator" className="hover:text-ink transition-colors">Quiz Generator</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <span className="text-ink font-medium">{data.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-3 py-1 text-xs font-medium text-accent mb-5">
            {data.gradeRange}
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            AI {data.name} Quiz Generator
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">
            {data.intro}
          </p>
          <Link
            href="/quiz-generator"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
          >
            <Zap className="h-4 w-4" />
            Generate a {data.name} quiz free
          </Link>
        </div>
      </section>

      {/* Example questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-2"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            What {data.name.toLowerCase()} quiz questions look like
          </h2>
          <p className="text-sm text-muted mb-8">
            Real examples of the types of questions QuizKraft generates for {data.name.toLowerCase()}.
          </p>
          <div className="space-y-5">
            {data.exampleQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl border border-hairline p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted bg-canvas border border-hairline rounded-full px-2.5 py-0.5">
                    {qTypeLabel[q.type]}
                  </span>
                  <span className="text-xs text-muted">Question {i + 1}</span>
                </div>
                <p className="text-sm font-medium text-ink mb-3 leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>
                <div className="flex items-start gap-2 bg-correct-soft border border-correct/20 rounded-xl px-4 py-2.5">
                  <span className="text-xs font-bold text-correct mt-0.5 flex-shrink-0">Answer</span>
                  <p className="text-xs text-ink leading-relaxed">{q.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics covered */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {data.name} topics QuizKraft covers
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {data.topics.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 text-sm text-ink bg-canvas border border-hairline rounded-xl px-4 py-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guide */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Writing good {data.name.toLowerCase()} quiz questions
          </h2>
          <p className="text-muted leading-relaxed">{data.guide}</p>
        </div>
      </section>

      {/* Grade guidance */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Grade level guidance for {data.name.toLowerCase()} quizzes
          </h2>
          <p className="text-muted leading-relaxed">{data.gradeGuidance}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-accent/5 border-t border-hairline text-center">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink tracking-[-0.02em] mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Generate your {data.name.toLowerCase()} quiz in 10 seconds.
          </h2>
          <p className="text-sm text-muted mb-6">
            Free to try. No credit card required.
          </p>
          <Link
            href="/quiz-generator"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
          >
            <Zap className="h-4 w-4" />
            Open the quiz generator
          </Link>
        </div>
      </section>

      {/* Related subjects */}
      {relatedSubjects.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-lg font-semibold text-ink mb-5"
            >
              Related quiz generators
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSubjects.map((s) => (
                <Link
                  key={s.slug}
                  href={`/quiz-generator/${s.slug}`}
                  className="group flex items-center gap-1.5 px-4 py-2.5 bg-surface rounded-xl border border-hairline hover:border-accent/40 hover:bg-accent-soft transition-all text-sm font-medium text-ink"
                >
                  {s.name} Quiz Generator
                  <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-accent transition-colors" />
                </Link>
              ))}
              <Link
                href="/quiz-generator"
                className="group flex items-center gap-1.5 px-4 py-2.5 bg-surface rounded-xl border border-hairline hover:border-accent/40 hover:bg-accent-soft transition-all text-sm font-medium text-muted"
              >
                All subjects
                <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-accent transition-colors" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-10 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {data.name} quiz generator — FAQ
          </h2>
          <div className="space-y-6">
            {data.faq.map((item) => (
              <div key={item.q} className="border-b border-hairline pb-6 last:border-0">
                <h3 className="font-semibold text-ink mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer link back */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-5">
          <p className="text-sm font-medium text-ink">Also on QuizKraft:</p>
          {[
            { href: "/generator", label: "Try the full AI worksheet & quiz generator" },
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
    </div>
  );
}
