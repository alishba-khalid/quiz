"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Download,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Printer,
  Check,
  X,
  RotateCcw,
  BookOpen,
  Youtube,
  FileText,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Video,
} from "lucide-react";
import { FREE_TOPIC_LIMIT, FREE_SOURCE_LIMIT, MAX_TRANSCRIPT_CHARS } from "@/lib/constants";

/* -- Types -------------------------------------------------------- */
type QuestionType = "multiple-choice" | "true-false" | "short-answer" | "fill-in-the-blank";
type Difficulty = "Easy" | "Medium" | "Hard";
type Tab = "worksheet" | "quiz";
type QuizPhase = "answering" | "scored";
type InputMode = "topic" | "youtube" | "source";

interface VideoInfo {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  url: string;
}

interface Question {
  i: number;
  type: QuestionType;
  q: string;
  options?: string[] | null;
}

interface AnswerKeyItem {
  i: number;
  type: QuestionType;
  q: string;
  answer: string;
  explanation: string;
}

interface WorksheetResult {
  id: string;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  difficulty: string;
  questionsCount: number;
  questions: Question[];
  answerKey: AnswerKeyItem[];
  isPro: boolean;
  isGuest?: boolean;
  videoInfo?: VideoInfo | null;
}

interface QuizState {
  phase: QuizPhase;
  activeSet: number[];
  mastered: Set<number>;
  userAnswers: Record<number, string>;
  wrongIndices: number[];
}

/* -- SVG grading marks -------------------------------------------- */
function CheckMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 13 Q8 16 10 19 Q14 10 21 5"
        stroke="#2CB67D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        className="animate-draw"
      />
    </svg>
  );
}

function CrossMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4 L20 20 M20 4 L4 20"
        stroke="#EF4565"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        className="animate-draw"
      />
    </svg>
  );
}

/* -- Question type chips config ----------------------------------- */
const Q_TYPES: { value: QuestionType; label: string }[] = [
  { value: "multiple-choice", label: "Multiple choice" },
  { value: "true-false", label: "True / False" },
  { value: "short-answer", label: "Short answer" },
  { value: "fill-in-the-blank", label: "Fill in the blank" },
];

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const GRADE_OPTIONS = [
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
  "College",
];

/* -- Helpers ------------------------------------------------------ */
function typeLabel(type: QuestionType) {
  return Q_TYPES.find((t) => t.value === type)?.label ?? type;
}

function gradeAnswer(userAnswer: string, correctAnswer: string, type: QuestionType): boolean {
  const u = userAnswer.trim().toLowerCase();
  const c = correctAnswer.trim().toLowerCase();
  if (!u) return false;
  if (type === "multiple-choice" || type === "true-false") return u === c;
  if (u.length < 3) return false;
  return c === u || c.includes(u) || u.includes(c);
}

/* -- Main component ----------------------------------------------- */
export default function QuizGeneratorForm({
  isLoggedIn = false,
  isPro = false,
  creditsLeft = FREE_TOPIC_LIMIT,
  initialMode = "topic",
  prefillTopic = "",
}: {
  isLoggedIn?: boolean;
  isPro?: boolean;
  creditsLeft?: number;
  initialMode?: InputMode;
  prefillTopic?: string;
}) {
  /* Mode state */
  const [mode, setMode] = useState<InputMode>(initialMode);

  /* Form state */
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("Grade 5");
  const [topic, setTopic] = useState(prefillTopic);
  const [sourceMaterial, setSourceMaterial] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>(["multiple-choice"]);
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [questionsCount, setQuestionsCount] = useState(5);

  /* YouTube Fetch state */
  const [fetchingYoutube, setFetchingYoutube] = useState(false);
  const [youtubeVideoInfo, setYoutubeVideoInfo] = useState<VideoInfo | null>(null);
  const [youtubeTranscript, setYoutubeTranscript] = useState("");
  const [youtubeWordCount, setYoutubeWordCount] = useState(0);
  const [youtubeError, setYoutubeError] = useState("");

  /* Result + UI state */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WorksheetResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("worksheet");
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  /* Quiz state */
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  /* Sync initialMode when prop changes */
  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  /* -- Type chip toggle -- */
  function toggleType(type: QuestionType) {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.length > 1
          ? prev.filter((t) => t !== type)
          : prev
        : [...prev, type]
    );
  }

  /* -- Fetch YouTube Transcript & Info -- */
  async function handleFetchYoutube(urlToFetch?: string) {
    const url = (urlToFetch || youtubeUrl).trim();
    if (!url) return;

    setFetchingYoutube(true);
    setYoutubeError("");
    setYoutubeVideoInfo(null);
    setYoutubeTranscript("");
    setYoutubeWordCount(0);

    try {
      const res = await fetch("/api/youtube-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) {
        setYoutubeError(data.error || "Failed to load video transcript.");
        return;
      }

      setYoutubeVideoInfo(data.videoInfo);
      setYoutubeTranscript(data.transcript);
      setYoutubeWordCount(data.wordCount);
      if (!topic && data.videoInfo?.title) {
        setTopic(data.videoInfo.title);
      }
    } catch {
      setYoutubeError("Network error while loading YouTube video. Check your connection.");
    } finally {
      setFetchingYoutube(false);
    }
  }

  /* -- Generate Quiz -- */
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let effectiveTopic = topic.trim();
    let effectiveSource = "";
    let effectiveVideoInfo: VideoInfo | null = null;

    if (mode === "youtube") {
      if (!youtubeUrl.trim()) {
        setError("Please enter a YouTube video URL.");
        return;
      }

      let currentTranscript = youtubeTranscript;
      let currentInfo = youtubeVideoInfo;

      // If transcript hasn't been fetched yet, fetch it now
      if (!currentTranscript) {
        setLoading(true);
        try {
          const res = await fetch("/api/youtube-transcript", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: youtubeUrl.trim() }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || "Failed to fetch YouTube transcript.");
            setLoading(false);
            return;
          }
          currentTranscript = data.transcript;
          currentInfo = data.videoInfo;
          setYoutubeVideoInfo(data.videoInfo);
          setYoutubeTranscript(data.transcript);
          setYoutubeWordCount(data.wordCount);
        } catch {
          setError("Network error while extracting video transcript.");
          setLoading(false);
          return;
        }
      }

      effectiveTopic = currentInfo?.title || topic.trim() || "YouTube Video";
      effectiveSource = currentTranscript;
      effectiveVideoInfo = currentInfo;
    } else if (mode === "source") {
      if (!sourceMaterial.trim()) {
        setError("Please paste your notes, article, or study text.");
        return;
      }
      effectiveSource = sourceMaterial.trim();
      if (!effectiveTopic) {
        effectiveTopic = "Study Notes & Source Material";
      }
    } else {
      if (!effectiveTopic) {
        setError("Please enter a topic.");
        return;
      }
    }

    setResult(null);
    setQuiz(null);
    setShowAnswerKey(false);
    setActiveTab("worksheet");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject || effectiveTopic,
          grade,
          topic: effectiveTopic,
          questionTypes: selectedTypes,
          difficulty,
          questionsCount,
          sourceMaterial: effectiveSource || undefined,
          videoInfo: effectiveVideoInfo || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      setResult(data);
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  /* -- Start quiz mode -- */
  function startQuiz() {
    if (!result) return;
    const allIndices = result.questions.map((_, i) => i);
    setQuiz({
      phase: "answering",
      activeSet: allIndices,
      mastered: new Set(),
      userAnswers: {},
      wrongIndices: [],
    });
    setActiveTab("quiz");
  }

  /* -- Select an answer in quiz -- */
  function selectAnswer(qIdx: number, value: string) {
    if (!quiz || quiz.phase !== "answering") return;
    setQuiz((prev) =>
      prev ? { ...prev, userAnswers: { ...prev.userAnswers, [qIdx]: value } } : prev
    );
  }

  /* -- Check answers -- */
  function checkAnswers() {
    if (!quiz || !result) return;
    const newMastered = new Set(quiz.mastered);
    const wrong: number[] = [];
    quiz.activeSet.forEach((qi) => {
      const q = result.questions[qi];
      const ak = result.answerKey[qi];
      const userAns = quiz.userAnswers[qi] ?? "";
      if (gradeAnswer(userAns, ak.answer, q.type)) {
        newMastered.add(qi);
      } else {
        wrong.push(qi);
      }
    });
    setQuiz((prev) =>
      prev ? { ...prev, phase: "scored", mastered: newMastered, wrongIndices: wrong } : prev
    );
  }

  /* -- Review missed -- */
  function reviewMissed() {
    if (!quiz) return;
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            phase: "answering",
            activeSet: prev.wrongIndices,
            userAnswers: {},
            wrongIndices: [],
          }
        : prev
    );
  }

  /* -- Retake all -- */
  function retakeAll() {
    if (!result) return;
    const allIndices = result.questions.map((_, i) => i);
    setQuiz({
      phase: "answering",
      activeSet: allIndices,
      mastered: new Set(),
      userAnswers: {},
      wrongIndices: [],
    });
  }

  /* -- PDF export -- */
  async function downloadPDF() {
    if (!result) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 20;
    const maxW = doc.internal.pageSize.getWidth() - margin * 2;
    let y = 20;

    function addText(text: string, size: number, bold = false, color = "#000000") {
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const [r, g, b] = [1, 3, 5].map((n) => parseInt(color.slice(n, n + 2), 16));
      doc.setTextColor(r, g, b);
      const lines = doc.splitTextToSize(text, maxW) as string[];
      const lh = size * 0.45;
      if (y + lines.length * lh > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(lines, margin, y);
      y += lines.length * lh + 3;
    }

    addText(result.title, 18, true, "#0A1628");
    addText(`${result.subject} · ${result.grade} · ${result.difficulty}`, 10, false, "#6E6E79");
    y += 2;
    addText("Name: ________________________________   Date: ________________", 10);
    y += 6;

    result.questions.forEach((q, i) => {
      addText(`${i + 1}. ${q.q}`, 11);
      if (q.options?.length) {
        const letters = ["A", "B", "C", "D"];
        q.options.forEach((opt, j) => addText(`   ${letters[j] ?? j + 1}. ${opt}`, 10));
      } else {
        addText("   ___________________________________________", 10);
      }
      y += 3;
    });

    if (!isPro) {
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by QuizKraft — quizkraft.tech", margin, 285);
    }

    if (showAnswerKey) {
      doc.addPage();
      y = 20;
      addText("Answer Key", 16, true, "#0A1628");
      y += 4;
      result.answerKey.forEach((ak, i) => {
        addText(`${i + 1}. ${ak.answer}`, 11);
        addText(`   ${ak.explanation}`, 10, false, "#6E6E79");
        y += 2;
      });
    }

    doc.save(`${result.title.replace(/\s+/g, "_")}.pdf`);
  }

  const allAnswered = quiz
    ? quiz.activeSet.every(
        (i) => quiz.userAnswers[i] !== undefined && quiz.userAnswers[i] !== ""
      )
    : false;
  const thisRoundCorrect =
    quiz?.phase === "scored" ? quiz.activeSet.length - quiz.wrongIndices.length : 0;
  const totalMastered = quiz?.mastered.size ?? 0;
  const totalQuestions = result?.questions.length ?? 0;
  const allDone = quiz?.phase === "scored" && quiz.wrongIndices.length === 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      {/* -- Left: Controls panel ----------------------------------- */}
      <aside className="lg:w-88 xl:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-hairline bg-surface no-print">
        <div className="lg:sticky lg:top-16 p-6 space-y-5">
          {/* Header */}
          <div>
            <h1 className="font-semibold text-ink text-lg">AI Quiz Generator</h1>
            <p className="text-xs text-muted mt-0.5">
              Choose an input method, configure options, and generate.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="p-1 bg-canvas border border-hairline rounded-xl grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => {
                setMode("topic");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "topic"
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Topic
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("youtube");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "youtube"
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              YouTube
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("source");
                setError("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "source"
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-muted hover:text-ink"
              }`}
            >
              <FileText className="h-3.5 w-3.5 text-blue-500" />
              Notes / PDF
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* YouTube Mode Input */}
            {mode === "youtube" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>YouTube Video URL</span>
                    <span className="text-[10px] text-muted normal-case font-normal">
                      Up to ~30 mins
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={youtubeUrl}
                      onChange={(e) => {
                        setYoutubeUrl(e.target.value);
                        setYoutubeError("");
                      }}
                      onBlur={() => {
                        if (youtubeUrl.trim() && !youtubeVideoInfo && !fetchingYoutube) {
                          handleFetchYoutube();
                        }
                      }}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3.5 py-2.5 pr-20 border border-hairline rounded-xl text-sm text-ink placeholder-muted bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                    />
                    <button
                      type="button"
                      disabled={fetchingYoutube || !youtubeUrl.trim()}
                      onClick={() => handleFetchYoutube()}
                      className="absolute right-1.5 top-1.5 px-2.5 py-1.5 bg-surface border border-hairline rounded-lg text-xs font-medium text-ink hover:bg-hairline/40 disabled:opacity-40 transition-colors"
                    >
                      {fetchingYoutube ? "Loading..." : "Check"}
                    </button>
                  </div>
                </div>

                {/* YouTube Preview Card */}
                {youtubeVideoInfo && (
                  <div className="p-3 bg-canvas border border-hairline rounded-xl flex gap-3 items-center animate-fade-in">
                    <img
                      src={youtubeVideoInfo.thumbnail}
                      alt={youtubeVideoInfo.title}
                      className="w-20 h-14 object-cover rounded-lg flex-shrink-0 bg-hairline"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-ink truncate">
                        {youtubeVideoInfo.title}
                      </p>
                      <p className="text-[11px] text-muted truncate mt-0.5">
                        {youtubeVideoInfo.author}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-correct bg-correct-soft px-1.5 py-0.5 rounded">
                          <Check className="h-3 w-3" /> Transcript ready
                        </span>
                        {youtubeWordCount > 0 && (
                          <span className="text-[10px] text-muted">
                            ~{youtubeWordCount} words
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* YouTube inline error */}
                {youtubeError && (
                  <div className="p-3 bg-wrong-soft border border-wrong/20 text-wrong text-xs rounded-xl flex items-start gap-2 animate-fade-in">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-0.5">Could not fetch video transcript</p>
                      <p className="text-[11px] text-wrong/90 leading-relaxed">{youtubeError}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pasted Notes / Source Material Mode */}
            {mode === "source" && (
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5 flex items-center justify-between">
                  <span>Paste Notes / Study Text</span>
                  <span className="text-[10px] text-muted normal-case font-normal">
                    Free up to {MAX_TRANSCRIPT_CHARS.toLocaleString()} chars
                  </span>
                </label>
                <textarea
                  required
                  value={sourceMaterial}
                  onChange={(e) => setSourceMaterial(e.target.value)}
                  placeholder="Paste lecture notes, textbook chapters, or study guide text here to generate custom questions..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 border border-hairline rounded-xl text-sm text-ink placeholder-muted bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-y"
                />
              </div>
            )}

            {/* Subject / Topic (Topic Mode or Optional Context) */}
            {mode === "topic" ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Mathematics, Biology, World History"
                    className="w-full px-3.5 py-2.5 border border-hairline rounded-xl text-sm text-ink placeholder-muted bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                    Topic <span className="text-wrong normal-case font-normal">required</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Photosynthesis, Quadratic Equations, Cold War"
                    className="w-full px-3.5 py-2.5 border border-hairline rounded-xl text-sm text-ink placeholder-muted bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                  Quiz Title / Subject <span className="text-muted normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={mode === "youtube" ? "Auto-fills from video title" : "e.g. Unit 3 Review"}
                  className="w-full px-3.5 py-2.5 border border-hairline rounded-xl text-sm text-ink placeholder-muted bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            )}

            {/* Grade Level */}
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                Target Grade Level
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-hairline rounded-xl text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Question types */}
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-2">
                Question types
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Q_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => toggleType(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedTypes.includes(t.value)
                        ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-canvas text-muted border-hairline hover:border-accent/40 hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                Difficulty
              </label>
              <div className="flex border border-hairline rounded-xl overflow-hidden">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      difficulty === d
                        ? "bg-accent text-white"
                        : "bg-canvas text-muted hover:text-ink"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-ink uppercase tracking-wide">
                  Questions
                </label>
                <span className="text-xs font-bold text-accent px-2 py-0.5 bg-accent-soft rounded-md">
                  {questionsCount}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={15}
                value={questionsCount}
                onChange={(e) => setQuestionsCount(parseInt(e.target.value, 10))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-[11px] text-muted mt-0.5">
                <span>3 questions</span>
                <span>15 questions</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 bg-wrong-soft border border-wrong/20 text-wrong text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={
                loading ||
                fetchingYoutube ||
                (mode === "topic" && !topic.trim()) ||
                (mode === "youtube" && !youtubeUrl.trim()) ||
                (mode === "source" && !sourceMaterial.trim())
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm shadow-sm shadow-accent/20 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating questions...
                </>
              ) : (
                <>
                  {mode === "youtube" ? (
                    <Youtube className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  {mode === "youtube"
                    ? "Generate from YouTube"
                    : mode === "source"
                    ? "Generate from notes"
                    : "Generate quiz"}
                </>
              )}
            </button>

            {/* Credits and plan summary */}
            <div className="text-center text-xs text-muted pt-1 space-y-1">
              {isLoggedIn ? (
                <p>
                  {isPro
                    ? "Unlimited generations (Pro) · ~10 seconds"
                    : creditsLeft > 0
                    ? `${creditsLeft} free generation${creditsLeft === 1 ? "" : "s"} left this month`
                    : "No credits remaining this month"}
                </p>
              ) : (
                <p>
                  Free to try · No signup required for first use
                </p>
              )}

              {!isPro && (
                <p className="text-[11px]">
                  <Link href="/pricing" className="text-accent font-medium hover:underline">
                    Upgrade to Pro
                  </Link>{" "}
                  for watermark-free PDF exports & unlimited use
                </p>
              )}
            </div>
          </form>
        </div>
      </aside>

      {/* -- Right: Output panel ------------------------------------ */}
      <div ref={outputRef} className="flex-1 flex flex-col min-w-0 bg-canvas">
        {/* Empty state */}
        {!result && !loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-hairline flex items-center justify-center mx-auto mb-4">
                {mode === "youtube" ? (
                  <Youtube className="h-7 w-7 text-hairline" />
                ) : (
                  <BookOpen className="h-7 w-7 text-hairline" />
                )}
              </div>
              <p className="font-semibold text-ink mb-1">
                {mode === "youtube"
                  ? "Paste a YouTube link to generate"
                  : "Your generated quiz will appear here"}
              </p>
              <p className="text-sm text-muted">
                {mode === "youtube"
                  ? "QuizKraft extracts the video transcript and creates interactive recall questions in ~10 seconds."
                  : "Choose your topic or paste your notes on the left and hit generate."}
              </p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-semibold text-ink mb-1">Building your quiz...</p>
              <p className="text-sm text-muted">
                Analyzing content and writing rigorous assessment questions (~10s).
              </p>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="flex flex-col flex-1">
            {/* Header Toolbar */}
            <div className="border-b border-hairline bg-surface px-6 py-4 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-semibold text-ink text-base sm:text-lg">{result.title}</h2>
                  <p className="text-xs text-muted mt-0.5">
                    {result.grade} · {result.difficulty} · {result.questionsCount} questions
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-canvas transition-colors cursor-pointer"
                  >
                    {showAnswerKey ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {showAnswerKey ? "Hide key" : "Answer key"}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-canvas transition-colors cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-canvas transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </button>
                  <button
                    onClick={() => {
                      setResult(null);
                      setQuiz(null);
                      setTopic("");
                      setYoutubeVideoInfo(null);
                      setYoutubeTranscript("");
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-canvas transition-colors cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    New
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1">
                {(["worksheet", "quiz"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === "quiz" && !quiz) startQuiz();
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                      activeTab === tab
                        ? "bg-accent text-white"
                        : "text-muted hover:text-ink hover:bg-canvas"
                    }`}
                  >
                    {tab === "quiz" ? "Quiz mode (Study loop)" : "Worksheet"}
                  </button>
                ))}
              </div>
            </div>

            {/* Video confirmation banner (if generated from YouTube) */}
            {result.videoInfo && (
              <div className="bg-surface border-b border-hairline px-6 py-3.5 no-print">
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={result.videoInfo.thumbnail}
                      alt={result.videoInfo.title}
                      className="w-16 h-11 object-cover rounded-lg flex-shrink-0 bg-hairline"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 bg-red-500/10 px-1.5 py-0.5 rounded">
                          Source Video
                        </span>
                        <span className="text-xs text-muted truncate">
                          {result.videoInfo.author}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-ink truncate mt-0.5">
                        {result.videoInfo.title}
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.videoInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dark hover:underline"
                  >
                    Watch video <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Guest Banner Prompt */}
            {result.isGuest && (
              <div className="bg-accent-soft/40 border-b border-accent/20 px-6 py-2.5 text-center text-xs text-ink no-print">
                <span>Want to save this quiz and get 5 free generations each month? </span>
                <Link href="/signup" className="text-accent font-semibold hover:underline">
                  Create a free account →
                </Link>
              </div>
            )}

            {/* Worksheet tab */}
            {activeTab === "worksheet" && (
              <div className="flex-1 p-6 sm:p-8 max-w-2xl mx-auto w-full print-sheet">
                {/* Print header */}
                <div className="mb-8 pb-4 border-b border-hairline print-header">
                  <h1 className="text-xl font-bold text-ink print-title">{result.title}</h1>
                  <p className="text-sm text-muted mt-1">
                    {result.subject} · {result.grade} · {result.difficulty}
                  </p>
                  <div className="mt-3 flex gap-8 text-sm text-muted">
                    <span>
                      Name: <span className="inline-block w-40 border-b border-ink/30 ml-1" />
                    </span>
                    <span>
                      Date: <span className="inline-block w-24 border-b border-ink/30 ml-1" />
                    </span>
                  </div>
                </div>

                <div className="space-y-7">
                  {result.questions.map((q, i) => (
                    <div key={i} className="print-question">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <span className="inline-block text-xs font-medium text-muted bg-canvas border border-hairline rounded-full px-2 py-0.5 mr-2 mb-1">
                            {typeLabel(q.type)}
                          </span>
                          <p className="font-medium text-ink">{q.q}</p>
                        </div>
                      </div>

                      <div className="ml-9">
                        {q.type === "multiple-choice" && q.options ? (
                          <div className="grid sm:grid-cols-2 gap-2">
                            {q.options.map((opt, j) => (
                              <div
                                key={j}
                                className="flex items-center gap-2.5 text-sm text-ink px-3 py-2.5 rounded-xl border border-hairline bg-surface"
                              >
                                <span className="font-semibold text-muted w-4 flex-shrink-0">
                                  {String.fromCharCode(65 + j)}.
                                </span>
                                {opt}
                              </div>
                            ))}
                          </div>
                        ) : q.type === "true-false" ? (
                          <div className="flex gap-3">
                            {["True", "False"].map((opt) => (
                              <div
                                key={opt}
                                className="flex items-center gap-2 text-sm text-ink px-4 py-2.5 rounded-xl border border-hairline bg-surface"
                              >
                                <div className="w-4 h-4 rounded-full border-2 border-hairline flex-shrink-0" />
                                {opt}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="h-8 border-b border-hairline" />
                            <div className="h-8 border-b border-hairline" />
                          </div>
                        )}

                        {/* Answer key display */}
                        {showAnswerKey && (
                          <div className="mt-3 flex items-start gap-2 text-sm text-correct bg-correct-soft border border-correct/20 rounded-xl px-3 py-2.5 animate-fade-in">
                            <CheckMark size={16} />
                            <div>
                              <span className="font-semibold">
                                {result.answerKey[i]?.answer}
                              </span>
                              <p className="text-xs text-muted mt-0.5">
                                {result.answerKey[i]?.explanation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!isPro && (
                  <p className="text-center text-xs text-muted mt-10 pt-4 border-t border-hairline">
                    Generated by QuizKraft · quizkraft.tech
                  </p>
                )}
              </div>
            )}

            {/* Quiz mode tab */}
            {activeTab === "quiz" && quiz && (
              <div className="flex-1 p-6 sm:p-8 max-w-2xl mx-auto w-full no-print">
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>
                      {quiz.phase === "answering"
                        ? `${quiz.activeSet.length} question${
                            quiz.activeSet.length !== 1 ? "s" : ""
                          } to answer`
                        : allDone
                        ? "All mastered!"
                        : `${quiz.wrongIndices.length} to review`}
                    </span>
                    <span>
                      {totalMastered} / {totalQuestions} mastered
                    </span>
                  </div>
                  <div className="h-2 bg-hairline rounded-full overflow-hidden">
                    <div
                      className="h-full bg-correct rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          totalQuestions ? (totalMastered / totalQuestions) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* All mastered state */}
                {quiz.phase === "scored" && allDone && (
                  <div className="text-center py-10 animate-fade-up">
                    <div className="w-16 h-16 rounded-full bg-correct-soft border border-correct/20 flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 13 Q8 16 10 19 Q14 10 21 5"
                          stroke="#2CB67D"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="100"
                          strokeDashoffset="100"
                          className="animate-draw"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-ink text-lg mb-1">
                      All {totalQuestions} questions mastered!
                    </h3>
                    <p className="text-sm text-muted mb-6">
                      Great work. You have successfully completed the active recall loop.
                    </p>
                    <button
                      onClick={retakeAll}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-hairline rounded-xl text-sm font-medium text-ink hover:bg-surface transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" /> Retake all
                    </button>
                  </div>
                )}

                {/* Score bar + actions */}
                {quiz.phase === "scored" && !allDone && (
                  <div className="mb-6 p-4 bg-surface rounded-2xl border border-hairline animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-ink">
                        {thisRoundCorrect} of {quiz.activeSet.length} correct{" "}
                        <span className="text-muted font-normal text-sm">
                          ({Math.round((thisRoundCorrect / quiz.activeSet.length) * 100)}%)
                        </span>
                      </span>
                    </div>
                    <div className="h-2 bg-hairline rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(thisRoundCorrect / quiz.activeSet.length) * 100}%`,
                          background:
                            thisRoundCorrect === quiz.activeSet.length
                              ? "#2CB67D"
                              : "#3DA9FC",
                        }}
                      />
                    </div>
                    <div className="flex gap-3">
                      {quiz.wrongIndices.length > 0 && (
                        <button
                          onClick={reviewMissed}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors cursor-pointer"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Review missed ({quiz.wrongIndices.length})
                        </button>
                      )}
                      <button
                        onClick={retakeAll}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-hairline text-sm font-medium text-ink rounded-xl hover:bg-canvas transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" /> Retake all
                      </button>
                    </div>
                  </div>
                )}

                {/* Questions List */}
                {!allDone && (
                  <div className="space-y-6">
                    {quiz.activeSet.map((qi) => {
                      const q = result.questions[qi];
                      const ak = result.answerKey[qi];
                      const userAns = quiz.userAnswers[qi];
                      const isScored = quiz.phase === "scored";
                      const isCorrect = isScored
                        ? gradeAnswer(userAns ?? "", ak.answer, q.type)
                        : false;

                      return (
                        <div
                          key={`${qi}-${quiz.activeSet.join("")}`}
                          className={`rounded-2xl border p-5 transition-all ${
                            isScored
                              ? isCorrect
                                ? "border-correct/30 bg-correct-soft"
                                : "border-wrong/30 bg-wrong-soft"
                              : "border-hairline bg-surface"
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                              {qi + 1}
                            </span>
                            <p className="font-medium text-ink flex-1">{q.q}</p>
                            {isScored && (
                              <div className="flex-shrink-0">
                                {isCorrect ? <CheckMark /> : <CrossMark />}
                              </div>
                            )}
                          </div>

                          {/* MCQ options */}
                          {(q.type === "multiple-choice" || q.type === "true-false") &&
                            q.options && (
                              <div className="space-y-2 ml-9">
                                {q.options.map((opt) => {
                                  const isSelected = userAns === opt;
                                  const isRight =
                                    opt.toLowerCase() === ak.answer.toLowerCase();
                                  let cls =
                                    "border-hairline bg-canvas text-ink hover:border-accent/40";
                                  if (isScored) {
                                    if (isRight)
                                      cls =
                                        "border-correct bg-correct-soft text-correct font-semibold";
                                    else if (isSelected && !isRight)
                                      cls = "border-wrong bg-wrong-soft text-wrong";
                                    else cls = "border-hairline bg-canvas text-muted";
                                  } else if (isSelected) {
                                    cls = "border-accent bg-accent-soft text-accent font-semibold";
                                  }

                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      disabled={isScored}
                                      onClick={() => selectAnswer(qi, opt)}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all text-left cursor-pointer disabled:cursor-default ${cls}`}
                                    >
                                      <span
                                        className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                        style={{ borderColor: "currentColor" }}
                                      >
                                        {isSelected && !isScored && (
                                          <span className="w-2 h-2 rounded-full bg-accent block" />
                                        )}
                                        {isScored && isRight && (
                                          <Check className="w-2.5 h-2.5 text-correct" />
                                        )}
                                        {isScored && isSelected && !isRight && (
                                          <X className="w-2.5 h-2.5 text-wrong" />
                                        )}
                                      </span>
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                          {/* Short answer / fill-in-blank */}
                          {(q.type === "short-answer" || q.type === "fill-in-the-blank") && (
                            <div className="ml-9">
                              <input
                                type="text"
                                value={userAns ?? ""}
                                onChange={(e) => selectAnswer(qi, e.target.value)}
                                disabled={isScored}
                                placeholder={
                                  q.type === "fill-in-the-blank"
                                    ? "Fill in the blank..."
                                    : "Your answer..."
                                }
                                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all disabled:opacity-70 ${
                                  isScored
                                    ? isCorrect
                                      ? "border-correct bg-correct-soft text-correct"
                                      : "border-wrong bg-wrong-soft text-wrong"
                                    : "border-hairline bg-canvas text-ink"
                                }`}
                              />
                              {isScored && !isCorrect && (
                                <p className="mt-2 text-xs text-correct flex items-center gap-1.5">
                                  <CheckMark size={14} />
                                  Correct answer: <strong>{ak.answer}</strong>
                                </p>
                              )}
                            </div>
                          )}

                          {/* Explanation */}
                          {isScored && (
                            <p className="mt-3 ml-9 text-xs text-muted italic">
                              {ak.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {/* Check answers button */}
                    {quiz.phase === "answering" && (
                      <button
                        onClick={checkAnswers}
                        disabled={!allAnswered}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
                      >
                        <Check className="h-4 w-4" />
                        Check my answers
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
