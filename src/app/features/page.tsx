import type { Metadata } from "next";
import Link from "next/link";
import { Zap, BookOpen, Star, RefreshCw, Check, Download, Upload, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Features | QuizKraft",
  description:
    "Explore QuizKraft's key features: generate high-quality quizzes and worksheets for any subject, paste source material, customize difficulty, and use the smart retake loop.",
  alternates: { canonical: "https://www.quizkraft.tech/features" },
  openGraph: {
    title: "Features | QuizKraft",
    description: "AI-built worksheets and quizzes with smart learning loops. Explore all features.",
    type: "website",
  },
};

const featuresList = [
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: "Any Subject, Any Grade",
    desc: "From Grade 1 fractions to college-level biochemistry. Our AI adapts vocabulary, tone, and cognitive complexity to match your specific group of students. Just input your topic and target grade.",
  },
  {
    icon: <Star className="h-6 w-6 text-accent" />,
    title: "5+ Question Formats",
    desc: "Mix multiple-choice, true/false, fill-in-the-blank, matching, and short answer questions in a single assessment. Keep students engaged and test multiple levels of understanding.",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-white" />,
    title: "Smart Retake Study Loop",
    desc: "Don't just assess—help them learn. In online quiz mode, QuizKraft highlights incorrect answers and prompts students to try only those questions again, focusing practice on what they don't know.",
    highlight: true,
  },
  {
    icon: <Check className="h-6 w-6 text-accent" />,
    title: "Instant Answer Keys & Explanations",
    desc: "Every worksheet automatically generates a comprehensive teacher answer key and student-friendly explanations, saving hours of reference checking and explanation writing.",
  },
  {
    icon: <Download className="h-6 w-6 text-accent" />,
    title: "Watermark-Free PDF Export",
    desc: "Print clean, exam-ready documents or export them to high-resolution PDFs. Perfect for handing out physical worksheets or uploading to your learning management system (LMS).",
  },
  {
    icon: <Upload className="h-6 w-6 text-accent" />,
    title: "Generate from Custom Material",
    desc: "Paste lesson notes, textbook chapters, or articles directly. The generator will construct questions strictly based on your source material, ensuring alignment with your specific curriculum.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Features", item: "https://www.quizkraft.tech/features" },
  ],
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      
      {/* Header */}
      <section className="border-b border-hairline bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Features built for modern educators.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to create, differentiate, and deliver high-quality worksheets and assessments in seconds.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl p-8 border transition-all hover:shadow-sm ${
                f.highlight
                  ? "border-accent/30 bg-accent-soft"
                  : "border-hairline bg-surface"
              }`}
            >
              {f.highlight && (
                <span className="inline-block text-xs font-semibold text-accent bg-accent/10 rounded-full px-2.5 py-0.5 mb-4">
                  QuizKraft Exclusive
                </span>
              )}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  f.highlight ? "bg-accent border border-accent" : "bg-canvas border border-hairline"
                }`}
              >
                {f.icon}
              </div>
              <h2 className="text-lg font-semibold text-ink mb-3">{f.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Focus: Differentiating assessments */}
      <section className="bg-surface border-t border-b border-hairline py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl font-medium text-ink leading-tight mb-5 tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tailored assessments, no extra planning required.
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Teaching a classroom with diverse learning needs? Differentiating worksheets used to mean spending hours rewriting questions. With QuizKraft, you can generate standard, simplified, and advanced versions of the same topic in seconds.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Adjust difficulty levels, scaffold steps for complex math problems, or upload a specific reading passage and let the AI generate reading comprehension worksheets optimized for your target grade.
            </p>
          </div>
          <div className="bg-canvas border border-hairline rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-ink">Assessment Differentiation Options</h3>
            <div className="space-y-3">
              {[
                { title: "Standard Level", desc: "Aligned directly with core grade-level curriculum benchmarks." },
                { title: "Scaffolded (Assisted)", desc: "Includes simplified wording, hints, and structured step-by-step guidance." },
                { title: "Enriched (Advanced)", desc: "Pushes depth of knowledge with reasoning-based and multi-step questions." },
              ].map((lvl, index) => (
                <div key={index} className="flex gap-3 items-start border border-hairline rounded-xl p-3 bg-surface">
                  <div className="w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{lvl.title}</h4>
                    <p className="text-xs text-muted mt-0.5">{lvl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-medium text-ink leading-tight mb-6 tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Save preparation time today.
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link
            href="/generator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-sm text-sm"
          >
            <Zap className="h-4 w-4" />
            Generate free worksheet
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-hairline text-ink font-semibold rounded-xl hover:bg-hairline/60 transition-colors text-sm"
          >
            View pricing
          </Link>
        </div>
        <p className="text-xs text-muted">No credit card required. Free plan includes 1 worksheet generation.</p>
      </section>
    </div>
  );
}
