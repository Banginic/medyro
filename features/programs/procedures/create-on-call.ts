import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { onCallSchedule } from "@/drizzle/schema";
import { OnCallSchema } from "../schemas/onCallSchema";
import { revalidatePath } from "next/cache";
import { redisDel } from "@/lib/redis";

//................................................................................................
export const createOnCall = createProcedure({
  schema: OnCallSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    const parsedDate = new Date(input.date);

    // guard against duplicate on-call entries for the same day
    const [existing] = await context.db
      .select({ id: onCallSchedule.id })
      .from(onCallSchedule)
      .where(
        and(
          eq(onCallSchedule.date, parsedDate),
          eq(onCallSchedule.isActive, true),
        ),
      )
      .limit(1);

    if (existing) {
      return "NotFound";
    }

    const data = await context.db
      .insert(onCallSchedule)
      .values({
        date: parsedDate,
        startTime: input.startTime,
        endTime: input.endTime || null,
      })
      .returning();

     await redisDel('programs')

    revalidatePath("/programs");

    return { data };
  },
});
