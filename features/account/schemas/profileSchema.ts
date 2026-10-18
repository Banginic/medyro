import { z } from "zod";

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project name is required" })
    .max(50, { message: "Project name should be less than 50 characters" }),

  pharmacistName: z
    .string()
    .min(1, { message: "Pharmacist name is required" })
    .max(50, { message: "Pharmacist name should be less than 50 characters" }).optional(),

  description: z
    .string()
    .min(1, { message: "Description required" })
    .max(200, { message: "Description should be less than 200 characters" }).optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
