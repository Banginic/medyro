import { eq, and } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { blogs } from "@/drizzle/schema";
import { uploadPhoto } from "@/lib/cloudinary/uploadPhoto";
import { BlogSchema } from "../schemas/blogSchema";
import { redisDel } from "@/lib/redis";
import { slugify } from "@/lib/slugify";

//................................................................................................
export const createBlog = createProcedure({
  schema: BlogSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    // Check existing data
    const existData = await context.db
      .select()
      .from(blogs)
      .where(and(eq(blogs.title, input.title)))
      .limit(1);

    if (existData.length === 1) {
      return "Exist";
    }

    const { secure_url, public_id } = await uploadPhoto(input.photo, "blogs");

    const slug = slugify(input.title);

    const data = await context.db
      .insert(blogs)
      .values({
        author: input.author,
        slug,
        title: input.title,
        body: input.body,
        photo: secure_url,
        photoPublicId: public_id,
      })
      .returning();

      await redisDel('blogs:1:')

    return { data, status: 201 };
  },
});
