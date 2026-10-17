import { z } from "zod";

export const ContactEmailSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required" })
    .max(50, { message: "Name should not be more than 50 letters" }),

  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(30, { message: "Email should not be more than 30 letters" })
    .email(),

  subject: z
    .string()
    .min(3, { message: "Subject is required" })
    .max(50, { message: "Subject should not be more than 50 letters" }),

  message: z
    .string()
    .min(3, { message: "Message is required" })
    .max(500, { message: "Message should not be more than 500 letters" }),
});

export type ContactEmailSchemaType = z.infer<typeof ContactEmailSchema>;
