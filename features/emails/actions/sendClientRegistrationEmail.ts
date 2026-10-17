"use server";

import { resend } from "@/lib/resend";
import { RegistrationEmailType } from "../types";
import { ClientRegistrationEmail } from "../templates/ClientRegistrationEmail";

export async function sendClientRegistrationEmail(data: RegistrationEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.email,
    subject: "TFM CHURCH REGISTRATION",
    react: ClientRegistrationEmail(data),
  });
}
