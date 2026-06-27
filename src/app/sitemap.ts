import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://worksheetquizgenerator.com";

  const routes = [
    "",
    "/quiz-generator",
    "/math-worksheet-generator",
    "/reading-comprehension-generator",
    "/vocabulary-worksheet-generator",
    "/spelling-worksheet-generator",
    "/pricing",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
