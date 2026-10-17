import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { and, gte, lte, asc } from "drizzle-orm";
import { onCallSchedule } from "@/drizzle/schema";
import { redisGet, redisSet } from "@/lib/redis";

//................................................................................................
export const getOnCalls = createProcedure({
  schema: z.object({
    year: z.coerce.number().optional(),
    month: z.coerce.number().optional(),
  }),

  handler: async ({ context, input }) => {
    const { year, month } = input;

    const cacheKey = ["programs", year, month].join(":");

    const cached = await redisGet<{
      data: typeof data;
    }>(cacheKey);

    if (cached) {
      return cached;
    }

    const conditions = [];

    if (year && month) {
      // both provided — filter to that specific month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0); // last day of that month

      conditions.push(gte(onCallSchedule.date, start));
      conditions.push(lte(onCallSchedule.date, end));
    } else if (year) {
      // only year provided — filter to the whole year
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);

      conditions.push(gte(onCallSchedule.date, start));
      conditions.push(lte(onCallSchedule.date, end));
    }
    // if neither is provided, no filter — returns everything

    const data = await context.db
      .select()
      .from(onCallSchedule)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(onCallSchedule.date));

    await redisSet(cacheKey, data, 300);

    return {
      data,
    };
  },
});
