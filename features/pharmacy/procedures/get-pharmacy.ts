import { eq, getTableColumns } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { pharmacies } from "@/drizzle/schema";

//................................................................................................
export const getPharmacy = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),

  handler: async ({ context, input }) => {
    // Find existing data

    const { userId, ...selectedColumns } = getTableColumns(pharmacies);

    const data = await context.db
      .select({
        ...selectedColumns,
      })
      .from(pharmacies)
      .where(eq(pharmacies.slug, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    return { data };
  },
});
