import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be less than 50 characters" }),
  phone: z
    .string()
    .min(9, { message: "Phone is required" })
    .max(15, { message: "Phone must be less than 15 characters" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z
    .string()
    .min(1, { message: "Message is required" })
    .max(250, { message: "Message must be less than 250 characters" }),

  // Honeypot
  website: z.string().optional(),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
