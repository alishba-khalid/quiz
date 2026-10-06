# Decisions

Judgment calls with no obviously-correct answer, with the reasoning, so they don't get re-argued. Newest first.

## 2026-10-05 — Differentiate quiz and worksheet subject pages instead of merging them

**Context:** 26 subjects have both `/quiz-generator/<subject>` and `/worksheet-generator/<subject>`. 17 pairs had identical copy, a duplicate-intent risk under Google's scaled-content policy.
**Options:** (a) rewrite worksheet pages around practice/printing; (b) merge each pair and 301-redirect one side.
**Decision:** (a). Merging deletes 26 indexed URLs and is hard to reverse; "worksheet" and "quiz" are distinct search intents (printable practice vs. assessment). Quiz pages keep the assessment angle; worksheet pages cover scaffolding, layout, homework and reteaching.
**Revisit if:** Search Console shows quiz/worksheet pairs for the same subject ranking for the same queries with both stuck below page 1.

## 2026-10-05 — No free plan

**Decision:** generation is Pro-only ($9/month); School/Team is $19/teacher. No free previews.
**Implication:** site copy and structured data must never claim free usage or a $0 price.

## 2026-10-06 — Stay on Gemini's free tier until there are paying users

**Context:** the Gemini key (project "quiczkart", key …oAig) is on the free tier, where Google may use submitted content to improve its products and human reviewers may read it. Free-tier rate limits are also low.
**Decision:** owner chose not to enable billing yet. The privacy policy now says this plainly, and the notes field asks teachers not to paste personal info.
**Revisit when:** there are regular paying users, or generations start failing with rate-limit (429) errors. Then enable billing on the key in AI Studio ("Set up billing"), set a budget alert, and remove the free-tier sentence from /privacy.
