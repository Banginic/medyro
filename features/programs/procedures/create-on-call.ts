import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { onCallSchedule } from "@/drizzle/schema";
import { OnCallSchema } from "../schemas/onCallSchema";
import { revalidatePath } from "next/cache";
import { redisDel } from "@/lib/redis";

//................................................................................................
export const createOnCall = createProcedure({
  schema: OnCallSchema,
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "Unauthorized";
    }
    const parsedDate = new Date(input.date);

    // guard against duplicate on-call entries for the same day
    const [existing] = await context.db
      .select({ id: onCallSchedule.id })
      .from(onCallSchedule)
      .where(
        and(
          eq(onCallSchedule.date, parsedDate),
          eq(onCallSchedule.isActive, true),
          eq(onCallSchedule.userId, userId)
        ),
      )
      .limit(1);

    if (existing) {
      return "Exist";
    }

    const data = await context.db
      .insert(onCallSchedule)
      .values({
        userId,
        date: parsedDate,
        startTime: input.startTime,
        endTime: input.endTime || null,
      })
      

    await redisDel("programs");

    revalidatePath("/programs");

    return { data, status: 201 };
  },
});
