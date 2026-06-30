import type { Metadata } from "next";
import Link from "next/link";
import { Zap, BookOpen, Download, RefreshCw, Star, Upload, Check, ArrowRight } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
  description:
    "Generate clean, printable worksheets and quizzes for any subject and grade — then let students practice with a built-in retake loop that brings wrong answers back. Free to start.",
  alternates: { canonical: "https://www.quizkraft.tech" },
  openGraph: {
    title: "QuizKraft | AI Worksheet & Quiz Generator",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds.",
    type: "website",
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
    desc: "Math to history, kindergarten to college. Just type the topic.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "5+ question types",
    desc: "Multiple choice, true/false, short answer, fill-in-the-blank, and more — mixed in one sheet.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "The study loop",
    desc: "In quiz mode, wrong answers come back for review until they're learned.",
    highlight: true,
  },
  {
    icon: <Check className="h-5 w-5" />,
    title: "Answer keys & explanations",
    desc: "Every worksheet comes with answers and short explanations, one click away.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Print & export",
    desc: "Clean, exam-style print layout. Export to PDF, no watermark on Pro.",
  },
  {
    icon: <Upload className="h-5 w-5" />,
    title: "Use your own material",
    desc: "Paste notes or a chapter and generate questions straight from your own source material.",
  },
];

const testimonials = [
  {
    quote:
      "This tool saves me at least two hours every Sunday. The questions are actually good — not the generic fluff I expected from AI.",
    name: "Sarah M.",
    role: "5th Grade Teacher",
  },
  {
    quote:
      "My tutoring students use the quiz loop to drill weak spots. They're getting through material twice as fast.",
    name: "James T.",
    role: "Private Tutor",
  },
  {
    quote:
      "I homeschool three kids at different grade levels. QuizKraft cuts my prep time from hours to minutes.",
    name: "Maria K.",
    role: "Homeschool Parent",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    per: "/month",
    features: ["1 free worksheet", "All question types", "Answer keys", "Quiz mode + study loop", "Print"],
    cta: "Get started",
    ctaHref: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    per: "/month",
    badge: "Most popular",
    features: ["Unlimited worksheets", "PDF export, no watermark", "Paste source material", "Priority generation"],
    cta: "Start Pro",
    ctaHref: "/pricing",
    highlight: true,
  },
  {
    name: "School",
    price: "$19",
    per: "/teacher/mo",
    features: ["Everything in Pro", "Shared team library", "Class management", "Multiple seats", "Priority support"],
    cta: "Contact us",
    ctaHref: "mailto:hello@quizkraft.app",
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
  featureList: ["AI quiz generation", "Worksheet creation", "Multiple question types", "Answer keys", "Quiz mode study loop", "PDF export"],
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is there a free plan?", acceptedAnswer: { "@type": "Answer", text: "Yes. The free plan gives you 1 worksheet to try — no credit card required. All question types, answer keys, quiz mode, and the study loop are included. Upgrade to Pro for unlimited generation." } },
    { "@type": "Question", name: "What subjects and grades does QuizKraft cover?", acceptedAnswer: { "@type": "Answer", text: "Any subject, any grade. Math, science, history, literature, languages — from kindergarten through college. Just type the topic and select the grade." } },
    { "@type": "Question", name: "Can I use my own material to generate questions?", acceptedAnswer: { "@type": "Answer", text: "Yes, on Pro. Paste in text from your notes, textbook, or any source, and QuizKraft generates questions directly from that material." } },
    { "@type": "Question", name: "Can students take quizzes online?", acceptedAnswer: { "@type": "Answer", text: "Yes. In quiz mode, students click through questions, get scored instantly, and wrong answers come back for review until they get them right." } },
    { "@type": "Question", name: "Can I print or export worksheets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every worksheet has a clean print layout. Free users can print with a QuizKraft watermark. Pro users get clean PDF export with no watermark." } },
    { "@type": "Question", name: "Do you offer school or team plans?", acceptedAnswer: { "@type": "Answer", text: "Yes — the School plan is $19/month per teacher and includes shared team libraries, class management, and centralized billing." } },
  ],
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
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
              <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
                Generate clean, printable worksheets and quizzes for any subject and grade — then let
                students practice with a built-in retake loop that brings wrong answers back.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link
                  href="/generator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
                >
                  <Zap className="h-4 w-4" />
                  Generate free worksheet
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-hairline/60 transition-colors text-sm"
                >
                  See how it works
                </a>
              </div>
              <p className="text-xs text-muted">1 free worksheet. No card required.</p>
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
          <span className="font-medium text-ink">Trusted by teachers and tutors</span>
          {["10-second generation", "5+ question formats", "Every grade, K–12 to college", "Print-ready"].map((s) => (
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
              Everything you need to assess —<br className="hidden sm:block" /> nothing you don't.
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
                    Differentiator
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
              Three steps to a finished worksheet.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Set it up", desc: "Choose subject, grade, topic, question types, and difficulty." },
              { n: "02", title: "Generate", desc: "QuizKraft writes thoughtful, conceptual questions in about ten seconds." },
              { n: "03", title: "Use it", desc: "Print it, share it, or send students into quiz mode to practice." },
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
              A one-off quiz doesn't help anyone learn. In quiz mode, QuizKraft scores each attempt,
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

      {/* Use cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Built for the way you teach.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                who: "For teachers",
                desc: "Fast exit tickets, homework sheets, chapter tests, and sub plans — without spending Sunday evening on them.",
                cls: "bg-accent-soft border-accent/20",
                title: "text-accent",
              },
              {
                who: "For tutors & parents",
                desc: "Targeted practice for one student's weak spots. Upload their notes and generate a quiz from exactly what they're studying.",
                cls: "bg-correct-soft border-correct/20",
                title: "text-correct",
              },
              {
                who: "For students",
                desc: "Turn notes or a PDF into a self-quiz and let the study loop drill you on what you don't know yet.",
                cls: "bg-warm/10 border-warm/20",
                title: "text-warm",
              },
            ].map((c) => (
              <div key={c.who} className={`rounded-2xl border p-6 ${c.cls}`}>
                <h3 className={`font-semibold mb-2 ${c.title}`}>{c.who}</h3>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-medium text-ink tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Loved by people who hate making quizzes.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-canvas rounded-2xl border border-hairline p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warm text-warm" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4 italic">"{t.quote}"</p>
                <p className="font-semibold text-ink text-sm">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            ))}
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
                className={`rounded-2xl border p-6 ${
                  t.highlight ? "bg-accent border-accent" : "bg-surface border-hairline"
                }`}
              >
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
          <p className="mt-4 text-sm text-muted">1 free worksheet, no card required.</p>
        </div>
      </section>
    </div>
  );
}
