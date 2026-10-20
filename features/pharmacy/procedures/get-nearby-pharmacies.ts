import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { pharmacies } from "@/drizzle/schema";
import { and, asc, eq, getTableColumns, ne, sql } from "drizzle-orm";

//................................................................................................
export const getNearbyPharmacies = createProcedure({
  schema: z.object({
    city: z.string(),
    excludedId: z.string().optional(),
    limit: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  handler: async ({ context, input }) => {
    const conditions = [
      eq(pharmacies.isActive, true),
      sql`lower(trim(${pharmacies.city})) = lower(trim(${input.city}))`,
    ];

    if (input.excludedId) {
      conditions.push(ne(pharmacies.id, input.excludedId));
    }

    const sameCity = and(...conditions);

    const hasCoords =
      typeof input.latitude === "number" &&
      Number.isFinite(input.latitude) &&
      typeof input.longitude === "number" &&
      Number.isFinite(input.longitude);

    if (!hasCoords) {
      const data = await context.db
        .select()
        .from(pharmacies)
        .where(sameCity)
        .orderBy(asc(pharmacies.name))
        .limit(input.limit ?? 5);

      return { data };
    }

    // Haversine distance in km
    const distanceKm = sql<number | null>`
      6371 * acos(least(1, greatest(-1,
        cos(radians(${input.latitude}::float8)) *
        cos(radians(${pharmacies.latitude}::float8)) *
        cos(radians(${pharmacies.longitude}::float8) - radians(${input.longitude}::float8)) +
        sin(radians(${input.latitude}::float8)) *
        sin(radians(${pharmacies.latitude}::float8))
      )))
    `;

    const data = await context.db
      .select({
        ...getTableColumns(pharmacies),
        distanceKm,
      })
      .from(pharmacies)
      .where(sameCity)
      .orderBy(sql`${distanceKm} asc nulls last`, asc(pharmacies.name))
      .limit(input.limit ?? 5);

    return { data };
  },
});
