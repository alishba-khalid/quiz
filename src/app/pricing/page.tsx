import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { auth } from "@/auth";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Pricing | QuizKraft",
  description:
    "QuizKraft pricing. Try free with 1 worksheet, or upgrade to Pro for unlimited AI worksheet generation, PDF export, and source material upload.",
  openGraph: {
    title: "Pricing | QuizKraft",
    description: "Start free or upgrade to Pro for unlimited worksheets.",
    type: "website",
  },
};

const freeTier = {
  name: "Free",
  price: "$0",
  per: "/month",
  features: [
    "1 free worksheet",
    "All worksheet types",
    "All grade levels (K–12 to college)",
    "Answer keys + explanations",
    "Quiz mode + study loop",
    "Print",
    "QuizKraft watermark on exports",
  ],
};

const proTier = {
  name: "Pro",
  price: "$9",
  per: "/month",
  yearlyPrice: "$7",
  features: [
    "Unlimited worksheet generation",
    "All worksheet types",
    "All grade levels (K–12 to college)",
    "Answer keys + explanations",
    "Quiz mode + study loop",
    "PDF + Google Docs export, no watermark",
    "Upload PDF / paste source material",
    "Save unlimited worksheets to library",
    "Priority AI generation",
  ],
};

const schoolTier = {
  name: "School / Team",
  price: "$19",
  per: "/teacher/month",
  features: [
    "Everything in Pro",
    "Shared team library",
    "Class & student management",
    "Multiple seats, centralized billing",
    "Priority support",
  ],
};

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your billing portal at any time. You keep Pro access until the end of your billing period." },
  { q: "How many free worksheets do I get?", a: "You get 1 free worksheet to try — no credit card required. Upgrade to Pro any time for unlimited generation." },
  { q: "Why is PDF export Pro-only?", a: "Free users can print without a watermark from their browser. Pro users get clean PDF and Google Docs export with no branding." },
  { q: "What payment methods do you accept?", a: "All major credit and debit cards via Polar. Your payment info is never stored on our servers." },
];

export default async function PricingPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-surface py-14 px-4 text-center">
        <h1
          className="text-4xl font-medium text-ink tracking-[-0.02em] mb-3"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Simple, honest pricing.
        </h1>
        <p className="text-muted">Start free. Upgrade when you need more.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {/* Free */}
          <div className="bg-surface rounded-2xl border border-hairline p-8">
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
                Get started free
              </Link>
            )}
          </div>

          {/* Pro */}
          <div className="relative bg-accent rounded-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              POPULAR
            </div>
            <h2 className="text-xl font-semibold mb-1">{proTier.name}</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{proTier.price}</span>
              <span className="text-white/60 text-sm">{proTier.per}</span>
            </div>
            <p className="text-white/60 text-xs mb-4">
              or {proTier.yearlyPrice}/mo billed yearly
            </p>
            <ul className="space-y-3 mb-8">
              {proTier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                  <Check className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            {isPro ? (
              <div className="w-full flex items-center justify-center px-6 py-3 bg-white/20 rounded-xl font-semibold text-white text-sm cursor-default">
                Current plan
              </div>
            ) : (
              <CheckoutButton isLoggedIn={!!session} />
            )}
          </div>

          {/* School */}
          <div className="bg-surface rounded-2xl border border-hairline p-8">
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
            <a
              href="mailto:hello@quizkraft.app"
              className="w-full flex items-center justify-center px-6 py-3 border border-hairline rounded-xl text-ink font-semibold hover:bg-canvas transition-colors text-sm"
            >
              Contact us
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-muted mb-16">
          Cancel anytime. No lock-in. 30-day money-back guarantee on Pro.
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
