import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/index";
import { escapeXml } from "@/lib/escapeXml";
import { pharmacies, blogs } from "@/drizzle/schema";

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
  { path: "blogs", priority: 0.8 },
  { path: "faq", priority: 0.4 },
  { path: "news", priority: 0.3 },
  { path: "support", priority: 0.2 },
];

function toIso(date: Date | string | null | undefined) {
  return date ? new Date(date).toISOString() : undefined;
}

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

async function getPharmacyPages(): Promise<SitemapEntry[]> {
  try {
    const rows = await db
      .select({ slug: pharmacies.slug, updatedAt: pharmacies.updatedAt })
      .from(pharmacies)
      .where(eq(pharmacies.isActive, true)); // adjust to your real "active" column

    return rows.map((pharmacy) => ({
      path: `pharmacies/${pharmacy.slug}`,
      priority: 0.9,
      lastmod: toIso(pharmacy.updatedAt),
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch pharmacy pages from DB", error);
    return [];
  }
}

async function getBlogPages(): Promise<SitemapEntry[]> {
  try {
    const rows = await db
      .select({ slug: blogs.slug, updatedAt: blogs.updatedAt })
      .from(blogs);

    return rows.map((blog) => ({
      path: `blogs/${blog.slug}`,
      priority: 0.7,
      lastmod: toIso(blog.updatedAt),
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch blog pages from DB", error);
    return [];
  }
}

export async function GET() {
  // Separate queries so one failing doesn't drop the other's pages
  const [pharmacyPages, blogPages] = await Promise.all([
    getPharmacyPages(),
    getBlogPages(),
  ]);

  return new NextResponse(
    buildXml([...STATIC_PAGES, ...pharmacyPages, ...blogPages]),
    {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
      },
    },
  );
}
