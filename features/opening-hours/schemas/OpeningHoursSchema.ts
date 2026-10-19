import { z } from "zod";

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const OpeningHourSchema = z
  .object({
    day: z.enum(DAYS),
    isOpen: z.boolean(),
    start: z.string(),
    end: z.string(),
  })
  .superRefine((val, ctx) => {
    if (!val.isOpen) return; // day off: times are ignored

    if (!TIME_REGEX.test(val.start)) {
      ctx.addIssue({ code: "custom", path: ["start"], message: "Required" });
    }
    if (!TIME_REGEX.test(val.end)) {
      ctx.addIssue({ code: "custom", path: ["end"], message: "Required" });
    } else if (TIME_REGEX.test(val.start) && val.end <= val.start) {
      ctx.addIssue({
        code: "custom",
        path: ["end"],
        message: "Must be after start",
      });
    }
  });

export type OpeningHourType = z.infer<typeof OpeningHourSchema>;

export const DEFAULT_SCHEDULE: OpeningHourType[] = DAYS.map((day) => ({
  day,
  isOpen: day !== "saturday" && day !== "sunday",
  start: "08:00",
  end: "17:00",
}));

export const DailySchema = z.object({
  schedule: z.array(OpeningHourSchema).length(7),
});

export type DailySchemaType = z.infer<typeof DailySchema>;

