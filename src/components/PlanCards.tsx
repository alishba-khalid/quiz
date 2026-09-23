import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import { PLANS } from "@/lib/plans";
import { SUPPORT_EMAIL } from "@/lib/constants";

/**
 * Compact Free / Pro / School cards with a link to /pricing.
 * `compact` stacks the cards for narrow spaces like the generator sidebar.
 */
export default function PlanCards({
  isLoggedIn = false,
  compact = false,
}: {
  isLoggedIn?: boolean;
  compact?: boolean;
}) {
  const grid = compact ? "grid grid-cols-1 gap-2" : "grid sm:grid-cols-3 gap-4";
  const pad = compact ? "p-3" : "p-5";

  return (
    <div>
      <div className={grid}>
        <div className={`bg-surface rounded-xl border border-hairline ${pad} flex flex-col`}>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-ink text-sm">{PLANS.free.name}</h3>
            <p className="text-ink font-bold">
              {PLANS.free.price}
              <span className="text-muted text-xs font-normal">{PLANS.free.per}</span>
            </p>
          </div>
          <p className="text-xs text-muted mt-1.5 flex-1">{PLANS.free.summary}</p>
          {!isLoggedIn && (
            <Link
              href="/signup"
              className="mt-3 w-full text-center px-3 py-2 border border-hairline rounded-lg text-ink text-xs font-semibold hover:bg-canvas transition-colors"
            >
              Create account
            </Link>
          )}
        </div>

        <div className={`bg-accent rounded-xl ${pad} text-white flex flex-col shadow-sm shadow-accent/20`}>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-sm">{PLANS.pro.name}</h3>
            <p className="font-bold">
              {PLANS.pro.price}
              <span className="text-white/70 text-xs font-normal">{PLANS.pro.per}</span>
            </p>
          </div>
          <p className="text-xs text-white/90 mt-1.5 mb-3 flex-1">{PLANS.pro.summary}</p>
          <CheckoutButton isLoggedIn={isLoggedIn} />
        </div>

        <div className={`bg-surface rounded-xl border border-hairline ${pad} flex flex-col`}>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-ink text-sm">{PLANS.school.name}</h3>
            <p className="text-ink font-bold">
              {PLANS.school.price}
              <span className="text-muted text-xs font-normal">{PLANS.school.per}</span>
            </p>
          </div>
          <p className="text-xs text-muted mt-1.5 flex-1">{PLANS.school.summary}</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-3 w-full text-center px-3 py-2 border border-hairline rounded-lg text-ink text-xs font-semibold hover:bg-canvas transition-colors"
          >
            Contact us
          </a>
        </div>
      </div>
      <p className={`text-center text-xs text-muted ${compact ? "mt-2" : "mt-4"}`}>
        <Link href="/pricing" className="text-accent font-medium hover:underline">
          Compare all plan features →
        </Link>
      </p>
    </div>
  );
}

/** Full-width pricing section for landing pages (placed after "How it works"). */
export function PricingSection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Plans &amp; pricing
          </h2>
          <p className="text-sm text-muted">
            Try one preview quiz a month on the Free plan, or go unlimited with Pro.
          </p>
        </div>
        <PlanCards isLoggedIn={isLoggedIn} />
      </div>
    </section>
  );
}
