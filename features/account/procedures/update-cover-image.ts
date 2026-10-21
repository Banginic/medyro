import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { pharmacies } from "@/drizzle/schema";
import { uploadPhoto } from "@/lib/cloudinary/uploadPhoto";
import { PhotoSchema } from "../schemas/photoSchema";
import { deletePhoto } from "@/lib/cloudinary/deletePhoto";

//................................................................................................
export const updateCoverImage = createProcedure({
  schema: PhotoSchema,
  protectClient: true,
  handler: async ({ context, input }) => {
    const userId = context.session?.user.id;

    if (!userId) {
      return "NotFound";
    }

    // Check existing data
    const existData = await context.db
      .select({
        id: pharmacies.id,
        publicId: pharmacies.coverImagePublicId,
      })
      .from(pharmacies)
      .where(and(eq(pharmacies.userId, userId)))
      .limit(1);

    if (existData.length === 0) {
      return "NotFound";
    }

    // DELETE PHOTO IF ALREADY EXIST=====================
    if (existData[0].publicId) {
      await deletePhoto(existData[0].publicId);
    }
    const { secure_url, public_id } = await uploadPhoto(
      input.photo,
      "pharmacy",
    );

    const data = await context.db
      .update(pharmacies)
      .set({
        coverImage: secure_url,
        coverImagePublicId: public_id,
        updatedAt: new Date(),
      })
       .where(and(eq(pharmacies.id, existData[0].id)))
      .returning();

    return { data, status: 202 };
  },
});
