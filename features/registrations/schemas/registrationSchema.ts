import { z } from "zod";

export const RegistrationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Pharmacy name  is required" })
    .max(50, {
      message: "Pharmacy name should not be more than 50 characters",
    }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(9, { message: "Phone should not be more than 9 number" }),
  whatsApp: z
    .string()
    .min(1, { message: "WhatsApp  is required" })
    .max(9, { message: "WhatsApp should not be more than 9 number" }),
  email: z
    .string()
    .min(1, { message: "Email  is required" })
    .max(50, { message: "Email should not be more than 50 characters" }),

  region: z.string().min(1, { message: "Region  is required" }),

  city: z.string().min(1, { message: "City  is required" }),

  address: z
    .string()
    .min(1, { message: "Address  is required" })
    .max(50, { message: "Address should not be more than 50 letters" }),
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
