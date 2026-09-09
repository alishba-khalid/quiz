import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { FREE_TOPIC_LIMIT } from "@/lib/constants";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Generator", item: "https://www.quizkraft.tech/generator" },
  ],
};

export const metadata: Metadata = {
  title: "AI Worksheet & Quiz Generator — Free Studio | QuizKraft",
  description:
    "Generate customized educational worksheets and quizzes for any subject, grade level, and question type using AI. Instant answer key generation. Free — no credit card required.",
  alternates: { canonical: "https://www.quizkraft.tech/generator" },
  keywords: [
    "AI worksheet generator",
    "AI quiz generator",
    "free test generator studio",
    "online worksheet creator",
    "printable assessment maker",
    "classroom quiz builder"
  ],
  openGraph: {
    title: "AI Worksheet & Quiz Generator — Free Studio | QuizKraft",
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
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  let usageCount = 0;
  if (session?.user?.email && !isPro) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { usageCount: true },
    });
    usageCount = user?.usageCount ?? 0;
  }

  const creditsLeft = isPro ? Infinity : Math.max(0, FREE_TOPIC_LIMIT - usageCount);

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <QuizGeneratorForm isLoggedIn={!!session} isPro={isPro} creditsLeft={creditsLeft} />

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
