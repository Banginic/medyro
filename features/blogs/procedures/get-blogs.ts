import { and, ilike, desc, count, lte, gt } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { blogs } from "@/drizzle/schema";
import { redisGet, redisSet } from "@/lib/redis";

//................................................................................................
export const getBlogs = createProcedure({
  schema: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    category: z.string().optional(),
    search: z.string().optional(),
  }),

  handler: async ({ context, input }) => {
    const search = input.search ?? "";
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const offset = (page - 1) * limit;

    const cacheKey = ["medyro","blogs", page, search].join(":");
      

    const cached = await redisGet<{
      data: typeof data;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(cacheKey);

    if (cached) {
      return cached;
    }

    // Filters
    const filters = [];

    // Search filter
    if (search.trim()) {
      filters.push(ilike(blogs.title, `%${input.search}%`));
    }

    // Get blogs
    const data = await context.db
      .select()
      .from(blogs)
      .where(and(...filters))
      .orderBy(desc(blogs.createdAt))
      .limit(limit)
      .offset(offset);

    // Count total
    const total = await context.db
      .select({
        count: count(),
      })
      .from(blogs)
      .where(and(...filters));

    const payload = {
      data,
      pagination: {
        page: input.page,
        limit,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      },
    };
    await redisSet(cacheKey, payload, 300);

    return payload;
  },
});
