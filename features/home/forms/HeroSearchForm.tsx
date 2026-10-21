"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Loader2, LocateFixed, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Location = { latitude: number | undefined; longitude: number | undefined };

interface PropTypes {
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
}

export default function HeroSeachForm({
  location,
  setLocation,
  query,
  setQuery,
  isFetching,
}: PropTypes) {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasLocation =
    location.latitude !== undefined && location.longitude !== undefined;

  function handleNearMe() {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError("Your browser does not support location.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      },
      () => {
        setLocating(false);
        setError("Please allow location access in your browser settings.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function onReset() {
    setQuery("");
    setLocation({ latitude: undefined, longitude: undefined });
    setError(null);
  }

  return (
    <section className="relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative mt-8 rounded-2xl border border-primary/20 bg-card p-4"
      >
        <label htmlFor="address" className="sr-only">
          Search address
        </label>
        <div className="relative">
          <MapPin
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0F6B3F]"
          />
          <Input
            id="address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your address. Douala, Buea, Yaounde"
            autoComplete="off"
            className="pl-12 pr-12"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isFetching ? (
              <Loader2
                aria-label="Searching"
                className="h-5 w-5 animate-spin text-muted-foreground"
              />
            ) : (
              (query || hasLocation) && (
                <button
                  type="button"
                  onClick={onReset}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 lg:flex-row">
          <Button
            type="button"
            variant={hasLocation ? "secondary" : "outline"}
            onClick={handleNearMe}
            disabled={locating}
            className="lg:flex-1"
          >
            {locating ? <Loader2 className="animate-spin" /> : <LocateFixed />}
            {locating
              ? "Locating..."
              : hasLocation
                ? "Location set"
                : "Use my location"}
          </Button>
          <Button
            asChild
            type="button"
            size="lg"
            disabled={isFetching}
            className="lg:flex-1"
          >
            <Link href={"/find-pharmacies"}>
              {isFetching ? <Loader2 className="animate-spin" /> : <Search />}
              {isFetching ? "Searching..." : "Find Pharmacy"}
            </Link>
          </Button>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
