import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { contacts } from "@/drizzle/schema";
import { ContactSchema } from "../schemas/contactSchema";

//................................................................................................
export const createContactInfo = createProcedure({
  schema: ContactSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(contacts)
      .where(and(eq(contacts.projectId, input.projectId)))
      .limit(1);

    if (existData.length === 1) {
      return "Exist";
    }

    const data = await context.db
      .insert(contacts)
      .values({
        projectId: input.projectId,
        phone: input.phone,
        email: input.email,
        facebook: input.facebook,
        whatsApp: input.whatsApp,
        tiktok: input.tiktok,
        instagram: input.instagram
      })
      .returning();

    return { data, status: 201 };
  },
});
