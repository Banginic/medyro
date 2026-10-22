import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { projectInfo } from "@/drizzle/schema";
import { ProfileSchema } from "../schemas/profileSchema";

//................................................................................................
export const createProjectProfile = createProcedure({
  schema: ProfileSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(projectInfo)
      .where(and(eq(projectInfo.projectName, input.projectName)))
      .limit(1);

    if (existData.length === 1) {
      return "Exist";
    }

    // const {secure_url, public_id} = await uploadPhoto(input.photo, "projectInfo");

    const data = await context.db
      .insert(projectInfo)
      .values({
        projectName: input.projectName,
        tagLine: input.tagLine,
      })
      .returning();

    return { data, status: 201 };
  },
});
