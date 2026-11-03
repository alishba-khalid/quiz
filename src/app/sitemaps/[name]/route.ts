import {
  SITEMAP_GROUPS,
  escapeXml,
  getSitemapEntries,
  type SitemapGroup,
} from "@/lib/sitemap-data";

// One sitemap per section, served at /sitemaps/<group>.xml.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_GROUPS.map((group) => ({ name: `${group}.xml` }));
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ name: string }> }
) {
  const { name } = await ctx.params;
  const group = name.replace(/\.xml$/, "") as SitemapGroup;
  if (!SITEMAP_GROUPS.includes(group)) {
    return new Response("Not found", { status: 404 });
  }

  const urls = getSitemapEntries(group)
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <lastmod>${e.lastModified.toISOString()}</lastmod>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
