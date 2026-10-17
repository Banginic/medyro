import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/lib/auth";

type AuthRequest = NextRequest & {
  auth: Session | null;
};
const adminUrl = "/m5b8c5e0-9f42-7d6e-8401-5e7h2b6e8b23";


// Arcjet setup
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 10,
      capacity: 50,
    }),
  ],
});

export default auth(async function proxy(req: AuthRequest) {
  const { nextUrl } = req;

  // 1. Arcjet protection FIRST
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    return NextResponse.json(
      { success: false, message: "Request blocked" },
      { status: 403 },
    );
  }

  if (
    (decision.ip?.isHosting() ?? false) ||
    (decision.results ?? []).some(isSpoofedBot)
  ) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  // 2. Auth check
  const session = req.auth;

  // if (!session) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const isAdminRoute = nextUrl.pathname.startsWith(adminUrl);

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/m5b8c5e0-9f42-7d6e-8401-5e7h2b6e8b23") 

  // 4. Admin-only protection
  if (isAdminRoute && session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  // 5. Protect CUSTOMER routes
  if (isProtectedRoute && session?.user?.role !== "cashier" && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/m5b8c5e0-9f42-7d6e-8401-5e7h2b6e8b23/',
    '/m5b8c5e0-9f42-7d6e-8401-5e7h2b6e8b23/:path*',
  ],
};
