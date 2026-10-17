import { z } from "zod";

export const OnCallSchema = z.object({
    date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (value) => {
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        return inputDate.getTime() >= today.getTime();
      },
      { message: "On-call date cannot be in the past." }
    ),

  startTime: z.string().min(1, { message: "Start time is required" }),

  endTime: z.string().optional(),
});

export type OnCallSchemaType = z.infer<typeof OnCallSchema>;
