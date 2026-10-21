import { MapPin, Navigation } from "lucide-react";
import { PharmacyType } from "../../types";
import Link from "next/link";
import Image from "next/image";

export type PharmacyStatus = "open" | "closed" | "on-call";

export type PharmacyCardProps = {
  name: string;
  address: string;
  logoUrl?: string | null;
  distanceKm?: number | null;
  status: PharmacyStatus;
  href?: string; // makes the whole card a link (e.g. `/pharmacies/${id}`)
};

function formatKm(km: number) {
  return `${km.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
}

function initials(name: string) {
  return (
    name
      .replace(/^pharmacie\s+(de\s+|du\s+|des\s+|d')?/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "Ph"
  );
}

export default function PharmacyCard({
  pharmacy,
  href,
}: {
  pharmacy: PharmacyType;
  href: string;
}) {
  const isOnCallToday =
    pharmacy.onCallToday &&
    new Date(pharmacy.onCallToday).toLocaleDateString("en-CA", {
      timeZone: "Africa/Douala",
    }) ===
      new Date().toLocaleDateString("en-CA", {
        timeZone: "Africa/Douala",
      });

  const div = (
    <article className="flex items-start gap-4 rounded-xl border border-emerald-950/10 bg-card p-2 lg:p-4  transition-shadow focus-within:ring-2 focus-within:ring-emerald-900 hover:shadow-md">
      {/* Logo */}
      <div className="grid size-14 relative shrink-0 place-items-center overflow-hidden rounded-lg border border-emerald-950/10 bg-card">
        {pharmacy.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            fill
            src={pharmacy.logo}
            alt={`Logo ${name}`}
            className="size-full object-contain"
          />
        ) : (
          <span aria-hidden className="text-lg font-semibold text-emerald-900">
            {initials(pharmacy.name)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
          <h3 className="min-w-0 font-bold leading-snug">{pharmacy.name}</h3>
          <>
            {isOnCallToday && (
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 bg-emerald-300/50 text-green-800 rounded-full px-2.5 py-1 text-[11px] lg:text-xs font-medium `}
              >
                <span
                  className={`size-1.5 animate-pulse rounded-full bg-emerald-500`}
                />
                On Call
              </span>
            )}
          </>
        </div>

        <p className=" flex items-start gap-1.5  text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="min-w-0">{pharmacy.address}</span>
        </p>

        {typeof pharmacy.distanceKm === "number" && (
          <p className="mt-0.5 flex items-center gap-1.5 font-medium tabular-nums">
            <Navigation className="size-3 shrink-0" aria-hidden />
            <span>
              {formatKm(pharmacy.distanceKm)}{" "}
              <span className="font-normal text-muted-foreground">to you</span>
            </span>
          </p>
        )}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block rounded-xl focus-visible:outline-none">
      {div}
    </Link>
  ) : (
    div
  );
}
