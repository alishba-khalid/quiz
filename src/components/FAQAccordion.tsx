"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { GENERAL_FAQS as faqs } from "@/lib/faqs";

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
            aria-controls={`faq-answer-${i}`}
          >
            <span className="font-semibold text-ink">{item.q}</span>
            <span className="flex-shrink-0 w-6 h-6 rounded-full border border-hairline flex items-center justify-center text-muted">
              {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </span>
          </button>
          {/* Always in the DOM (hidden when closed) so crawlers and find-in-page see answers. */}
          <p id={`faq-answer-${i}`} hidden={open !== i} className="mt-3 text-muted text-sm leading-relaxed animate-fade-in">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}
