import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.quizkraft.tech";

  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0 },
    { url: `${baseUrl}/generator`, priority: 0.9 },
    { url: `${baseUrl}/pricing`, priority: 0.8 },
    { url: `${baseUrl}/blog`, priority: 0.7 },
    { url: `${baseUrl}/blog/how-to-write-quiz-questions`, priority: 0.6 },
    { url: `${baseUrl}/blog/10-ways-teachers-saving-hours-ai`, priority: 0.6 },
    { url: `${baseUrl}/blog/turn-any-pdf-into-practice-quiz`, priority: 0.6 },
  ];

  return staticRoutes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
