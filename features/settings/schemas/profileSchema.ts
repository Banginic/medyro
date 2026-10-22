import { z } from "zod";

export const ProfileSchema = z.object({
    projectId: z.string(),
  projectName: z
    .string()
    .min(1, { message: "Project name is required" })
    .max(50, { message: "Project name must be less than 50 characters" }),
  tagLine: z
    .string()
    .min(1, { message: "Tag line is required" })
    .max(100, { message: "Tag line must be less than 100 characters" }),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
