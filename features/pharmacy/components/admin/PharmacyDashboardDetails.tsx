"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Phone, Plus, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PharmacyType } from "../../types";
import NearbyPharmacies from "./NearbyPharmacies";

export default function PharmacyDashboardDetails({
  pharmacies,
}: {
  pharmacies: PharmacyType[];
}) {
  const pharmacy = pharmacies[0];

  if (!pharmacy) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold">No pharmacy yet</h1>
          <p className="mt-2 text-muted-foreground">
            Add your first pharmacy to see your dashboard.
          </p>
        </div>
      </main>
    );
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const nearbySearchParams = {
    city: pharmacy.city,
    latitude: pharmacy.latitude,
    longitude: pharmacy.longitude,
    excludedId: pharmacy.id,
  };

  // Rename to match your type (e.g. pharmacy.cover, pharmacy.image)
  const coverUrl: string | null | undefined = (pharmacy as { coverImage?: string | null }).coverImage;

  return (
    <main className="min-h-screen bg-card/50 backdrop-blur-2xl border rounded-2xl relative">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-8 md:px-10 md:py-14">
        {/* ------------------------------- Hero ------------------------------- */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text */}
          <div>
            <p
              suppressHydrationWarning
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
            >
              {today}
            </p>

            <h1 className="mt-3 text-4xl font-display font-bold leading-[1.1] tracking-tight md:text-5xl">
              {pharmacy.name}
            </h1>

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
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`tel:+237${String(pharmacy.phone).replace(/\s/g, "")}`}>
                  <Phone className="size-4" />
                  {pharmacy.phone}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pharmacy/programs">
                  <Plus className="size-4" />
                  Add call day
                </Link>
              </Button>
            </div>

            {pharmacies.length > 1 && (
              <button className="mt-5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Switch pharmacy
              </button>
            )}
          </div>

          {/* Cover photo / placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={`${pharmacy.name} storefront`}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/10 via-muted to-primary/5">
                <div className="text-center text-muted-foreground">
                  <Building2 className="mx-auto size-12" aria-hidden />
                  <p className="mt-3 text-sm">Cover photo</p>
                </div>
              </div>
            )}

            {/* City chip over the image */}
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur">
              <MapPin className="size-3.5" aria-hidden />
              {pharmacy.city}
            </span>
          </div>
        </section>

        {/* ---------------------------- Nearby section ---------------------------- */}
        <section className="">
          <NearbyPharmacies params={nearbySearchParams} />
        </section>
      </div>
    </main>
  );
}