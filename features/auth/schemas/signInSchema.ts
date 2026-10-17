
import { z } from 'zod'

export const SignInSchema = z.object({

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
});

export type SignInSchemaType = z.infer < typeof SignInSchema>