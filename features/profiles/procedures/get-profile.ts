import { createProcedure } from "@/server/procedure";
import { contacts, locations, projectInfo } from "@/drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { redisGet, redisSet } from "@/lib/redis";

//................................................................................................
export const getProfile = createProcedure({
  schema: z.object({}),

  handler: async ({ context, input }) => {
    // Find existing data

    const cacheKey = "HMF-profile";
    const cached = await redisGet<{
      data: typeof data;
    }>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await context.db
      .select({
        // Contact table
        whatsApp: contacts.whatsApp,
        facebook: contacts.facebook,
        instagram: contacts.instagram,
        tiktok: contacts.tiktok,
        email: contacts.email,
        phone: contacts.phone,

        // Project table
        projectName: projectInfo.projectName,

        // Location table
        address: locations.address,
        city: locations.city,
        country: locations.country,

        createdAt: contacts.createdAt,
        updatedAt: contacts.updatedAt,
      })
      .from(contacts)
      .innerJoin(projectInfo, eq(projectInfo.id, contacts.projectId))
      .innerJoin(locations, eq(locations.projectId, projectInfo.id));

    if (data.length === 0) {
      return "Empty";
    }

    await redisSet(cacheKey, data, 300);
    return data;
  },
});
