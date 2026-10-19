import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { db } from "@/drizzle";
import { messages } from "@/drizzle/schema";

//................................................................................................
export const deleteMessage = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,

  handler: async ({ context, input }) => {
    // Find existing data

    const data = await context.db
      .select()
      .from(messages)
      .where(eq(messages.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    await db.delete(messages).where(eq(messages.id, input.id));

    return { data: [], status: 203 };
  },
});
