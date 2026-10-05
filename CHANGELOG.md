# Changelog

Significant changes and why they were made. Newest first. Add an entry as the last step of any change a future reader would otherwise have to reconstruct from git history.

## 2026-10-05

- **Free plan removed.** Generating (and YouTube transcript fetches) now requires Pro, enforced server-side in `/api/generate` and `/api/youtube-transcript`. Non-Pro users see a pricing dialog when they leave the topic/notes field and on Generate. All "free plan" copy removed site-wide. (49274ec, a9df140)
- **Polar webhook fixes.** `order.paid` stored the order id as the subscription id, so cancellations never matched the user; `subscription.canceled` downgraded users before their paid period ended. Downgrade now only on `subscription.revoked`. (7be76a2)
- **Money-back guarantee claims removed** — the guarantee isn't offered. (8029b39)
- **Structured data price fixed.** Offer schema on ~65 pages still said `$0` after the free plan was removed; now `$9` / `$9–$19`. (a67be7d)
- **SEO audit fixes.** Hub pages now link all 29 subject pages (27 had no internal links); blog posts get a "Related articles" block; titles/meta descriptions trimmed; quiz FAQ corrected to the real 15-question cap; privacy policy names Gemini, Supadata, Polar, Google sign-in, Vercel and Neon. (56f9e01)
- **Duplicate-intent fix.** 17 worksheet subject pages were byte-identical to their quiz counterparts; they now have their own worksheet-focused copy in `src/lib/subjects.ts`. The "Active Recall vs. Passive Re-reading" post was rewritten with five verified citations.
