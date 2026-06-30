import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.quizkraft.tech";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/generator", "/pricing", "/blog"],
      disallow: ["/dashboard", "/api/", "/login", "/signup"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
