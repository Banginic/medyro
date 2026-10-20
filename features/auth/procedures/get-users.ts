import { createProcedure } from "@/server/procedure";
import { users } from "@/drizzle/schema";
import { z } from "zod";

//................................................................................................
export const getUsers = createProcedure({
  schema: z.object({}),
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Find existing data
    const data = await context.db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        email: users.email,
  
        createdAt: users.createdAt,
      })
      .from(users);

    if (data.length === 0) {
      return "Empty";
    }

    return data;
  },
});
