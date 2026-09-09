import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found | QuizKraft" };
  const ogImage = post.thumbnail ? `https://www.quizkraft.tech${post.thumbnail}` : "https://www.quizkraft.tech/og-image.png";
  return {
    title: `${post.title} | QuizKraft Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://www.quizkraft.tech/blog/${slug}` },
    keywords: [
      post.category,
      "AI worksheet generator",
      "teacher guides",
      "classroom tools",
      "educational assessment"
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.quizkraft.tech/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.endsWith(")")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const [_, label, href] = match;
        const isInternal = href.startsWith("/");
        if (isInternal) {
          return (
            <Link key={i} href={href} className="text-accent hover:underline font-medium">
              {label}
            </Link>
          );
        } else {
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
              {label}
            </a>
          );
        }
      }
    }
    return part;
  });
}

function renderBody(body: string) {
  return body.split("\n\n").map((para, i) => {
    // Standalone bold heading: entire paragraph is **...**
    if (para.startsWith("**") && para.endsWith("**") && !para.includes("](")) {
      return (
        <h3 key={i} className="font-semibold text-ink mt-8 mb-2 text-lg">
          {para.replace(/\*\*/g, "")}
        </h3>
      );
    }

    // Bullet list block: all lines start with "- "
    const lines = para.split("\n");
    if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i} className="list-disc pl-5 space-y-1.5 mb-5 text-base text-muted">
          {lines.map((l, j) => (
            <li key={j}>{parseInline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }

    // Normal paragraph
    return (
      <p key={i} className="text-base text-muted leading-relaxed mb-5">
        {parseInline(para)}
      </p>
    );
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post!.title,
    description: post!.excerpt,
    image: post!.thumbnail ? `https://www.quizkraft.tech${post!.thumbnail}` : undefined,
    datePublished: post!.publishedAt,
    dateModified: post!.updatedAt ?? post!.publishedAt,
    author: { "@type": "Organization", name: "QuizKraft", url: "https://www.quizkraft.tech" },
    publisher: {
      "@type": "Organization",
      name: "QuizKraft",
      url: "https://www.quizkraft.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quizkraft.tech/apple-icon.png"
      }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.quizkraft.tech/blog/${slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.quizkraft.tech/blog" },
      { "@type": "ListItem", position: 3, name: post!.title, item: `https://www.quizkraft.tech/blog/${slug}` },
    ],
  };

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-semibold text-accent bg-accent-soft rounded-full px-2.5 py-1">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
          <span className="text-xs text-muted">{post.date}</span>
        </div>

        <h1
          className="text-4xl font-medium text-ink leading-tight tracking-[-0.02em] mb-8"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          {post.title}
        </h1>

        {post.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-hairline bg-hairline/20 mb-10 shadow-sm">
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="max-w-[70ch]">{renderBody(post.body)}</div>

        <div className="mt-14 pt-8 border-t border-hairline">
          <p className="text-sm text-muted mb-4">Ready to save time on your next worksheet?</p>
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-colors"
          >
            Generate free worksheet
          </Link>
        </div>
      </div>
    </div>
  );
}
