"use server";

import { resend } from "@/lib/resend";
import { GiveEmailType } from "../types";
import { ClientGiveEmail } from "../templates/ClientGiveEmail";

export async function sendClientGiveEmail(data: GiveEmailType) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.email,
    subject: "TFM CHURCH GIVE",
    react: ClientGiveEmail(data),
  });
}
