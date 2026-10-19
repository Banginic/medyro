import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { openingHours } from "@/drizzle/schema";

//................................................................................................
export const getOpeningHours = createProcedure({
  schema: z.object({}),
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "Unauthorized";
    }

    const data = await context.db
      .select()
      .from(openingHours)
      .where(eq(openingHours.userId, userId));

    return {
      data,
    };
  },
});
