import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { and, gte, lte, asc, eq } from "drizzle-orm";
import { onCallSchedule } from "@/drizzle/schema";

//................................................................................................
export const getOnCall = createProcedure({
  schema: z.object({
    year: z.coerce.number().optional(),
    month: z.coerce.number().optional(),
    pharmacyId: z.string().optional(),
    id: z.string()
  }),

  handler: async ({ context, input }) => {
    const { year, month, id } = input;

    const conditions = [];

    // Filter by pharmacy when pharmacyId is provided
    if (id) {
      conditions.push(eq(onCallSchedule.pharmacyId, id));
    }

    if (year && month) {
      // Filter to the specified month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);

      conditions.push(gte(onCallSchedule.date, start));
      conditions.push(lte(onCallSchedule.date, end));
    } else if (year) {
      // Filter to the specified year
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);

      conditions.push(gte(onCallSchedule.date, start));
      conditions.push(lte(onCallSchedule.date, end));
    }

    const data = await context.db
      .select()
      .from(onCallSchedule)
      .where(and(...conditions))
      .orderBy(asc(onCallSchedule.date));

  

    return { data };
  },
});
