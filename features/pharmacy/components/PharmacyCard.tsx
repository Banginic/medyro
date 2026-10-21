import { BadgeCheck, MapPin, Navigation, Phone, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { directionsUrl, PharmacyStatusType, PharmacyType } from "../types";

const STATUS: Record<PharmacyStatusType, { label: string; cls: string }> = {
  on_call: { label: "On Call Now", cls: "bg-primary text-primary-foreground" },
  open: { label: "Open Now", cls: "bg-accent text-accent-foreground" },
  closed: { label: "Closed", cls: "bg-muted text-muted-foreground" },
  unconfirmed: {
    label: "Schedule Unconfirmed",
    cls: "bg-warning text-warning-foreground",
  },
};

export function PharmacyCard({
  pharmacy,
  distance,
}: {
  pharmacy: PharmacyType;
  distance?: number | undefined;
}) {
  const s = STATUS[pharmacy.status];
  return (
    <article className="flex flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-3">
        <div
          className="grid size-11 shrink-0 place-items-center rounded-md bg-accent text-primary"
          aria-hidden
        >
          <Cross className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-base font-bold">
            <span className="truncate">{pharmacy.name}</span>
            {pharmacy.verificationStatus && (
              <BadgeCheck
                className="size-4 shrink-0 text-primary"
                aria-label="Verified by Medyro"
              />
            )}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden /> {pharmacy.address},{" "}
            {pharmacy.city}
            {distance != null && (
              <span className="ml-1">· {distance.toFixed(1)} km</span>
            )}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${s.cls}`}>
          {s.label}
        </span>
        {pharmacy.verificationStatus ? (
          <span className="rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            Verified
          </span>
        ) : (
          <span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
            Not verified
          </span>
        )}
      </div>
      <a
        href={`tel:${pharmacy.phone.replace(/\s/g, "")}`}
        className="mt-4 flex items-center gap-2 text-sm font-medium hover:text-primary"
      >
        <Phone className="size-4 text-primary" aria-hidden /> {pharmacy.phone}
      </a>
      <div className="mt-5 grid grid-cols-2 gap-2 pt-1">
        <Button variant="outline" asChild>
          <a href={`/pharmacies/${pharmacy.id}`}>View pharmacy</a>
        </Button>
        <Button asChild>
          <Link
            href={directionsUrl(pharmacy)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Directions to ${pharmacy.name}`}
          >
            <Navigation /> Directions
          </Link>
        </Button>
      </div>
    </article>
  );
}
