import { createProcedure } from "@/server/procedure";
import { locations } from "@/drizzle/schema";
import { z } from "zod";

//................................................................................................
export const getAddressInfo = createProcedure({
  schema: z.object({}),

  handler: async ({ context, input }) => {
    // Find existing data
    const data = await context.db
      .select()
      .from(locations)
      .limit(1);

    if (data.length === 0) {
      return "Empty";
    }

    return data;
  },
});
