import { eq, } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { openingHours, pharmacies } from "@/drizzle/schema";
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

    // DELETE DATA IF AVAILABLE========================================
    if (existData.length === 1) {
      await context.db
        .delete(openingHours)
        .where(eq(openingHours.userId, userId));
    }

    //  FIND PHARMACY ID
    const [pharmacy] = await context.db
      .select({ id: pharmacies.id })
      .from(pharmacies)
      .where(eq(pharmacies.userId, userId))
      .limit(1);

    const data = await context.db
      .insert(openingHours)
      .values({
        userId,
        schedule: input.schedule,
        pharmacyId: pharmacy.id,
      })
      .returning();

    return { data, status: 201 };
  },
});
