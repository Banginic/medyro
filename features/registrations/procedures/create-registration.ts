import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { pharmacies } from "@/drizzle/schema";
import { RegistrationSchema } from "../schemas/registrationSchema";
import { slugify } from "@/lib/slugify";

export const createPharmacyRegistration = createProcedure({
  schema: RegistrationSchema,
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    // Check if the subject already exists
    const existData = await context.db
      .select()
      .from(pharmacies)
      .where(eq(pharmacies.userId, userId))
      .limit(1);

    if (existData.length > 0) {
      return "Exist";
    }

    // Insert the new active pharmacies
    const data = await context.db
      .insert(pharmacies)
      .values({
        name: input.name,
        userId: userId,
        slug: slugify(input.name),
        phone: input.phone.toString(),
        whatsApp: input.whatsApp.toString(),
        region: input.region,
        city: input.city,
        email: input.email,
        address: input.address,
      })
      .returning();

    return {
      data,
      status: 201,
    };
  },
});
