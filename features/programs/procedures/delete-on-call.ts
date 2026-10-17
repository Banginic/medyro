import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { db } from "@/drizzle";
import { onCallSchedule } from "@/drizzle/schema";
import { redisDel } from "@/lib/redis";

//................................................................................................
export const deleteOnCall = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,

  handler: async ({ context, input }) => {
    // Find existing data

    const data = await context.db
      .select({ id: onCallSchedule.id })
      .from(onCallSchedule)
      .where(eq(onCallSchedule.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    await db.delete(onCallSchedule).where(eq(onCallSchedule.id, input.id));
    await redisDel("programs");
    return { data: [], status: 203 };
  },
});
