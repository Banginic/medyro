import { createProcedure } from "@/server/procedure";
import { users } from "@/drizzle/schema";
import { z } from "zod";
import { count, desc } from "drizzle-orm";

//................................................................................................
export const getUsers = createProcedure({
  schema: z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  }),
  protectAdmin: true,
  handler: async ({ context, input }) => {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;
    const offset = (page - 1) * limit;

    // Run both queries together
    const [data, totalResult] = await Promise.all([
      context.db
        .select({
          id: users.id,
          name: users.name,
          role: users.role,
          email: users.email,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),

      // Count query: no orderBy / limit / offset
      context.db.select({ count: count() }).from(users),
    ]);

    const total = totalResult[0]?.count ?? 0;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
});