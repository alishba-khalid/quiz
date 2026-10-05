// Single source of truth for plan names, prices and headline copy.
// Used by /pricing, the compact plan cards on landing pages, and the generator form.
export const PLANS = {
  pro: {
    name: "Pro",
    price: "$9",
    per: "/month",
    summary: "Unlimited quizzes from topics, YouTube and PDFs. Clean PDF exports.",
  },
  school: {
    name: "School / Team",
    price: "$19",
    per: "/teacher/month",
    summary: "Everything in Pro, plus shared libraries and multiple teacher seats.",
  },
} as const;
