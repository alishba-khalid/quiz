import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://worksheetquizgenerator.com";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/quiz-generator",
        "/math-worksheet-generator",
        "/reading-comprehension-generator",
        "/vocabulary-worksheet-generator",
        "/spelling-worksheet-generator",
        "/pricing",
      ],
      disallow: [
        "/dashboard",
        "/api/",
        "/login",
        "/signup",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
