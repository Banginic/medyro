import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(250, { message: "Title should not be more than 250 letters" }),
  author: z
    .string()
    .min(1, { message: "Author is required" })
    .max(25, { message: "Author should not be more than 25 letters" }),

  body: z
    .string()
    .min(1, { message: "Blog content  is required" })
    .max(1500, { message: "Blog content name should not be more than 1500 letters" }),

  photo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPEG, JPG, PNG, and WEBP formats are accepted",
    }),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
