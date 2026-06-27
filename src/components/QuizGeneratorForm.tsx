"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, RefreshCw, Lock, Sparkles, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options?: string[] | null;
}

interface AnswerKeyItem {
  id: number;
  question: string;
  answer: string;
}

interface WorksheetResult {
  id: string;
  title: string;
  topic: string;
  gradeLevel: string;
  worksheetType: string;
  questionsCount: number;
  content: Question[];
  answerKey: AnswerKeyItem[] | null;
  isPro: boolean;
}

const GRADE_LEVELS = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const WORKSHEET_TYPES = [
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "fill-in-the-blank", label: "Fill in the Blank" },
  { value: "short-answer", label: "Short Answer" },
  { value: "matching", label: "Matching" },
  { value: "true-false", label: "True / False" },
];

export default function QuizGeneratorForm({
  isLoggedIn,
  isPro,
}: {
  isLoggedIn: boolean;
  isPro: boolean;
}) {
  const [topic, setTopic] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Grade 5");
  const [worksheetType, setWorksheetType] = useState("multiple-choice");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WorksheetResult | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setShowAnswerKey(false);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, gradeLevel, worksheetType, questionsCount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate worksheet.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!result) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const addLine = (
      text: string,
      fontSize: number,
      bold = false,
      hexColor = "#000000"
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      doc.setTextColor(r, g, b);
      const lines = doc.splitTextToSize(text, maxWidth) as string[];
      const lineHeight = fontSize * 0.45;
      if (y + lines.length * lineHeight > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(lines, margin, y);
      y += lines.length * lineHeight + 3;
    };

    addLine(result.title, 18, true, "#3730a3");
    y += 2;
    addLine(
      `${result.topic} · ${result.gradeLevel} · ${result.worksheetType}`,
      10,
      false,
      "#6b7280"
    );
    y += 2;
    addLine("Name: _________________________  Date: ________________", 10);
    y += 6;

    result.content.forEach((q, i) => {
      addLine(`${i + 1}. ${q.question}`, 11);
      if (q.options && q.options.length > 0) {
        const letters = ["A", "B", "C", "D", "E"];
        q.options.forEach((opt, j) => {
          addLine(`   ${letters[j] ?? j + 1}. ${opt}`, 10);
        });
      } else {
        addLine("   ___________________________________________", 10);
      }
      y += 3;
    });

    if (result.answerKey && showAnswerKey) {
      doc.addPage();
      y = 20;
      addLine("Answer Key", 16, true, "#3730a3");
      y += 4;
      result.answerKey.forEach((item, i) => {
        addLine(`${i + 1}. ${item.answer}`, 11);
      });
    }

    doc.save(`${result.title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Form card */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 sm:p-8 mb-8">
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <Lock className="h-12 w-12 text-indigo-200 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                Sign in to generate worksheets
              </h2>
              <p className="text-zinc-500 mb-6 text-sm">
                Create a free account to generate up to 5 worksheets per month.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 border border-zinc-200 rounded-xl text-zinc-700 font-medium hover:bg-zinc-50 transition-colors text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-zinc-700 mb-1.5"
                >
                  Topic or subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="topic"
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Photosynthesis, Fractions, The American Revolution..."
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="gradeLevel"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    Grade level
                  </label>
                  <select
                    id="gradeLevel"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    {GRADE_LEVELS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="worksheetType"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    Worksheet type
                  </label>
                  <select
                    id="worksheetType"
                    value={worksheetType}
                    onChange={(e) => setWorksheetType(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    {WORKSHEET_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="questionsCount"
                    className="block text-sm font-medium text-zinc-700 mb-1.5"
                  >
                    Questions (1–30)
                  </label>
                  <input
                    id="questionsCount"
                    type="number"
                    min={1}
                    max={30}
                    value={questionsCount}
                    onChange={(e) =>
                      setQuestionsCount(parseInt(e.target.value, 10) || 1)
                    }
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Worksheet
                  </>
                )}
              </button>

              {!isPro && (
                <p className="text-xs text-center text-zinc-400">
                  Free plan: up to 5 worksheets/month.{" "}
                  <Link href="/pricing" className="text-indigo-500 hover:text-indigo-600">
                    Upgrade for unlimited →
                  </Link>
                </p>
              )}
            </form>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{result.title}</h2>
                  <p className="text-indigo-200 text-sm mt-1">
                    {result.gradeLevel} · {result.worksheetType} ·{" "}
                    {result.questionsCount} questions
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={downloadPDF}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => {
                      setResult(null);
                      setTopic("");
                      setShowAnswerKey(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {result.content.map((q, i) => (
                  <div
                    key={q.id}
                    className="pb-6 border-b border-zinc-100 last:border-0 last:pb-0"
                  >
                    <p className="font-medium text-zinc-900">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mr-2 flex-shrink-0">
                        {i + 1}
                      </span>
                      {q.question}
                    </p>
                    {q.options && q.options.length > 0 ? (
                      <div className="mt-3 ml-8 grid sm:grid-cols-2 gap-2">
                        {q.options.map((opt, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 text-sm text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2"
                          >
                            <span className="font-medium text-zinc-400 w-4">
                              {String.fromCharCode(65 + j)}.
                            </span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 ml-8 h-8 border-b-2 border-dashed border-zinc-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Answer key */}
              <div className="mt-8 pt-6 border-t border-zinc-100">
                {result.answerKey ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        Answer Key
                      </h3>
                      <button
                        onClick={() => setShowAnswerKey(!showAnswerKey)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        {showAnswerKey ? "Hide" : "Show"} answers
                      </button>
                    </div>
                    {showAnswerKey && (
                      <div className="space-y-2">
                        {result.answerKey.map((item, i) => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            <span className="font-medium text-zinc-400 w-6 flex-shrink-0">
                              {i + 1}.
                            </span>
                            <span className="text-zinc-700">{item.answer}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                    <Lock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        Answer key is a Pro feature
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        Upgrade to Pro to unlock answer keys for all worksheets.{" "}
                        <Link
                          href="/pricing"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          View pricing →
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
