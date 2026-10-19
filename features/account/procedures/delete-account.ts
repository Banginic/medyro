import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { users } from "@/drizzle/schema";
import { z } from "zod";

//................................................................................................
export const deleteAccount = createProcedure({
  schema: z.object({ userId: z.string().min(1).optional() }),
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "Unauthorized";
    }

    // Check existing data
    const existData = await context.db
      .select({
        id: users.id,
      })
      .from(users)
      .where(and(eq(users.id, userId)))
      .limit(1);

    if (existData.length === 0) {
      return "Unauthorized";
    }

    await context.db.delete(users).where(and(eq(users.id, userId)));

    return { existData, status: 203 };
  },
});
