"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, MoonStar } from "lucide-react";

import { cn } from "@/lib/utils";

export interface OnCallType {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  note: string;
  isActive: boolean;
  createdAt: Date;
}

interface AdminOnCallCardProps {
  onCall: OnCallType;
}

type Timing = "today" | "upcoming" | "past";

const TIMING_LABEL: Record<Timing, string> = {
  today: "Today",
  upcoming: "Up coming",
  past: "Passed",
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export default function OnCallCard({ onCall }: AdminOnCallCardProps) {
  // `date` may arrive serialized (string) from a server component
  const date = useMemo(() => new Date(onCall.date), [onCall.date]);

  const { day, month, weekday, longDate, timing, overnight } = useMemo(() => {
    const today = startOfDay(new Date());
    const target = startOfDay(date);
    const t: Timing =
      target === today ? "today" : target > today ? "upcoming" : "past";
    return {
      day: date.toLocaleDateString("fr-FR", { day: "2-digit" }),
      month: date
        .toLocaleDateString("fr-FR", { month: "short" })
        .replace(".", ""),
      weekday: date.toLocaleDateString("fr-FR", { weekday: "long" }),
      longDate: date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      timing: t,
      overnight: toMinutes(onCall.endTime) <= toMinutes(onCall.startTime),
    };
  }, [date, onCall.endTime, onCall.startTime]);

  const muted = !onCall.isActive || timing === "past";

  return (
    <>
      <motion.article
        layout
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.2 }}
        aria-label={`Garde du ${longDate}`}
        className={cn(
          "group flex overflow-hidden rounded-xl border bg-card text-card-foreground",
          "transition-colors",
          onCall.isActive && timing === "today" && "border-emerald-600/60",
        )}
      >
        {/* Date stamp: the one memorable element */}
        <div
          className={cn(
            "flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r px-2 py-4 sm:w-24",
            muted
              ? "bg-muted text-muted-foreground"
              : "bg-emerald-700 text-emerald-50 dark:bg-emerald-800",
          )}
        >
          <span className="text-xs font-medium capitalize opacity-80">
            {weekday.slice(0, 3)}.
          </span>
          <span className="text-3xl font-semibold leading-none tabular-nums sm:text-4xl">
            {day}
          </span>
          <span className="text-xs font-medium capitalize opacity-80">
            {month}
          </span>
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    timing === "today" &&
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                    timing === "upcoming" &&
                      "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
                    timing === "past" && "bg-muted text-muted-foreground",
                  )}
                >
                  {TIMING_LABEL[timing]}
                </span>
                {!onCall.isActive && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Masquée du site
                  </span>
                )}
              </div>

              <h3
                className={cn(
                  "flex flex-wrap items-center gap-x-2 text-lg font-semibold tabular-nums",
                  muted && "text-muted-foreground",
                )}
              >
                <Clock className="size-4 shrink-0" aria-hidden />
                <span>
                  {onCall.startTime.slice(0,5)} – {onCall.endTime.slice(0,5)}
                </span>
              </h3>

              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MoonStar className="size-3.5" aria-hidden />
                Call duty ends the next day
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
            <p className="text-xs text-muted-foreground">
              Ajoutée le{" "}
              {new Date(onCall.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </motion.article>
    </>
  );
}
