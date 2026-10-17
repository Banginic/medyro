"use server";

import { resend } from "@/lib/resend";
import { ContactEmailType } from "../types";
import { ClientNotificationEmail } from "../templates/ClientNotificationEmail";

export async function sendClientNotificationEmail(data: ContactEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.email,
    subject: data.subject,
    react: ClientNotificationEmail(data),
  });
}
