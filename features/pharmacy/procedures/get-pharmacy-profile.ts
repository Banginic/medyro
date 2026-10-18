import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import {  pharmacies,  } from "@/drizzle/schema";

//................................................................................................
export const getPharmacyProfile = createProcedure({
  schema: z.object(),

  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    const data = await context.db.select().from(pharmacies);

    return {
      data,
    };
  },
});
