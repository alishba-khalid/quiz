import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | QuizKraft",
  description:
    "Frequently asked questions about QuizKraft AI worksheet and quiz generator. Learn about features, pricing, classroom use, PDF exports, and printing.",
  alternates: { canonical: "https://www.quizkraft.tech/faq" },
  keywords: [
    "QuizKraft FAQ",
    "AI worksheet generator questions",
    "printable worksheet questions",
    "quiz maker help"
  ],
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | QuizKraft",
    description: "Got questions? We have answers. Learn about worksheet generation, plans, and student practice features.",
    type: "website",
    url: "https://www.quizkraft.tech/faq",
    siteName: "QuizKraft",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKraft FAQ",
    description: "Everything you need to know about creating AI worksheets & quizzes.",
    images: ["/opengraph-image"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.quizkraft.tech/faq" },
  ],
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is there a free plan?", acceptedAnswer: { "@type": "Answer", text: "Yes. The free plan gives you 1 worksheet to try — no credit card required. All question types, answer keys, quiz mode, and the study loop are included. Upgrade to Pro for unlimited generation." } },
    { "@type": "Question", name: "What subjects and grades does QuizKraft cover?", acceptedAnswer: { "@type": "Answer", text: "Any subject, any grade. Math, science, history, literature, languages — from kindergarten through college. Just type the topic and select the grade." } },
    { "@type": "Question", name: "Can I use my own material to generate questions?", acceptedAnswer: { "@type": "Answer", text: "Yes, on Pro. Paste in text from your notes, textbook, or any source, and QuizKraft generates questions directly from that material." } },
    { "@type": "Question", name: "Can students take quizzes online?", acceptedAnswer: { "@type": "Answer", text: "Yes. In quiz mode, students click through questions, get scored instantly, and wrong answers come back for review until they get them right." } },
    { "@type": "Question", name: "Can I print or export worksheets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every worksheet has a clean print layout. Free users can print with a QuizKraft watermark. Pro users get clean PDF export with no watermark." } },
    { "@type": "Question", name: "Do you offer school or team plans?", acceptedAnswer: { "@type": "Answer", text: "Yes — the School plan is $19/month per teacher and includes shared team libraries, class management, and centralized billing." } },
  ],
};

export default function FAQPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={homeFaqSchema} />
      
      {/* Header */}
      <section className="border-b border-hairline bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about QuizKraft? Find answers below regarding generation limits, payment options, and general classroom deployment.
          </p>
        </div>
      </section>

      {/* Accordion container */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <div className="bg-surface rounded-2xl border border-hairline p-8 shadow-sm">
          <FAQAccordion />
        </div>
      </section>

      {/* Pricing support focus */}
      <section className="bg-surface border-t border-b border-hairline py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-ink">Have a billing or subscription question?</h2>
          <p className="text-sm text-muted leading-relaxed">
            Detailed information about payment methods, cancellations, refund policy, and school licensing plans is available on our dedicated pricing page.
          </p>
          <div className="pt-2">
            <Link href="/pricing" className="text-accent font-semibold hover:underline text-sm">
              View Pricing FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl font-medium text-ink leading-tight mb-4 tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Still have questions?
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto mb-8">
          If you didn&apos;t find the answers you were looking for, feel free to email us directly. We usually respond within 24 hours.
        </p>
        <div>
          <a
            href="mailto:support@quizkraft.tech"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm text-sm"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
