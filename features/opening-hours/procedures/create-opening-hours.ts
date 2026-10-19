import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { openingHours } from "@/drizzle/schema";
import { DailySchema } from "../schemas/OpeningHoursSchema";

//................................................................................................
export const createOpeningHours = createProcedure({
  schema: DailySchema,
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "Unauthorized";
    }

    // Check existing data
    const existData = await context.db
      .select()
      .from(openingHours)
      .where(eq(openingHours.userId, userId))
      .limit(1);

    if (existData.length === 1) {
      await context.db
        .delete(openingHours)
        .where(eq(openingHours.userId, userId));
    }

    const data = await context.db
      .insert(openingHours)
      .values({
          schedule: input.schedule,
          userId: userId,
      })
      .returning();

    return { data, status: 201 };
  },
});
