import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL!;
export async function GET() {
  const content = `
User-agent: *
Disallow: /g5b8c5v0-9f42-7d6e-8401-5f7h2b6e8c23/
Disallow: /footer/
Disallow: /checkout/
Disallow: /api/
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
