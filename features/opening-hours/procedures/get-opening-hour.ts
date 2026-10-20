import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { openingHours } from "@/drizzle/schema";

//................................................................................................
export const getOpeningHour = createProcedure({
  schema: z.object({ id: z.string() }),
  handler: async ({ context, input }) => {
  


    const data = await context.db
      .select()
      .from(openingHours)
      .where(eq(openingHours.userId, input.id))
      .limit(1);


    return {
      data,
    };
  },
});
