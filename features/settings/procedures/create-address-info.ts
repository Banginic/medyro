import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { locations } from "@/drizzle/schema";
import { AddressSchema } from "../schemas/addressSchema";

//................................................................................................
export const createAddressInfo = createProcedure({
  schema: AddressSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(locations)
      .where(and(eq(locations.projectId, input.projectId)))
      .limit(1);

    if (existData.length === 1) {
      return "Exist";
    }

    const data = await context.db
      .insert(locations)
      .values({
        projectId: input.projectId,
        country: input.country,
        state: input.state,
        city: input.city,
        address: input.address,
        currency: input.currency,
        language: input.language,
      })
      .returning();

    return { data, status: 201 };
  },
});
