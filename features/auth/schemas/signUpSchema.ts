import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be at least 3 letters" })
      .max(25, { message: "Name should be at most 25 letters" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .min(8, { message: "Email must be at least 8 characters" })
      .max(50, { message: "Email should be at most 50 characters" })
      .email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(15, { message: "Password should be at most 15 characters" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(15, { message: "Password should be at most 15 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
