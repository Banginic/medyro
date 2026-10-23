import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // increase for production
      interval: 10,
      capacity: 10,
    }),
  ],
});

export async function protectWithArcjet(
  req: Request | NextRequest,
  tokensToConsume = 1
) {
  let decision;
  try {
    decision = await aj.protect(req, { requested: tokensToConsume });
  } catch (err) {
    console.error("Arcjet failed:", err);
    return null; // allow request if Arcjet fails
  }

  if (decision.isDenied()) {
    if (decision.reason?.isRateLimit?.()) {
      return NextResponse.json(
        { success: false, error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }
    if (decision.reason?.isBot?.()) {
      return NextResponse.json(
        { success: false, message: "Bot detected", reason: decision.reason, data: [] },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Forbidden", reason: decision.reason, data: [] },
      { status: 403 }
    );
  }

  if ( (decision.results ?? []).some(isSpoofedBot)) {
    return NextResponse.json(
      { success: false, message: "Forbidden", data: [] },
      { status: 403 }
    );
  }

  return null; // allowed
}
