import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { messages } from "@/drizzle/schema";

//................................................................................................
export const getMessage = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,
  handler: async ({ context, input }) => {
    const data = await context.db
      .select()
      .from(messages)
      .where(eq(messages.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    return {
      data,
    };
  },
});
