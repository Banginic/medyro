import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { news } from "@/drizzle/schema";

//................................................................................................
export const getNews = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required" }),
  }),

  handler: async ({ context, input }) => {
    const data = await context.db
      .select()
      .from(news)
      .where(eq(news.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    return {
      data,
    };
  },
});
