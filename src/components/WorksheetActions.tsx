"use client";

import { useState } from "react";
import { Eye, EyeOff, Printer } from "lucide-react";

/**
 * Toolbar for a saved worksheet: toggle the inline answer key and print.
 * Answers are hidden by default so "Print" gives a clean student copy.
 * The answer blocks are server-rendered with the `ws-answer` class; the
 * wrapper's data attribute controls their visibility (see globals.css).
 */
export default function WorksheetActions({ targetId }: { targetId: string }) {
  const [showAnswers, setShowAnswers] = useState(false);

  function toggle() {
    const next = !showAnswers;
    setShowAnswers(next);
    document.getElementById(targetId)?.setAttribute("data-show-answers", String(next));
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={showAnswers}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-surface transition-colors cursor-pointer"
      >
        {showAnswers ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {showAnswers ? "Hide answers" : "Show answers"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-surface transition-colors cursor-pointer"
      >
        <Printer className="h-3.5 w-3.5" />
        Print
      </button>
    </div>
  );
}
