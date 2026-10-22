import { z } from "zod";

export const EditBlogSchema = z.object({
  blogId: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(250, { message: "Title should not be more than 250 letters" }),
  author: z
    .string()
    .min(1, { message: "Author is required" })
    .max(25, { message: "Author should not be more than 25 letters" }),

  body: z.string().min(1, { message: "Blog content  is required" }).max(1500, {
    message: "Blog content name should not be more than 1500 letters",
  }),
});

export type EditBlogSchemaType = z.infer<typeof EditBlogSchema>;
