import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Generator", item: "https://www.quizkraft.tech/generator" },
  ],
};

export const metadata: Metadata = {
  title: "AI Worksheet & Quiz Generator Studio | QuizKraft",
  description:
    "Generate customized educational worksheets and quizzes for any subject, grade level, and question type using AI. Instant answer key generation. Try 1 preview generation free with an account.",
  alternates: { canonical: "https://www.quizkraft.tech/generator" },
  keywords: [
    "AI worksheet generator",
    "AI quiz generator",
    "test generator studio",
    "online worksheet creator",
    "printable assessment maker",
    "classroom quiz builder"
  ],
  openGraph: {
    title: "AI Worksheet & Quiz Generator Studio | QuizKraft",
    description: "Generate clean, printable worksheets and quizzes for any subject and grade in seconds with AI.",
    type: "website",
    url: "https://www.quizkraft.tech/generator",
    siteName: "QuizKraft",
    images: ["/generator/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Worksheet & Quiz Generator Studio | QuizKraft",
    description: "Create worksheets and quizzes with instant answer keys using AI.",
    images: ["/generator/opengraph-image"],
  },
};

export default async function GeneratorPage() {
  const props = await getGeneratorProps();

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <h1 className="sr-only">AI Worksheet & Quiz Generator</h1>
      <QuizGeneratorForm {...props} />

      {/* Related tools */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline no-print">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-6">
          <p className="text-xs font-bold text-ink uppercase tracking-wider">Quick Tools:</p>
          {[
            { href: "/youtube-to-quiz", label: "YouTube to Quiz" },
            { href: "/pdf-to-quiz", label: "PDF to Quiz" },
            { href: "/worksheet-generator", label: "Worksheet Generator" },
            { href: "/quiz-generator", label: "Quiz Generator" },
            { href: "/pricing", label: "Pricing & Plans" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-accent hover:text-accent-dark font-medium flex items-center gap-1 transition-colors"
            >
              {l.label} <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
