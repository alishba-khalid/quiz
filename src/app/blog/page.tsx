import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | QuizKraft",
  description:
    "Teaching tips, AI education guides, and how-tos for teachers who want to save time and help students learn better.",
  alternates: { canonical: "https://www.quizkraft.tech/blog" },
  openGraph: {
    title: "Blog | QuizKraft",
    description: "Teaching tips and AI education guides from the QuizKraft team.",
    type: "website",
  },
};

const posts = [
  {
    slug: "how-to-write-quiz-questions",
    title: "How to write quiz questions that test understanding, not memory",
    excerpt:
      "Most quiz questions test whether students memorized the textbook. Here's how to write questions that reveal whether they actually understand the material.",
    category: "Teaching",
    readTime: "6 min read",
    date: "June 2026",
  },
  {
    slug: "10-ways-teachers-saving-hours-ai",
    title: "10 ways teachers are saving hours with AI",
    excerpt:
      "From lesson planning to worksheet generation, AI is quietly eliminating the Sunday-evening prep grind for thousands of teachers. Here's how.",
    category: "AI in Education",
    readTime: "8 min read",
    date: "June 2026",
  },
  {
    slug: "turn-any-pdf-into-practice-quiz",
    title: "Turn any source material into a practice quiz in 60 seconds",
    excerpt:
      "Your textbook chapters, lecture slides, and notes are all latent quiz material. Here's how to convert them into active recall practice in under a minute.",
    category: "How-To",
    readTime: "4 min read",
    date: "May 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <div className="border-b border-hairline bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1
            className="text-4xl font-medium text-ink tracking-[-0.02em] mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            The QuizKraft Blog
          </h1>
          <p className="text-muted">
            Teaching tips, AI guides, and ideas for saving time in the classroom.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface rounded-2xl border border-hairline p-6 hover:border-accent/30 hover:shadow-sm transition-all flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-accent bg-accent-soft rounded-full px-2.5 py-1">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-semibold text-ink text-base leading-snug mb-3 group-hover:text-accent transition-colors flex-1">
                {post.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted mt-auto pt-4 border-t border-hairline">
                <span>{post.date}</span>
                <span className="flex items-center gap-1 text-accent font-medium">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
