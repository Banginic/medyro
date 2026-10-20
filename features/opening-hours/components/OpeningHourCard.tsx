import { Card } from "@/components/ui/card";
import { OpeningHourType } from "../types";
import { DAY_LABELS } from "../schemas/OpeningHoursSchema";

function OpeningHourCard({
  openingHour,
}: {
  openingHour: OpeningHourType;
}) {
  const availableDays = (openingHour.schedule ?? []).filter(
    (d) => d.isOpen && d.start && d.end,
  );

  return (
    <article>
      <Card className="max-w-md mx-auto">
        {availableDays.length > 0 ? (
          <ul className="divide-y rounded-xl border">
            {availableDays.map((d) => (
              <li
                key={d.day}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="font-medium">{DAY_LABELS[d.day]}</span>
                <span className="text-sm text-muted-foreground">
                  {d.start} – {d.end}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border p-4 text-center text-sm text-muted-foreground">
            No availability has been set for this openingHour.
          </p>
        )}
      </Card>
    </article>
  );
}

export default OpeningHourCard;
