import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { pharmacies } from "@/drizzle/schema";
import { AddressSchema } from "../schemas/addressSchema";

//................................................................................................
export const updateAddress = createProcedure({
  schema: AddressSchema,
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

    const filteredData = Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== undefined),
    );

    const data = await context.db
      .update(pharmacies)
      .set({ ...filteredData, updatedAt: new Date() })
       .where(and(eq(pharmacies.id, existData[0].id)))
      .returning();

    return { data, status: 202 };
  },
});
