import type { Metadata } from "next";
import Link from "next/link";
import { Zap, BookOpen, Download, RefreshCw, Star, Upload, Check, ArrowRight, Youtube, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { FREE_TOPIC_LIMIT, FREE_SOURCE_LIMIT, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QuizKraft | Free AI Worksheet Generator & Quiz Maker for Teachers",
  description:
    "Generate clean, printable worksheets and quizzes for any subject and grade in seconds — complete with instant answer keys, PDF exports, and adaptive retake study loops. Free to try.",
  alternates: { canonical: "https://www.quizkraft.tech/" },
  keywords: [
    "AI worksheet generator",
    "free printable worksheet maker",
    "quiz maker for teachers",
    "AI quiz generator",
    "YouTube to quiz generator",
    "PDF to quiz generator",
    "multiple choice quiz maker",
    "printable quiz generator with answer key",
    "classroom assessment tool",
    "adaptive study loop quiz"
  ],
  openGraph: {
    title: "QuizKraft | Free AI Worksheet Generator & Quiz Maker for Teachers",
    description: "Generate clean, printable worksheets & quizzes in seconds with AI. Complete with answer keys.",
    type: "website",
    url: "https://www.quizkraft.tech/",
    siteName: "QuizKraft",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKraft | Free AI Worksheet Generator & Quiz Maker",
    description: "Printable worksheets and online quizzes built by AI in seconds. Free for teachers.",
    images: ["/opengraph-image"],
  },
};

function WorksheetPreview() {
  return (
    <div className="relative mx-auto max-w-lg">
      <div className="absolute inset-0 translate-y-3 translate-x-3 rounded-2xl bg-hairline" />
      <div className="relative bg-surface rounded-2xl border border-hairline shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-hairline bg-canvas flex items-center justify-between">
          <div>
            <p className="font-semibold text-ink text-sm">Fractions — Grade 5 Worksheet</p>
            <p className="text-xs text-muted mt-0.5">Multiple choice · 5 questions</p>
          </div>
          <span className="text-xs bg-accent-soft text-accent font-semibold px-2.5 py-1 rounded-full">
            Generated
          </span>
        </div>
        <div className="px-6 py-5 space-y-5">
          {[
            { n: 1, q: "What is ½ + ¼?", opts: ["¼", "¾", "½", "1"], correct: 1 },
            { n: 2, q: "Which fraction equals 2/4?", opts: ["1/2", "3/4", "2/3", "1/3"], correct: 0 },
          ].map((item) => (
            <div key={item.n}>
              <p className="text-sm font-medium text-ink mb-2.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold mr-2">
                  {item.n}
                </span>
                {item.q}
              </p>
              <div className="grid grid-cols-2 gap-1.5 ml-7">
                {item.opts.map((opt, j) => (
                  <div
                    key={j}
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
                      j === item.correct
                        ? "border-correct bg-correct-soft text-correct font-semibold"
                        : "border-hairline bg-canvas text-muted"
                    }`}
                  >
                    <span className="font-medium w-4">{String.fromCharCode(65 + j)}.</span>
                    {opt}
                    {j === item.correct && (
                      <svg className="ml-auto" width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 13 Q8 16 10 19 Q14 10 21 5"
                          stroke="#2CB67D"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-hairline">
            <div className="h-1.5 flex-1 rounded-full bg-hairline overflow-hidden">
              <div className="h-full w-2/5 bg-accent rounded-full" />
            </div>
            <span className="text-xs text-muted">2 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Any subject, any grade",
    desc: "Math to history, kindergarten to college. Just type the topic or prompt.",
  },
  {
    icon: <Youtube className="h-5 w-5 text-red-500" />,
    title: "YouTube video to quiz",
    desc: "Paste any educational YouTube URL to extract the transcript and generate questions in seconds.",
    highlight: true,
  },
  {
    icon: <Upload className="h-5 w-5 text-blue-500" />,
    title: "Pasted notes & PDF support",
    desc: "Upload textbook chapters, articles, or lecture notes to quiz specific classroom content.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "The active recall study loop",
    desc: "In quiz mode, wrong answers come back for review until students master every question.",
    highlight: true,
  },
  {
    icon: <Check className="h-5 w-5" />,
    title: "Answer keys & explanations",
    desc: "Every worksheet includes verified answers and concise pedagogical explanations.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Print & PDF export",
    desc: "Clean, print-ready exam layout with student header lines and optional answer key sheets.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    per: "/month",
    features: [
      `${FREE_TOPIC_LIMIT} free generations every month`,
      `${FREE_SOURCE_LIMIT} free YouTube & notes/PDF generations`,
      "All question types & grade levels",
      "Answer keys with explanations",
      "Quiz mode + active recall loop",
      "Print layout with watermark",
    ],
    cta: "Get started free",
    ctaHref: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    per: "/month",
    badge: "Most popular",
    features: [
      "Unlimited worksheet & quiz generations",
      "Unlimited YouTube & PDF uploads",
      "Clean PDF exports with NO watermark",
      "Save quizzes to library & dashboard",
      "All question types & grade levels",
      "Priority AI processing speed",
    ],
    cta: "Start Pro",
    ctaHref: "/pricing",
    highlight: true,
  },
  {
    name: "School",
    price: "$19",
    per: "/teacher/mo",
    features: [
      "Everything in Pro",
      "Shared department team library",
      "Class & student management",
      "Multiple seats with centralized billing",
      "Priority dedicated support",
    ],
    cta: "Contact us",
    ctaHref: `mailto:${SUPPORT_EMAIL}`,
    highlight: false,
  },
];

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech",
  description: "AI-powered worksheet and quiz generator for teachers, tutors, and students. Generate any subject, any grade in seconds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free Plan" },
  featureList: ["AI quiz generation", "YouTube video to quiz", "PDF to quiz", "Worksheet creation", "Multiple question types", "Answer keys", "Quiz mode study loop", "PDF export"],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuizKraft",
  url: "https://www.quizkraft.tech",
  logo: "https://www.quizkraft.tech/apple-icon.png",
  description: "AI-powered worksheet and quiz generator for teachers, tutors, and students.",
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is there a free plan?", acceptedAnswer: { "@type": "Answer", text: `Yes! The free plan gives you ${FREE_TOPIC_LIMIT} free generations every month (including ${FREE_SOURCE_LIMIT} YouTube/source material generations) — no credit card required. Usage resets every 30 days.` } },
    { "@type": "Question", name: "Can I generate quizzes from YouTube videos?", acceptedAnswer: { "@type": "Answer", text: "Yes! Paste any YouTube video link into the generator. QuizKraft extracts the transcript and creates targeted questions directly from the video content." } },
    { "@type": "Question", name: "What subjects and grades does QuizKraft cover?", acceptedAnswer: { "@type": "Answer", text: "Any subject, any grade. Math, science, history, literature, languages — from kindergarten through college. Just type the topic and select the grade." } },
    { "@type": "Question", name: "Can I use my own notes or PDF documents?", acceptedAnswer: { "@type": "Answer", text: "Yes! Paste text from your notes, textbook, or study guide into the generator to produce quizzes based on your specific curriculum." } },
    { "@type": "Question", name: "Can students take quizzes online?", acceptedAnswer: { "@type": "Answer", text: "Yes. In quiz mode, students click through questions, get scored instantly, and wrong answers come back for review until they get them right." } },
    { "@type": "Question", name: "Can I print or export worksheets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every worksheet has a clean print layout. Free users can print with a QuizKraft watermark. Pro users get clean PDF export with no watermark." } },
  ],
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={homeFaqSchema} />

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-canvas opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, #E7E5DC 27px, #E7E5DC 28px)",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent mb-7">
                <Zap className="h-3.5 w-3.5" />
                AI-built in seconds
              </div>
              <h1
                className="text-5xl sm:text-6xl font-medium text-ink leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Worksheets worth{" "}
                <span className="relative inline-block">
                  handing out.
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="12"
                    viewBox="0 0 280 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8 Q70 3 140 7 Q210 11 278 5"
                      stroke="#3DA9FC"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                      className="animate-draw delay-300"
                    />
                  </svg>
                </span>
              </h1>
              <h2 className="text-base font-semibold text-muted mb-5">
                AI Worksheet &amp; Quiz Generator for Any Subject &amp; Grade
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
                Generate clean, printable worksheets and interactive quizzes from topics, YouTube videos,
                or your own notes — complete with an adaptive retake study loop.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link
                  href="/generator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
                >
                  <Zap className="h-4 w-4" />
                  Generate free worksheet
                </Link>
                <Link
                  href="/youtube-to-quiz"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-hairline/60 transition-colors text-sm"
                >
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube to Quiz
                </Link>
              </div>
              <p className="text-xs text-muted">5 free generations every month. No credit card required.</p>
            </div>
            <div className="animate-fade-up delay-200">
              <WorksheetPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-hairline bg-surface py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <span className="font-medium text-ink">Built for educators and independent learners:</span>
          {["10-second generation", "YouTube video to quiz", "Notes & PDF input", "Active recall loop", "Print-ready"].map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 bg-canvas border border-hairline rounded-full px-3 py-1 text-xs font-medium text-ink">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Everything you need to assess —<br className="hidden sm:block" /> nothing you don&apos;t.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl p-6 border ${
                  f.highlight
                    ? "border-accent/30 bg-accent-soft"
                    : "border-hairline bg-surface"
                }`}
              >
                {f.highlight && (
                  <span className="inline-block text-xs font-semibold text-accent bg-accent/10 rounded-full px-2.5 py-0.5 mb-3">
                    Featured Tool
                  </span>
                )}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                    f.highlight ? "bg-accent text-white" : "bg-canvas text-ink border border-hairline"
                  }`}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Three steps to a finished assessment.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Choose input", desc: "Select a topic, paste lecture notes, or enter a YouTube video URL." },
              { n: "02", title: "Generate with AI", desc: "QuizKraft writes rigorous, conceptual questions and answers in 10 seconds." },
              { n: "03", title: "Practice & master", desc: "Print clean handouts or use the interactive study loop until all questions are mastered." },
            ].map((step) => (
              <div key={step.n}>
                <div
                  className="text-6xl font-medium text-hairline mb-4 leading-none select-none"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {step.n}
                </div>
                <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study loop spotlight */}
      <section className="bg-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl font-medium text-white leading-tight mb-5 tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Most tools stop at the worksheet. QuizKraft keeps going.
            </h2>
            <p className="text-white/60 leading-relaxed text-sm">
              A one-off quiz doesn&apos;t help anyone learn. In quiz mode, QuizKraft scores each attempt,
              flags every wrong answer, and brings just those questions back — so students practice
              what they actually got wrong, not what they already know.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 mt-8 px-5 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-colors"
            >
              Try quiz mode free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Attempt 1</p>
              <p className="text-sm text-white mb-3">What is the powerhouse of the cell?</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-wrong/20 border border-wrong/30 rounded-lg px-3 py-2 text-sm text-white/70 flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4 L20 20 M20 4 L4 20" stroke="#EF4565" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  The nucleus
                </div>
                <span className="text-white/40 text-xs flex-shrink-0">comes back</span>
              </div>
            </div>
            <div className="flex justify-center py-1">
              <span className="text-white/30 text-xs">↓ returns for review</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Attempt 2</p>
              <p className="text-sm text-white mb-3">What is the powerhouse of the cell?</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-correct/20 border border-correct/30 rounded-lg px-3 py-2 text-sm text-white/70 flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M3 13 Q8 16 10 19 Q14 10 21 5" stroke="#2CB67D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  The mitochondria
                </div>
                <span className="text-correct text-xs flex-shrink-0">Learned ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factual Value Proposition Section (Replaced fabricated testimonials) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em] mb-4"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Why educators and students choose QuizKraft.
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Built specifically to eliminate assessment prep time while enhancing active recall.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-canvas rounded-2xl border border-hairline p-6">
              <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">Conceptual Question Quality</h3>
              <p className="text-sm text-muted leading-relaxed">
                Rather than simple rote-memorization trivia, QuizKraft generates questions that challenge students to apply principles, explain mechanisms, and avoid common misconceptions.
              </p>
            </div>

            <div className="bg-canvas rounded-2xl border border-hairline p-6">
              <div className="w-10 h-10 rounded-xl bg-correct-soft text-correct flex items-center justify-center mb-4">
                <Youtube className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">Multimodal Source Inputs</h3>
              <p className="text-sm text-muted leading-relaxed">
                Generate tailored assessments from general subject topics, pasted textbook chapters, raw study guides, or direct YouTube video lecture links in seconds.
              </p>
            </div>

            <div className="bg-canvas rounded-2xl border border-hairline p-6">
              <div className="w-10 h-10 rounded-xl bg-warm/20 text-warm flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">Durable Active Recall</h3>
              <p className="text-sm text-muted leading-relaxed">
                The interactive study loop automatically isolates missed questions, providing instant grading and rationale explanations until every concept is mastered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Simple, honest pricing.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 flex flex-col justify-between ${
                  t.highlight ? "bg-accent border-accent text-white" : "bg-surface border-hairline"
                }`}
              >
                <div>
                  {t.badge && (
                    <span className="inline-block text-xs font-semibold bg-white/20 text-white rounded-full px-2.5 py-0.5 mb-3">
                      {t.badge}
                    </span>
                  )}
                  <h3 className={`text-lg font-semibold mb-1 ${t.highlight ? "text-white" : "text-ink"}`}>
                    {t.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className={`text-3xl font-bold ${t.highlight ? "text-white" : "text-ink"}`}>{t.price}</span>
                    <span className={`text-sm ${t.highlight ? "text-white/60" : "text-muted"}`}>{t.per}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${t.highlight ? "text-white/90" : "text-muted"}`}>
                        <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${t.highlight ? "text-white" : "text-correct"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={t.ctaHref}
                  className={`block text-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                    t.highlight
                      ? "bg-white text-accent hover:bg-accent-soft"
                      : "bg-canvas border border-hairline text-ink hover:bg-hairline/60"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              See full pricing details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Common questions.
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl font-medium text-ink leading-tight mb-6 tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Get your Sunday evening back.
          </h2>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
          >
            Start free
          </Link>
          <p className="mt-4 text-sm text-muted">{FREE_TOPIC_LIMIT} free generations every month, no card required.</p>
        </div>
      </section>
    </div>
  );
}
