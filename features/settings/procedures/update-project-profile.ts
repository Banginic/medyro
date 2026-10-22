import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { projectInfo } from "@/drizzle/schema";
import { uploadPhoto } from "@/lib/cloudinary/uploadPhoto";
import { ProfileSchema } from "../schemas/profileSchema";

//................................................................................................
export const updateProjectProfile = createProcedure({
  schema: ProfileSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(projectInfo)
      .where(and(eq(projectInfo.id, input.projectId)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    // const {secure_url, public_id} = await uploadPhoto(input.photo, "projectInfo");

    const data = await context.db
      .update(projectInfo)
      .set({
        projectName: input.projectName,
        tagLine: input.tagLine,
        updatedAt: new Date(),
      })
      .where(and(eq(projectInfo.id, input.projectId)))
      .returning();

    return { data, status: 202 };
  },
});
