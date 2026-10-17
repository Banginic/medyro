import { z } from "zod";

export const MessageReplySchema = z.object({
  message: z
    .string()
    .min(1, { message: "Body is required" })
    .min(8, { message: "Body must be at least 8 letters" })
    .max(500, { message: "Body should be at most 500 letters" }),
});

export type MessageReplySchemaType = z.infer<typeof MessageReplySchema>;
