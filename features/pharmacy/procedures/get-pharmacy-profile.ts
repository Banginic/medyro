import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { pharmacies } from "@/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";

//................................................................................................
export const getPharmacyProfile = createProcedure({
  schema: z.object(),

  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    const { userId: users, ...pharmacyColumns } = getTableColumns(pharmacies);
    const data = await context.db
      .select({
        ...pharmacyColumns,
      })

      .from(pharmacies)
      .where(eq(pharmacies.userId, userId));

    return {
      data,
    };
  },
});
