import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts as posts } from "@/lib/blog-posts";

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.quizkraft.tech/blog" },
  ],
};

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
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
