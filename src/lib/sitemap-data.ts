import { quizSubjects, worksheetSubjects } from "@/lib/subjects";
import { blogPosts } from "@/lib/blog-posts";

export const SITE_URL = "https://www.quizkraft.tech";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
}

/**
 * The site is split into one sitemap per section so Search Console reports
 * indexing separately for each template. Each file is listed in the index at
 * /sitemap.xml. Add a new group here to add a new sitemap.
 */
export const SITEMAP_GROUPS = [
  "pages",
  "blog",
  "quiz-subjects",
  "worksheet-subjects",
] as const;

export type SitemapGroup = (typeof SITEMAP_GROUPS)[number];

// Real content-update dates, bumped by hand when page content changes.
// Using new Date() would stamp every URL as modified on every build.
const CONTENT_UPDATED = new Date("2026-10-05");
const LEGAL_UPDATED = new Date("2026-01-01");

const STATIC_PATHS: { path: string; lastModified: Date }[] = [
  { path: "", lastModified: CONTENT_UPDATED },
  { path: "/youtube-to-quiz", lastModified: CONTENT_UPDATED },
  { path: "/pdf-to-quiz", lastModified: CONTENT_UPDATED },
  { path: "/generator", lastModified: CONTENT_UPDATED },
  { path: "/quiz-generator", lastModified: CONTENT_UPDATED },
  { path: "/worksheet-generator", lastModified: CONTENT_UPDATED },
  { path: "/quiz-maker-for-teachers", lastModified: CONTENT_UPDATED },
  { path: "/pricing", lastModified: CONTENT_UPDATED },
  { path: "/features", lastModified: CONTENT_UPDATED },
  { path: "/how-it-works", lastModified: CONTENT_UPDATED },
  { path: "/faq", lastModified: CONTENT_UPDATED },
  { path: "/about", lastModified: CONTENT_UPDATED },
  { path: "/contact", lastModified: CONTENT_UPDATED },
  { path: "/blog", lastModified: CONTENT_UPDATED },
  { path: "/terms", lastModified: LEGAL_UPDATED },
  { path: "/privacy", lastModified: LEGAL_UPDATED },
];

export function getSitemapEntries(group: SitemapGroup): SitemapEntry[] {
  switch (group) {
    case "pages":
      return STATIC_PATHS.map((p) => ({
        url: `${SITE_URL}${p.path}`,
        lastModified: p.lastModified,
      }));
    case "blog":
      return blogPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
      }));
    case "quiz-subjects":
      return quizSubjects.map((s) => ({
        url: `${SITE_URL}/quiz-generator/${s.slug}`,
        lastModified: CONTENT_UPDATED,
      }));
    case "worksheet-subjects":
      return worksheetSubjects.map((s) => ({
        url: `${SITE_URL}/worksheet-generator/${s.slug}`,
        lastModified: CONTENT_UPDATED,
      }));
  }
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function newestDate(entries: SitemapEntry[]): Date {
  return entries.reduce(
    (latest, e) => (e.lastModified > latest ? e.lastModified : latest),
    entries[0]?.lastModified ?? CONTENT_UPDATED
  );
}
