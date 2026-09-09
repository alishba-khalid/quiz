import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, ArrowRight, BookOpen, Clock, Brain, Sparkles, FileText, Printer } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import QuizGeneratorForm from "@/components/QuizGeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { getGeneratorProps } from "@/lib/generator-props";
import { FREE_TOPIC_LIMIT, FREE_SOURCE_LIMIT } from "@/lib/constants";

const faqs = [
  {
    q: "Does it work without captions or subtitles?",
    a: "QuizKraft extracts closed captions and auto-generated transcripts directly from the video to build accurate, concept-aligned questions. Videos must have captions (either creator-uploaded or YouTube auto-captions) enabled. If your video lacks captions, you can paste the lecture notes or transcript text directly into the 'Notes / PDF' tab.",
  },
  {
    q: "What are the video length limits?",
    a: "You can generate quizzes from YouTube videos up to approximately 30 minutes in length (up to 30,000 transcript characters). For longer multi-hour lectures or webinars, we recommend pasting the transcript of the specific chapter or topic you want to master.",
  },
  {
    q: "Is QuizKraft's YouTube to Quiz tool free?",
    a: `Yes! You can try the tool immediately without signing up. Free accounts receive ${FREE_TOPIC_LIMIT} free generations each month, including ${FREE_SOURCE_LIMIT} free YouTube/source material generations. Pro subscribers get unlimited generations and watermark-free PDF exports.`,
  },
  {
    q: "Can I edit and customize the generated questions?",
    a: "Yes. You can select your preferred question formats (Multiple Choice, True/False, Short Answer, Fill-in-the-Blank), choose difficulty levels from Easy to Hard, customize question counts from 3 to 15, and switch between interactive Quiz Mode and printable Worksheet layouts.",
  },
  {
    q: "What languages and video subjects are supported?",
    a: "QuizKraft supports any educational topic on YouTube — including STEM subjects, humanities, history, coding tutorials, language learning, and medical lectures. While English captions produce the most robust assessments, videos with multi-language captions can also be processed.",
  },
  {
    q: "Can I export the quiz or print it as a worksheet?",
    a: "Yes! Every generated assessment can be printed directly from your browser or downloaded as a clean PDF formatted with student header lines and an optional comprehensive answer key with explanations.",
  },
];

const steps = [
  {
    n: "01",
    title: "Paste YouTube link",
    desc: "Copy the URL of any educational YouTube video, lecture, or tutorial and paste it into the tool.",
  },
  {
    n: "02",
    title: "AI extracts transcript",
    desc: "QuizKraft pulls the video transcript, identifies key arguments, formulas, definitions, and concepts.",
  },
  {
    n: "03",
    title: "Practice with the loop",
    desc: "Take the quiz in interactive study mode. Missed questions return until you've achieved complete mastery.",
  },
];

export const metadata: Metadata = {
  title: "YouTube Video to Quiz — Free AI Quiz Generator | QuizKraft",
  description:
    "Turn any YouTube video into an interactive quiz in seconds. Generate practice questions with answer keys from video transcripts. Free — no signup required.",
  alternates: { canonical: "https://www.quizkraft.tech/youtube-to-quiz" },
  keywords: [
    "youtube video to quiz",
    "turn youtube into quiz",
    "youtube transcript quiz generator",
    "ai quiz maker from youtube",
    "video lecture quiz maker",
    "youtube to test converter",
    "convert youtube to worksheet",
    "active recall youtube study tool",
  ],
  openGraph: {
    title: "YouTube Video to Quiz — Free AI Quiz Generator | QuizKraft",
    description:
      "Turn any YouTube video or lecture into an interactive quiz in seconds. Instant answer keys and active recall study loop.",
    type: "website",
    url: "https://www.quizkraft.tech/youtube-to-quiz",
    siteName: "QuizKraft",
    images: ["/youtube-to-quiz/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video to Quiz — Free AI Generator | QuizKraft",
    description: "Convert YouTube video lectures into interactive quizzes and printable worksheets with AI.",
    images: ["/youtube-to-quiz/opengraph-image"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizKraft — YouTube Video to Quiz Generator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://www.quizkraft.tech/youtube-to-quiz",
  description:
    "Free AI-powered tool that converts YouTube video transcripts into interactive practice quizzes and printable worksheets in seconds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "YouTube to Quiz", item: "https://www.quizkraft.tech/youtube-to-quiz" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function YouTubeToQuizPage() {
  const props = await getGeneratorProps();

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="bg-surface border-b border-hairline py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-red-600 mb-5">
            <YoutubeIcon className="h-4 w-4" />
            YouTube Video to Quiz Converter
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink leading-[1.15] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Turn Any YouTube Video Into a Quiz
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
            Paste any lecture, tutorial, or educational video link. QuizKraft extracts the transcript
            and builds a customized active recall quiz in 10 seconds — complete with instant scoring,
            answer keys, and retake loops.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm text-muted">
            {["Works without signup", "Extracts video transcript", "Active recall study loop", "Printable worksheet + key"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 font-medium">
                <Check className="h-4 w-4 text-correct" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Generator Tool */}
      <QuizGeneratorForm {...props} initialMode="youtube" />

      {/* How it works (3 steps) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl font-medium text-ink tracking-[-0.02em] mb-3"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              How it works
            </h2>
            <p className="text-sm text-muted">
              From video URL to full interactive assessment in three simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="bg-canvas border border-hairline rounded-2xl p-6 relative">
                <div
                  className="text-4xl font-medium text-accent/30 mb-3 select-none"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.n}
                </div>
                <h3 className="font-semibold text-ink text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Active Recall Pedagogical Guide (~300 words of real advice) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-3.5 py-1 text-xs font-semibold text-accent mb-4">
            <Brain className="h-3.5 w-3.5" />
            Pedagogy & Cognitive Science
          </div>
          <h2
            className="text-2xl sm:text-3xl font-medium text-ink tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            How to study from video lectures using active recall
          </h2>

          <div className="prose prose-neutral text-muted text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Watching video lectures creates a powerful cognitive trap known as the{" "}
              <strong className="text-ink font-semibold">illusion of competence</strong>. When an engaging
              speaker explains a difficult topic step-by-step, the fluent presentation feels intuitive.
              However, cognitive psychology research consistently demonstrates that passive video watching
              yields rapid decay: students lose over 70% of new lecture content within 48 hours unless forced
              retrieval occurs.
            </p>

            <p>
              To transform YouTube from a passive entertainment channel into an accelerated learning tool,
              follow the <strong className="text-ink font-semibold">Chunk & Retrieve Routine</strong>:
            </p>

            <div className="bg-surface border border-hairline rounded-2xl p-5 my-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Watch in 10-to-15 Minute Segments</h4>
                  <p className="text-xs text-muted mt-0.5">Never binge an hour-long lecture in one sitting. Pause at natural chapter transitions when working memory is fresh.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Immediate Retrieval Before Re-Watching</h4>
                  <p className="text-xs text-muted mt-0.5">Paste the video URL into QuizKraft immediately upon pausing. Answering 5–8 targeted questions forces your synapses to reconstruct concepts rather than merely recognizing familiar phrasing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Target the Missed Question Loop</h4>
                  <p className="text-xs text-muted mt-0.5">Use Quiz Mode to isolate incorrect answers. When an answer is wrong, review the attached explanation before retaking, cementing long-term neural pathways.</p>
                </div>
              </div>
            </div>

            <p>
              This simple switch — replacing passive note-taking with immediate active questioning — turns every
              minute of video study into durable, exam-ready comprehension.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links to Blog Posts */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-6">
            Recommended Reading & Study Guides
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            <Link
              href="/blog/turn-any-pdf-into-practice-quiz"
              className="p-5 bg-canvas border border-hairline rounded-2xl hover:border-accent/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wide">How-To</span>
                <h4 className="text-sm font-semibold text-ink mt-1.5 group-hover:text-accent transition-colors">
                  Turn any source material into a practice quiz in 60 seconds
                </h4>
                <p className="text-xs text-muted mt-2 line-clamp-2">
                  Convert textbook chapters, slides, and notes into active recall practice quizzes.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mt-4">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>

            <Link
              href="/blog/how-to-write-quiz-questions"
              className="p-5 bg-canvas border border-hairline rounded-2xl hover:border-accent/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wide">Pedagogy</span>
                <h4 className="text-sm font-semibold text-ink mt-1.5 group-hover:text-accent transition-colors">
                  How to write quiz questions that test understanding, not memory
                </h4>
                <p className="text-xs text-muted mt-2 line-clamp-2">
                  Principles for writing diagnostic questions that evaluate deep comprehension.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mt-4">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>

            <Link
              href="/blog/best-question-types-assessing-understanding"
              className="p-5 bg-canvas border border-hairline rounded-2xl hover:border-accent/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wide">Assessment</span>
                <h4 className="text-sm font-semibold text-ink mt-1.5 group-hover:text-accent transition-colors">
                  The best question types for assessing student understanding
                </h4>
                <p className="text-xs text-muted mt-2 line-clamp-2">
                  Match learning objectives to multiple-choice, short-answer, and fill-in formats.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mt-4">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Tools Block */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6">
          <p className="text-sm font-semibold text-ink">Explore more QuizKraft tools:</p>
          {[
            { href: "/pdf-to-quiz", label: "PDF to Quiz" },
            { href: "/generator", label: "AI Worksheet Studio" },
            { href: "/quiz-generator", label: "Quiz Generator" },
            { href: "/worksheet-generator", label: "Worksheet Generator" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-accent hover:text-accent-dark font-medium flex items-center gap-1 transition-colors"
            >
              {l.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-medium text-ink tracking-[-0.02em] mb-10 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-hairline pb-6 last:border-0">
                <h3 className="font-semibold text-ink mb-2 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-canvas border-t border-hairline text-center">
        <h2
          className="text-3xl font-medium text-ink tracking-[-0.02em] mb-3"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Start turning video lectures into mastery.
        </h2>
        <p className="text-muted mb-6 text-sm max-w-md mx-auto">
          {FREE_TOPIC_LIMIT} free generations every month. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20 text-sm"
          >
            <Zap className="h-4 w-4" />
            Start free
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-surface transition-colors text-sm"
          >
            View Pro plan
          </Link>
        </div>
      </section>
    </div>
  );
}
