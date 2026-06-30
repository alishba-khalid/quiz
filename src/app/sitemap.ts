import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://www.quizkraft.tech";

const quizSubjects = [
  "biology", "algebra", "chemistry", "us-history", "grammar",
  "physics", "geometry", "spanish", "world-history", "vocabulary",
  "earth-science", "fractions",
];

const worksheetSubjects = [
  "math", "reading-comprehension", "biology", "algebra", "spelling",
  "chemistry", "world-history", "grammar", "physics", "geometry",
  "vocabulary", "us-history",
];

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
    { url: `${BASE}/blog/how-to-write-quiz-questions`,    lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/10-ways-teachers-saving-hours-ai`, lastModified: new Date("2026-06-15"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/turn-any-pdf-into-practice-quiz`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/terms`,     lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacy`,   lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const quizRoutes: MetadataRoute.Sitemap = quizSubjects.map((slug) => ({
    url: `${BASE}/quiz-generator/${slug}`,
    lastModified: new Date("2026-06-30"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const worksheetRoutes: MetadataRoute.Sitemap = worksheetSubjects.map((slug) => ({
    url: `${BASE}/worksheet-generator/${slug}`,
    lastModified: new Date("2026-06-30"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...quizRoutes, ...worksheetRoutes];
}
