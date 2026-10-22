import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { locations } from "@/drizzle/schema";
import { AddressSchema } from "../schemas/addressSchema";

//................................................................................................
export const updateAddressInfo = createProcedure({
  schema: AddressSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(locations)
      .where(and(eq(locations.projectId, input.projectId)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    const data = await context.db
      .update(locations)
      .set({
        projectId: input.projectId,
        country: input.country,
        state: input.state,
        city: input.city,
        address: input.address,
        currency: input.currency,
        language: input.language,
        updatedAt: new Date(),
      })
      .where(and(eq(locations.projectId, input.projectId)))
      .returning();

    return { data, status: 202 };
  },
});
