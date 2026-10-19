import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { pharmacies } from "@/drizzle/schema";
import { MapSchema } from "../schemas/mapSchema";

//................................................................................................
export const updateMap = createProcedure({
  schema: MapSchema,
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    // Check existing data
    const existData = await context.db
      .select({
        id: pharmacies.id,
        publicId: pharmacies.coverImagePublicId,
      })
      .from(pharmacies)
      .where(and(eq(pharmacies.userId, userId)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    const data = await context.db
      .update(pharmacies)
      .set({
        latitude: input.latitude,
        longitude: input.longitude,
      })
      .returning();

    return { data, status: 202 };
  },
});
