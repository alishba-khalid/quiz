import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { auth } from "@/auth";
import CheckoutButton from "@/components/CheckoutButton";
import { JsonLd } from "@/components/JsonLd";
import { FREE_LIMIT, SUPPORT_EMAIL } from "@/lib/constants";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Simple & Affordable Pricing for Teachers | QuizKraft",
  description:
    `Try QuizKraft with ${FREE_LIMIT} preview generation per month on the Free plan, or upgrade to Pro ($9/mo) for unlimited generations, watermark-free PDF exports, and saved quiz history.`,
  alternates: { canonical: "https://www.quizkraft.tech/pricing" },
  keywords: [
    "QuizKraft pricing",
    "affordable AI quiz generator",
    "unlimited worksheet generator subscription",
    "school plan AI tools"
  ],
  openGraph: {
    title: "Simple & Affordable Pricing for Teachers | QuizKraft",
    description: `Free plan: ${FREE_LIMIT} preview generation per month. Pro: unlimited AI worksheets, quizzes, and clean PDF exports.`,
    type: "website",
    url: "https://www.quizkraft.tech/pricing",
    siteName: "QuizKraft",
    images: ["/pricing/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKraft Pricing & Plans",
    description: `${FREE_LIMIT} preview generation per month on Free. Upgrade to Pro for unlimited worksheets & quizzes.`,
    images: ["/pricing/opengraph-image"],
  },
};

const freeTier = {
  ...PLANS.free,
  features: [
    `${FREE_LIMIT} preview generation per month (topic, YouTube or notes)`,
    "Account required",
    "All question types (MCQ, True/False, Short Answer, Fill-in)",
    "All grade levels (K–12 to college)",
    "Answer keys + explanations",
    "Interactive quiz mode + adaptive study loop",
    "Browser printing",
    "QuizKraft watermark on PDF exports",
  ],
};

const proTier = {
  ...PLANS.pro,
  yearlyPrice: "$7",
  features: [
    "Unlimited worksheet & quiz generations",
    "Unlimited YouTube & PDF uploads",
    "Clean PDF exports with NO watermark",
    "Save unlimited quizzes to library & dashboard",
    "All question types & grade levels",
    "Answer keys + in-depth explanations",
    "Interactive study loop & retake modes",
    "Priority AI processing speed",
  ],
};

const schoolTier = {
  ...PLANS.school,
  features: [
    "Everything in Pro",
    "Shared department & school library",
    "Class & student management",
    "Multiple teacher seats with centralized billing",
    "Priority dedicated support",
  ],
};

const faqs = [
  {
    q: "What does the Free plan include?",
    a: `The Free plan is a preview: with an account you get ${FREE_LIMIT} generation per month (topic, YouTube or notes) so you can try QuizKraft before paying. No credit card is needed for it. For regular use you need Pro or School. Usage resets every 30 days.`,
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes. You can cancel your subscription from your billing portal with one click at any time. You will retain full Pro access until the end of your current billing period.",
  },
  {
    q: "Why is watermark-free PDF export Pro-only?",
    a: "Free users can generate quizzes and print them from their browser or download a PDF containing a discrete QuizKraft watermark. Pro users get clean, fully unbranded PDF worksheets formatted for professional classroom distribution.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) securely processed via Polar. Your payment credentials are encrypted and never touch our servers.",
  },
];

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://www.quizkraft.tech/pricing" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "QuizKraft Pro",
  "description": "Unlimited AI-powered worksheet and quiz generation for teachers, tutors, and homeschooling parents.",
  "image": "https://www.quizkraft.tech/apple-icon.png",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "0.00",
    "highPrice": "19.00",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0.00",
        "priceCurrency": "USD",
        "category": "Subscription"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "9.00",
        "priceCurrency": "USD",
        "category": "Subscription"
      },
      {
        "@type": "Offer",
        "name": "School / Team Plan",
        "price": "19.00",
        "priceCurrency": "USD",
        "category": "Subscription"
      }
    ]
  }
};

export default async function PricingPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={pricingFaqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />

      {/* Header */}
      <div className="border-b border-hairline bg-surface py-14 px-4 text-center">
        <h1
          className="text-4xl font-medium text-ink tracking-[-0.02em] mb-3"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Simple, honest pricing.
        </h1>
        <p className="text-muted">Try {FREE_LIMIT} preview generation a month on Free. Upgrade to Pro for unlimited quizzes.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {/* Free */}
          <div className="bg-surface rounded-2xl border border-hairline p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-1">{freeTier.name}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-ink">{freeTier.price}</span>
                <span className="text-muted text-sm">{freeTier.per}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {freeTier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="h-4 w-4 text-correct flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {session ? (
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center px-6 py-3 border border-hairline rounded-xl text-ink font-semibold hover:bg-canvas transition-colors text-sm"
              >
                Go to dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                className="w-full flex items-center justify-center px-6 py-3 border border-hairline rounded-xl text-ink font-semibold hover:bg-canvas transition-colors text-sm"
              >
                Create account
              </Link>
            )}
          </div>

          {/* Pro */}
          <div className="relative bg-accent rounded-2xl p-8 text-white overflow-hidden flex flex-col justify-between shadow-md shadow-accent/20">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              POPULAR
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{proTier.name}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">{proTier.price}</span>
                <span className="text-white/60 text-sm">{proTier.per}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {proTier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                    <Check className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {isPro ? (
              <div className="w-full flex items-center justify-center px-6 py-3 bg-white/20 rounded-xl font-semibold text-white text-sm cursor-default">
                Current plan
              </div>
            ) : (
              <CheckoutButton isLoggedIn={!!session} />
            )}
          </div>

          {/* School */}
          <div className="bg-surface rounded-2xl border border-hairline p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-1">{schoolTier.name}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-ink">{schoolTier.price}</span>
                <span className="text-muted text-sm">{schoolTier.per}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {schoolTier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="h-4 w-4 text-correct flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="w-full flex items-center justify-center px-6 py-3 border border-hairline rounded-xl text-ink font-semibold hover:bg-canvas transition-colors text-sm"
            >
              Contact school team
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-muted mb-16">
          Cancel anytime. No lock-in contracts. 30-day money-back guarantee on Pro.
        </p>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl font-medium text-ink mb-8 text-center tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Questions about pricing
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-hairline pb-6 last:border-0">
                <h3 className="font-semibold text-ink mb-2 text-sm">{faq.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
