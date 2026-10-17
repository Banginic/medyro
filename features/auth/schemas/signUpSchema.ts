
import { z } from 'zod'

export const SignUpSchema = z.object({

  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 letters" })
    .max(25, { message: "Name should be at most 25 letters" }),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(8, { message: "Phone number must be at least 8 numbers" })
    .max(15, { message: "Phone number should be at most 15 numbers" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(8, { message: "Email must be at least 8 characters" })
    .max(50, { message: "Email should be at most 50 characters" })
    .email(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(15, { message: "Password should be at most 15 characters" }),
    
  confirmPassword: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(15, { message: "Password should be at most 15 characters" })
});

export type SignUpSchemaType = z.infer < typeof SignUpSchema>