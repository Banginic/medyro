import { desc, count,  } from "drizzle-orm";

import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { messages } from "@/drizzle/schema";

//................................................................................................
export const getMessages = createProcedure({
  schema: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  }),

  handler: async ({ context, input }) => {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const offset = (page - 1) * limit;

    // Get messages
    const data = await context.db
      .select({
        id: messages.id,
        name: messages.name,
        body: messages.body,
        email: messages.email,
        phone: messages.phone,
        subject:messages.subject,
        createdAt: messages.createdAt
      })
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    // Count total
    const total = await context.db
      .select({
        count: count(),
      })
      .from(messages);

    return {
      data,
      pagination: {
        page: input.page,
        limit,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      },
    };
  },
});
