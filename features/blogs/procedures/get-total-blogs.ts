import { count } from "drizzle-orm";
import { z } from "zod";
import { createProcedure } from "@/server/procedure";
import { blogs } from "@/drizzle/schema";

export const getTotalblogs = createProcedure({
  schema: z.object({}),
  protectAdmin: true,
  handler: async ({ context }) => {
    const total = await context.db
      .select({
        count: count(),
      })
      .from(blogs);
    return {
      data: total[0]?.count ?? 0,
    };
  },
});
