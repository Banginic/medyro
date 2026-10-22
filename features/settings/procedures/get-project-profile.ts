import { createProcedure } from "@/server/procedure";
import { projectInfo } from "@/drizzle/schema";
import { z } from "zod";

//................................................................................................
export const getProjectProfile = createProcedure({
  schema: z.object({}),

  handler: async ({ context, input }) => {
    // Find existing data
    const data = await context.db
      .select()
      .from(projectInfo)
      .limit(1);

    if (data.length === 0) {
      return "Empty";
    }

    return data;
  },
});
