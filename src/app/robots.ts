import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.quizkraft.tech";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", "/login", "/signup"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
