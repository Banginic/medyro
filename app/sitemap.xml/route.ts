export const revalidate = 86400;

import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { blogs, products } from "@/drizzle/schema";
import { escapeXml } from "@/lib/escapeXml";

type SitemapEntry = {
  path: string;
  priority: number;
  lastmod: string;
};

const baseUrl = process.env.BASE_URL!;

const STATIC_PAGES: Omit<SitemapEntry, "lastmod">[] = [
  { path: "", priority: 1.0 },
  { path: "products", priority: 0.8 },
  { path: "about-us", priority: 0.7 },
  { path: "programs", priority: 0.7 },
  { path: "employees", priority: 0.6 },
  { path: "contact-us", priority: 0.4 },
  { path: "blogs", priority: 0.5 },
  { path: "services", priority: 0.5 },
  { path: "news", priority: 0.7 },
  { path: "faq", priority: 0.3 },
];

function buildXml(pages: SitemapEntry[]) {
  const body = pages
    .map(
      (page) => `
  <url>
    <loc>${escapeXml(`${baseUrl}/${page.path}`)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;
}

export async function GET() {
  const today = new Date().toISOString();

  const staticPages: SitemapEntry[] = STATIC_PAGES.map((p) => ({
    ...p,
    lastmod: today,
  }));

  let blogPages: SitemapEntry[] = [];

  let productPages: SitemapEntry[] = [];

  try {
    const [availableBlogs, availableProducts] = await Promise.all([
      db.select().from(blogs),
      db.select().from(products),
    ]);

    blogPages = availableBlogs.map((blog) => ({
      path: `blogs/${blog.id}`,
      priority: 0.4,
      lastmod: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : today,
    }));

    productPages = availableProducts.map((product) => ({
      path: `products/${product.slug}`,
      priority: 0.4,
      lastmod: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : today,
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch dynamic pages from DB", error);
  }

  const allPages = [...staticPages, ...blogPages, ...productPages];

  return new NextResponse(buildXml(allPages), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
