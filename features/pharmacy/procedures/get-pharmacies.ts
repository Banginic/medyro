import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { onCallSchedule, pharmacies } from "@/drizzle/schema";
import { and, asc, eq, sql, ilike, or, desc, count } from "drizzle-orm";
import { VerificationStatusEnum } from "../types";

//................................................................................................
export const getPharmacies = createProcedure({
  schema: z.object({
    city: z.string().optional(),
    query: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    verificationStatus: z.enum(VerificationStatusEnum).optional(),
  }),

  handler: async ({ context, input }) => {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const offset = (page - 1) * limit;

    const conditions = [];

    // CITIES=============================================
    if (input.city) {
      conditions.push(
        sql`lower(trim(${pharmacies.city})) = lower(trim(${input.city}))`,
      );
    }

    // VERIFICATION=======================================
    if (input.verificationStatus) {
      conditions.push(
        eq(pharmacies.verificationStatus, input.verificationStatus),
      );
    }

    // SEARCH QUERY=======================================
    if (input.query?.trim()) {
      const terms = input.query
        .trim()
        .split(/[\s,]+/)
        .filter(Boolean);

      for (const term of terms) {
        // escape LIKE wildcards so "%" or "_" typed by the user are treated as plain text
        const pattern = `%${term.replace(/[%_\\]/g, "\\$&")}%`;

        conditions.push(
          or(
            ilike(pharmacies.name, pattern),
            ilike(pharmacies.city, pattern),
            ilike(pharmacies.address, pattern),
          )!,
        );
      }
    }

    const sameCity = and(...conditions);

    const data = await context.db
      .select({
        id: pharmacies.id,
        slug: pharmacies.slug,
        name: pharmacies.name,
        logo: pharmacies.logo,
        address: pharmacies.address,
        city: pharmacies.city,
        onCallToday: onCallSchedule.date,
      })
      .from(pharmacies)
      .leftJoin(
        onCallSchedule,
        and(
          eq(onCallSchedule.pharmacyId, pharmacies.id),
          sql`${onCallSchedule.date} = CURRENT_DATE`,
        ),
      )
      .where(sameCity)
      .orderBy(
        desc(sql`(${onCallSchedule.pharmacyId} IS NOT NULL)`),
        asc(pharmacies.name),
      )
      .limit(limit)
      .offset(offset);

    // Count total
    const total = await context.db
      .select({
        count: count(),
      })
      .from(pharmacies)
      .where(sameCity);
    const payload = {
      data,
      pagination: {
        page: input.page,
        limit,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      },
    };

    return payload;
  },
});
