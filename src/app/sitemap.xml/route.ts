import {
  SITE_URL,
  SITEMAP_GROUPS,
  escapeXml,
  getSitemapEntries,
  newestDate,
} from "@/lib/sitemap-data";

// Sitemap index: lists one sitemap per section (see src/lib/sitemap-data.ts).
export const dynamic = "force-static";

export function GET() {
  const items = SITEMAP_GROUPS.map((group) => {
    const loc = `${SITE_URL}/sitemaps/${group}.xml`;
    const lastmod = newestDate(getSitemapEntries(group)).toISOString();
    return `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
