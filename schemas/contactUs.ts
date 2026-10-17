import * as z from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name field is required" })
    .min(6, { message: "Name must be atleast 6 letters" })
    .max(25, { message: "Name must be at most 25 letters" }),
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .max(25, { message: "Email must be at most 25 characters" })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email address",
    }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(6, { message: "Phone number must be at least 9 numbers" })
    .max(15, { message: "Phone number must be at most 15 numbers" }),
  service: z
    .string()
    .min(1, { message: "Service field is required" })
    .min(3, { message: "Service must be at least 6 letters" })
    .max(25, { message: "Service must be at most 25 letters" }),
  message: z
    .string()
    .min(1, { message: "Message field is required" })
    .min(6, { message: "Message must be atleast 6 letters" })
    .max(50, { message: "Message must be at most 50 letters" }),
});

export type ContactSchemaType = z.infer< typeof ContactSchema>
