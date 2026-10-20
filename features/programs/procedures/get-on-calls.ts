import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { and, gte, lte, asc, eq } from "drizzle-orm";
import { onCallSchedule } from "@/drizzle/schema";

//................................................................................................
export const getOnCalls = createProcedure({
  schema: z.object({
    year: z.coerce.number().optional(),
    month: z.coerce.number().optional(),
    pharmacyId: z.string().optional(),
  }),

  handler: async ({ context, input }) => {
    const { year, month, pharmacyId } = input;

    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    const conditions = [eq(onCallSchedule.userId, userId)];

   

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

      console.log(data)

    return { data };
  },
});