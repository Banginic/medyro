import { z } from "zod";

export const NewsSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(50, { message: "Subject should not be more than 50 letters" }),

  body: z
    .string()
    .min(1, { message: "News content  is required" })
    .max(500, {
      message: "News content  should not be more than 500 letters",
    }),
});

export type NewsSchemaType = z.infer<typeof NewsSchema>;
