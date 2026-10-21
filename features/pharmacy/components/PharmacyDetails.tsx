"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Globe,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plus,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PharmacyType } from "../types";
import OpeningHourPage from "@/features/opening-hours/components/OpeningHourPage";
import OnCallPage from "@/features/programs/components/OnCallPage";
import { Back } from "@/components/index";

// Fields I'm assuming exist on your pharmacy. Rename them here to match your
// schema, and delete this type once PharmacyType already includes them.
type PharmacyExtras = {
  coverImage?: string | null;
  email?: string | null;
  website?: string | null;
  whatsapp?: string | null;
  verificationStatus?: string | null; // "verified" | "pending" | ...
};

function normalizeUrl(raw: string) {
  const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const { hostname } = new URL(url);
    return { href: url, label: hostname.replace(/^www\./, "") };
  } catch {
    return { href: url, label: raw };
  }
}

export default function PharmacyDetails({
  pharmacies,
}: {
  pharmacies: PharmacyType[];
}) {
  const pharmacy = pharmacies[0] as PharmacyType & PharmacyExtras;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isVerified = pharmacy.verificationStatus?.toLowerCase() === "verified";
  const website = pharmacy.website ? normalizeUrl(pharmacy.website) : null;
  const phoneDigits = String(pharmacy.phone ?? "").replace(/\s/g, "");
  const whatsappDigits = String(pharmacy.whatsApp ?? "").replace(/\D/g, "");

  const hasCoords =
    pharmacy.latitude != null &&
    pharmacy.longitude != null &&
    Number.isFinite(Number(pharmacy.latitude)) &&
    Number.isFinite(Number(pharmacy.longitude));

  let mapSrc = "";
  let directionsUrl = "";
  if (hasCoords) {
    const lat = Number(pharmacy.latitude);
    const lng = Number(pharmacy.longitude);
    const d = 0.004; // zoom level of the embedded map
    const bbox = [lng - d, lat - d, lng + d, lat + d].join("%2C");
    mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
    directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  return (
    <main className="relative min-h-screen rounded-2xl border border-ring/20  backdrop-blur-2xl">
       
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-8 md:px-10 md:py-14">
        {/* ------------------------------- Hero ------------------------------- */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text */}
          <div>
            {/* Logo + date + verification */}
            <div className="flex items-center gap-4">
              <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-card">
                {pharmacy.logo ? (
                  <Image
                    src={pharmacy.logo}
                    alt={`${pharmacy.name} logo`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                ) : (
                  <Building2
                    className="size-7 text-muted-foreground"
                    aria-hidden
                  />
                )}
              </div>

              <div className="min-w-0 space-y-1.5">
                <p
                  suppressHydrationWarning
                  className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {today}
                </p>
                {isVerified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800">
                    <BadgeCheck className="size-3.5" aria-hidden />
                    Verified pharmacy
                  </span>
                )}
              </div>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              {pharmacy.name}
            </h1>

            {/* Details */}
            <ul className="mt-6 space-y-2.5 text-muted-foreground">
              {pharmacy.pharmacistName && (
                <li className="flex items-center gap-2.5">
                  <UserRound className="size-4 shrink-0" aria-hidden />
                  <span>{pharmacy.pharmacistName}</span>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {pharmacy.address}, {pharmacy.city}, Cameroon
                </span>
              </li>
              {pharmacy.email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0" aria-hidden />
                  <a
                    href={`mailto:${pharmacy.email}`}
                    className="min-w-0 truncate underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {pharmacy.email}
                  </a>
                </li>
              )}
              {website && (
                <li className="flex items-center gap-2.5">
                  <Globe className="size-4 shrink-0" aria-hidden />
                  <a
                    href={website.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {website.label}
                  </a>
                </li>
              )}
            </ul>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`tel:+237${phoneDigits}`}>
                  <Phone className="size-4" />
                  {pharmacy.phone}
                </a>
              </Button>

              {whatsappDigits && (
                <Button asChild size="lg" variant="outline">
                  <a
                    href={`https://wa.me/${whatsappDigits.startsWith("237") ? "" : "237"}${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/icons/whatsapp.png"
                      alt=""
                      width={22}
                      height={22}
                    />
                    WhatsApp
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Cover photo / placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
            {pharmacy.coverImage ? (
              <Image
                src={pharmacy.coverImage}
                alt={`${pharmacy.name} storefront`}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-primary/10 via-muted to-primary/5">
                <div className="text-center text-muted-foreground">
                  <Building2 className="mx-auto size-12" aria-hidden />
                  <p className="mt-3 text-sm">Cover photo</p>
                </div>
              </div>
            )}

            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur">
              <MapPin className="size-3.5" aria-hidden />
              {pharmacy.city}
            </span>
          </div>
        </section>

        {/* ------------------------------ Location ------------------------------ */}
        {hasCoords && (
          <section aria-labelledby="location-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="location-heading" className="text-xl font-semibold">
                  Location
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pharmacy.address}, {pharmacy.city}
                </p>
              </div>
              <Button asChild>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="size-4" />
                  Get directions
                </a>
              </Button>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted md:aspect-[21/9]">
              <iframe
                title={`Map showing ${pharmacy.name}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </section>
        )}
      </div>
      <div className=" flex flex-col lg:flex-row justify-between gap-4 max-w-5xl mx-auto border rounded-2xl bg-card">
        <OnCallPage pharmacyId={pharmacy.id} />
        <OpeningHourPage pharmacyId={pharmacy.userId} />
      </div>
    </main>
  );
}
