import { createProcedure } from "@/server/procedure";
import { news } from "@/drizzle/schema";
import { z } from "zod";
import { and,  eq } from "drizzle-orm";

//................................................................................................
export const getAllNews = createProcedure({
  schema: z.object({
    limit: z.number().optional(),
    status: z.string().optional(),
  }),

  
  handler: async ({ context, input }) => {
    const filters =  [];

    if(input.status){
      filters.push(eq(news.isActive, true))
    }
    // Find existing data
    const data = await context.db
      .select()
      .from(news)
      .where(and(...filters))
      .limit(input.limit || 10)
      .orderBy(news.isActive)

    if (data.length === 0) {
      return "Empty";
    }

    return data;
  },
});
