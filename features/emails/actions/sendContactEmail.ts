"use server";

import { resend } from "@/lib/resend";
import { ContactEmail } from "../templates/ContactEmail";
import { ContactEmailType } from "../types";

export async function sendContactEmail(data: ContactEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.email,
    subject: data.subject,
    react: ContactEmail(data),
  });
}
