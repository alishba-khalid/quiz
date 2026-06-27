import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { auth } from "@/auth";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Pricing | QuizKraft",
  description:
    "QuizKraft pricing plans. Start free with 5 worksheets per month, or upgrade to Pro for unlimited AI worksheet generation and answer keys.",
  openGraph: {
    title: "Pricing | QuizKraft",
    description:
      "Start free or upgrade to Pro for unlimited worksheets and answer keys.",
    type: "website",
  },
};

export default async function PricingPage() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  return (
    <div className="flex flex-col flex-1 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900">Simple, honest pricing</h1>
          <p className="mt-3 text-zinc-500">Start free. Upgrade when you need more.</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free plan */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-1">Free</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-zinc-900">$0</span>
              <span className="text-zinc-500 text-sm">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "5 worksheets per month",
                "All worksheet types",
                "All grade levels (K–12)",
                "PDF download",
                "Worksheets saved to dashboard",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            {session ? (
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center px-6 py-3 border border-zinc-200 rounded-xl text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors text-sm"
              >
                Go to dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                className="w-full flex items-center justify-center px-6 py-3 border border-zinc-200 rounded-xl text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors text-sm"
              >
                Get started free
              </Link>
            )}
          </div>

          {/* Pro plan */}
          <div className="relative bg-indigo-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              POPULAR
            </div>
            <h2 className="text-xl font-bold mb-1">Pro</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-indigo-200 text-sm">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited worksheet generation",
                "All worksheet types",
                "All grade levels (K–12)",
                "PDF download",
                "Answer key with every worksheet",
                "Priority AI generation",
                "Worksheets saved to dashboard",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-indigo-100">
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
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-zinc-900 mb-8 text-center">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel your subscription at any time from your billing portal. You keep Pro access until the end of your current billing period.",
              },
              {
                q: "Does the free plan reset monthly?",
                a: "Yes — free plan usage (5 worksheets) resets automatically every 30 days.",
              },
              {
                q: "Why is the answer key Pro-only?",
                a: "The answer key is the main value-add for teachers who want to quickly grade or check student work. It keeps the free plan sustainable.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and debit cards via Stripe. Your payment information is never stored on our servers.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-zinc-100 pb-6 last:border-0">
                <h3 className="font-semibold text-zinc-900 mb-2">{faq.q}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
