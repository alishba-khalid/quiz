"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan gives you 1 worksheet to try — no credit card required. All question types, answer keys, quiz mode, and the study loop are included. Upgrade to Pro for unlimited generation.",
  },
  {
    q: "What subjects and grades does it cover?",
    a: "Any subject, any grade. Math, science, history, literature, languages — from kindergarten through college. Just type the topic and select the grade.",
  },
  {
    q: "Can I edit the questions?",
    a: "Not yet — editing is on the roadmap. For now, regenerate with a more specific topic if a question isn't right. The AI produces better questions the more specific you are.",
  },
  {
    q: "Can I upload my own material?",
    a: "Yes, on Pro. Paste text or upload a PDF and QuizKraft generates questions directly from your source material — great for turning textbook chapters or notes into a quiz.",
  },
  {
    q: "Can students take quizzes online?",
    a: "Yes. In quiz mode, students click through questions, get scored instantly, and wrong answers come back for review until they get them right. Share the link or let them use the app directly.",
  },
  {
    q: "Can I print or export?",
    a: "Yes. Every worksheet has a clean print layout. Free users can print with a QuizKraft watermark. Pro users get PDF export and Google Docs export with no watermark.",
  },
  {
    q: "Do you offer school or team plans?",
    a: "Yes — the School plan is $19/month per teacher and includes shared team libraries, class management, and centralized billing. Contact us for custom quotes for larger teams.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline">
      {faqs.map((item, i) => (
        <div key={i} className="py-5">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-ink">{item.q}</span>
            <span className="flex-shrink-0 w-6 h-6 rounded-full border border-hairline flex items-center justify-center text-muted">
              {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </span>
          </button>
          {open === i && (
            <p className="mt-3 text-muted text-sm leading-relaxed animate-fade-in">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
