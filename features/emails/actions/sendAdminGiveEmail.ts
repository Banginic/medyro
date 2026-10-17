"use server";

import { resend } from "@/lib/resend";
import { GiveEmailType } from "../types";
import { AdminGiveEmail } from "../templates/AdminGiveEmail";

export async function sendAdminGiveEmail(data: GiveEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: "TFM CHURCH GIVE",
    replyTo: data.email,
    react: AdminGiveEmail(data),
  });
}
