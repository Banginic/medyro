import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const photoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size must be less than 3MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only JPEG, JPG, PNG, and WEBP formats are accepted",
  });

export const VerificationBackendSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email should not be more than 50 letters" }),

  photos: z
    .array(photoSchema)
    .min(1, { message: "At least one photo is required" })
    .max(5, { message: "You can upload up to 5 photos" }),
});

export const VerificationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email should not be more than 50 letters" }),

  photo1: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPEG, JPG, PNG, and WEBP formats are accepted",
    }),
  photo2: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPEG, JPG, PNG, and WEBP formats are accepted",
    })
    .optional(),

  photo3: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPEG, JPG, PNG, and WEBP formats are accepted",
    })
    .optional(),
});

export type VerificationSchemaType = z.infer<typeof VerificationSchema>;
