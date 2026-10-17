import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY!;

    const verificationResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const verification = await verificationResponse.json();
    console.log(verification)

    if (verification.success && verification.score > 0.5) {
      return NextResponse.json({
        success: true,
        message: "success",
        score: verification.score,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Fail to verify recaptcha",
      score: verification.score,
    });
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, message: ex.message, score: 0 },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Error verifying Recaptcha", score: 0 },
      { status: 500 },
    );
  }
}
