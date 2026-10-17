import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { news } from "@/drizzle/schema";
import { NewsSchema } from "../schemas/newsSchema";

export const createNews = createProcedure({
  schema: NewsSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {

    return await context.db.transaction(async (tx) => {

      // Check if the subject already exists
      const existData = await tx
        .select()
        .from(news)
        .where(eq(news.subject, input.subject))
        .limit(1);

      if (existData.length > 0) {
        return "Exist";
      }

      // Deactivate any active news
      await tx
        .update(news)
        .set({ isActive: false })
        .where(eq(news.isActive, true));

      // Insert the new active news
      const data = await tx
        .insert(news)
        .values({
          subject: input.subject,
          body: input.body,
          isActive: true,
        })
        .returning();

      return {
        data,
        status: 201,
      };
    });
  },
});
