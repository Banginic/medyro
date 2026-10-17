"use server";

import { resend } from "@/lib/resend";
import { RegistrationEmailType } from "../types";
import { AdminRegistrationEmail } from "../templates/AdminRegistrationEmail";

export async function sendAdminRegistrationEmail(data: RegistrationEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: "TFM CHURCH REGISTRATION",
    replyTo: data.email,
    react: AdminRegistrationEmail(data),
  });
}
