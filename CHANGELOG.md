# Changelog

Significant changes and why they were made. Newest first. Add an entry as the last step of any change a future reader would otherwise have to reconstruct from git history.

## 2026-10-06

- **Security/correctness.** Signup validates and lowercases emails, rate-limits per IP; login is case-insensitive. Checkout refuses existing Pro users. Generate caps/whitelists prompt inputs, drops malformed AI questions, hides internal errors. Saved-worksheet titles only shown to owners. Security headers added. (1b96b69, 7b06103)
- **Honesty.** Contact form only pretended to send — now opens the visitor's email app. Removed non-existent features: School-plan class management/shared libraries/centralized billing, "Priority AI processing", share links, "matching" questions, "5+ formats", "trained on" claims, uncited stats. (1b96b69, 2b16990)
- **Polish.** Favicon/Apple icon/OG images rendered a missing-glyph box — now SVG. Blog images via next/image (index was ~9 MB). Accessible generator form. Dashboard delete needs confirmation and works on touch; billing errors shown. FAQ schema generated from the visible FAQ list. PDF export maps unsupported symbols (CO₂, ≤, π). Saved worksheets get answer toggle + print. "Get Pro" signup goes straight to checkout. Friendly error page; generator handles timeouts. Lint 29 errors → 0. (7b06103, 6939b75, c5d372d)
- **Known, not fixable in code:** quizkraft.tech has no MX records, so support@quizkraft.tech can't receive mail. Needs email forwarding set up at the domain registrar.

## 2026-10-05

- **Blog expanded.** All 25 short posts (~200–450 words) expanded to ~600–700 words, with related-post links. Removed claims about features the product doesn't have (shareable quiz links with grading data, class data summaries, matching questions, diagram/grid generation) and unsourced time-saving numbers.
- **Free plan removed.** Generating (and YouTube transcript fetches) now requires Pro, enforced server-side in `/api/generate` and `/api/youtube-transcript`. Non-Pro users see a pricing dialog when they leave the topic/notes field and on Generate. All "free plan" copy removed site-wide. (49274ec, a9df140)
- **Polar webhook fixes.** `order.paid` stored the order id as the subscription id, so cancellations never matched the user; `subscription.canceled` downgraded users before their paid period ended. Downgrade now only on `subscription.revoked`. (7be76a2)
- **Money-back guarantee claims removed** — the guarantee isn't offered. (8029b39)
- **Structured data price fixed.** Offer schema on ~65 pages still said `$0` after the free plan was removed; now `$9` / `$9–$19`. (a67be7d)
- **SEO audit fixes.** Hub pages now link all 29 subject pages (27 had no internal links); blog posts get a "Related articles" block; titles/meta descriptions trimmed; quiz FAQ corrected to the real 15-question cap; privacy policy names Gemini, Supadata, Polar, Google sign-in, Vercel and Neon. (56f9e01)
- **Duplicate-intent fix.** 17 worksheet subject pages were byte-identical to their quiz counterparts; they now have their own worksheet-focused copy in `src/lib/subjects.ts`. The "Active Recall vs. Passive Re-reading" post was rewritten with five verified citations.
