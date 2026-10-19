import { z } from "zod";

export const MapSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),

  longitude: z.coerce.number().min(-180).max(180),
});

export type MapSchemaType = z.infer<typeof MapSchema>;
