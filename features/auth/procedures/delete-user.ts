import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";

//................................................................................................
export const deleteUser = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,

  handler: async ({ context, input }) => {
    // Find existing data

    const adminEmail = process.env.ADMIN_EMAIL;

    const data = await context.db
      .select()
      .from(users)
      .where(eq(users.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }
    if (data[0].email === adminEmail) {
      return "NotFound";
    }

    await db.delete(users).where(eq(users.id, input.id));

    return { data: [], status: 203 };
  },
});
