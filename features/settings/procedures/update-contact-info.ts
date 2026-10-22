import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { contacts } from "@/drizzle/schema";
import { ContactSchema } from "../schemas/contactSchema";

//................................................................................................
export const updateContactInfo = createProcedure({
  schema: ContactSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(contacts)
      .where(and(eq(contacts.projectId, input.projectId)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    const data = await context.db
      .update(contacts)
      .set({
        phone: input.phone,
        email: input.email,
        facebook: input.facebook,
        whatsApp: input.whatsApp,
        tiktok: input.tiktok,
        instagram: input.instagram,
        updatedAt: new Date(),
      })
      .where(and(eq(contacts.projectId, input.projectId)))
      .returning();

    return { data, status: 202 };
  },
});
