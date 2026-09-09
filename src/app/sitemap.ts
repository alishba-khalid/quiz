import { MetadataRoute } from "next";
import { quizSubjects, worksheetSubjects } from "@/lib/subjects";
import { blogPosts } from "@/lib/blog-posts";

const BASE = "https://www.quizkraft.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,          lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/youtube-to-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pdf-to-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/generator`, lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/quiz-generator`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/worksheet-generator`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/quiz-maker-for-teachers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pricing`,   lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/features`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,      lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/terms`,     lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacy`,   lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const quizRoutes: MetadataRoute.Sitemap = quizSubjects.map((s) => ({
    url: `${BASE}/quiz-generator/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const worksheetRoutes: MetadataRoute.Sitemap = worksheetSubjects.map((s) => ({
    url: `${BASE}/worksheet-generator/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...quizRoutes, ...worksheetRoutes];
}
