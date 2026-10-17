"use server";

import { resend } from "@/lib/resend";
import { AdminNotificationEmail } from "../templates/AdminNotificationEmail";
import { ContactEmailType } from "../types";

export async function sendAdminNotificationEmail(data: ContactEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: data.subject,
    replyTo: data.email,
    react: AdminNotificationEmail(data),
  });
}
