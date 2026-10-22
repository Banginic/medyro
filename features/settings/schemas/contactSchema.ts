import { z } from "zod";

export const ContactSchema = z.object({
  projectId: z.string(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(15, { message: "Phone number should be at most 15 numbers" }),
  email: z
    .string()
    .min(1, { message: "Email number is required" })
    .max(50, { message: "Email number should be at most 50 characters" })
    .email(),
  whatsApp: z
    .string()
    .min(1, { message: "WhatsApp number is required" })
    .max(25, { message: "WhatsApp number should be at most 25 numbers" }),
  facebook: z
    .string()
    .min(1, { message: "Facebook link is required" })
    .max(50, { message: "Facebook link should be at most 50 characters" })
    .url(),
  instagram: z
    .string()
    .min(1, { message: "Instagram link is required" })
    .max(50, { message: "Instagram link should be at most 50 characters" })
    .url(),
  tiktok: z
    .string()
    .min(1, { message: "Tiktok link is required" })
    .max(1000, { message: "Tiktok link should be at most 1000 characters" })
    .url(),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
