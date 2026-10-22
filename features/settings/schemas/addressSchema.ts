import { z } from "zod";

export const AddressSchema = z.object({
  projectId: z.string(),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(15, { message: "Country should be at most 15 letters" }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(25, { message: "State should be at most 25 letters" }),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(15, { message: "City should be at most 15 letters" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(50, { message: "Address should be at most 50 letters" }),
  currency: z
    .string()
    .min(1, { message: "Currency is required" })
    .max(15, { message: "Currency should be at most 15 letters" }),
  language: z
    .string()
    .min(1, { message: "Language is required" })
    .max(15, { message: "Language should be at most 15 letters" }),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
