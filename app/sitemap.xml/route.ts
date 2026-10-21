import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/index";
import { escapeXml } from "@/lib/escapeXml";
import { pharmacies } from "@/drizzle/schema";

export const revalidate = 86400;

const baseUrl = process.env.BASE_URL!.replace(/\/$/, "");

type SitemapEntry = {
  path: string;
  priority: number;
  lastmod?: string;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "", priority: 1.0 },
  { path: "pharmacies", priority: 0.7 },
  { path: "about-medyro", priority: 0.6 },
  { path: "news", priority: 0.3 },
  { path: "support", priority: 0.2 },
];

function buildXml(pages: SitemapEntry[]) {
  const body = pages
    .map(
      (page) => `
  <url>
    <loc>${escapeXml(`${baseUrl}/${page.path}`)}</loc>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
    }
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;
}

export async function GET() {
  let pharmacyPages: SitemapEntry[] = [];

  try {
    const rows = await db
      .select({ slug: pharmacies.slug, updatedAt: pharmacies.updatedAt })
      .from(pharmacies)
      .where(eq(pharmacies.isActive, true)); // adjust to your real "active" column

    pharmacyPages = rows.map((pharmacy) => ({
      path: `pharmacies/${pharmacy.slug}`,
      priority: 0.9,
      lastmod: pharmacy.updatedAt
        ? new Date(pharmacy.updatedAt).toISOString()
        : undefined,
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch dynamic pages from DB", error);
  }

  return new NextResponse(buildXml([...STATIC_PAGES, ...pharmacyPages]), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}