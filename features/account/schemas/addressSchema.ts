import { z } from "zod";

export const AddressSchema = z.object({
  region: z.string().min(1, { message: "Region is required" }),

  city: z.string().min(1, { message: "City or town is required" }),

  address: z
    .string()
    .min(1, { message: "Address required" })
    .max(70, { message: "Address should be less than 70 characters" }),

  website: z
    .string()
    .min(1, { message: "Website required" })
    .max(70, { message: "Website should be less than 70 characters" }).optional(),

  phone: z
    .number()
    .min(1, { message: "phone required" })
    
    .optional(),

  whatsApp: z
    .number()
    .min(1, { message: "WhatsApp number required" })
  
    .optional(),

  email: z
    .string()
    .min(1, { message: "Email required" })
    .max(50, { message: "Email should be less than 50 characters" })
    .optional(),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
