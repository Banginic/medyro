import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { db } from "@/drizzle";
import { blogs } from "@/drizzle/schema";
import { deletePhoto } from "@/lib/cloudinary/deletePhoto";
import { redisDel } from "@/lib/redis";

//................................................................................................
export const deleteBlog = createProcedure({
  schema: z.object({
    id: z.string({ message: "ID is required." }),
  }),
  protectAdmin: true,

  handler: async ({ context, input }) => {
    // Find existing data
    
    const data = await context.db
      .select()
      .from(blogs)
      .where(eq(blogs.id, input.id))
      .limit(1);

    if (data.length === 0) {
      return "NotFound";
    }

    await deletePhoto(data[0].photoPublicId)
    await db.delete(blogs).where(eq(blogs.id, input.id));

      await redisDel('blogs:1:')

    return { data: [], status: 203 };
  },
});
