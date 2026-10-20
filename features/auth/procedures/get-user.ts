import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { users } from "@/drizzle/schema";

//................................................................................................
export const getUser = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required" }),
  }),
   protectAdmin: true,
  handler: async ({ context, input }) => {
    const data = await context.db
      .select({
        id: users.id,
        name:  users.name,
        role: users.role,
        email: users.email,

        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    return {
      data,
    };
  },
});
