import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { db } from "@/drizzle";
import { news } from "@/drizzle/schema";

//................................................................................................
export const deleteNews = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,

  handler: async ({ context, input }) => {
    // Find existing data
    
    const data = await context.db
      .select({id: news.id})
      .from(news)
      .where(eq(news.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    await db.delete(news).where(eq(news.id, input.id));

    return { data: [], status: 203 };
  },
});
