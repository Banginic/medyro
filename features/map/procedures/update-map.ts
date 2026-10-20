import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { pharmacies } from "@/drizzle/schema";
import { MapSchema } from "../schemas/mapSchema";

export const updateMap = createProcedure({
  schema: MapSchema,
  protectClient: true,

  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "Unauthorized";
    }

    // Find the pharmacy belonging to the authenticated user.
    const [pharmacy] = await context.db
      .select({
        id: pharmacies.id,
        userId: pharmacies.userId,
      })
      .from(pharmacies)
      .where(eq(pharmacies.userId, userId))
      .limit(1);

    if (!pharmacy) {
      return "NotFound";
    }

    // Update only the selected pharmacy.
    const updated = await context.db
      .update(pharmacies)
      .set({
        latitude: input.latitude,
        longitude: input.longitude,
      })
      .where(eq(pharmacies.id, pharmacy.id))
      .returning({
        id: pharmacies.id,
        userId: pharmacies.userId,
        latitude: pharmacies.latitude,
        longitude: pharmacies.longitude,
      });



    if (updated.length !== 1) {
      throw new Error(
        `Expected to update one pharmacy, but updated ${updated.length}.`,
      );
    }

    return {
      data: updated[0],
      status: 202,
    };
  },
});