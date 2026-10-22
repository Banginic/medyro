import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { blogs } from "@/drizzle/schema";
import { EditBlogSchema } from "../schemas/editBlogSchema";
import { z } from "zod";
import { redisDel } from "@/lib/redis";

//................................................................................................
const schema = EditBlogSchema.extend({
  id: z.string({ message: "ID is required" }),
});
export const updateBlog = createProcedure({
  schema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(blogs)
      .where(and(eq(blogs.id, input.id)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    const data = await context.db
      .update(blogs)
      .set({
        author: input.author,
        title: input.title,
        body: input.body,
        updatedAt: new Date(),
      })
      .where(and(eq(blogs.id, input.id)))
      .returning();

      await redisDel('testimonials')

    return { data, status: 202 };
  },
});
