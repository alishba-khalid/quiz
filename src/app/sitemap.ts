import { MetadataRoute } from "next";
import { quizSubjects, worksheetSubjects } from "@/lib/subjects";
import { blogPosts } from "@/lib/blog-posts";

const BASE = "https://www.quizkraft.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,          lastModified: new Date("2026-06-30"), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/generator`, lastModified: new Date("2026-06-30"), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/quiz-generator`, lastModified: new Date("2026-06-30"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/worksheet-generator`, lastModified: new Date("2026-06-30"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/quiz-maker-for-teachers`, lastModified: new Date("2026-06-30"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pdf-to-quiz`, lastModified: new Date("2026-06-30"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing`,   lastModified: new Date("2026-06-30"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,      lastModified: new Date("2026-06-30"), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/terms`,     lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacy`,   lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const quizRoutes: MetadataRoute.Sitemap = quizSubjects.map((s) => ({
    url: `${BASE}/quiz-generator/${s.slug}`,
    lastModified: new Date("2026-06-30"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const worksheetRoutes: MetadataRoute.Sitemap = worksheetSubjects.map((s) => ({
    url: `${BASE}/worksheet-generator/${s.slug}`,
    lastModified: new Date("2026-06-30"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...quizRoutes, ...worksheetRoutes];
}
