"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import HeroSeachForm from "../forms/HeroSearchForm";
import { useDebounce } from "@/hooks/useDebounce";
import { getActivePharmacies } from "@/features/pharmacy/actions/getActivePharmacies";
import NoPharmacy from "@/features/pharmacy/components/NoPharmacy";
import PharmacyGrid from "./PharmacyGrid";

function SearchPage() {
  const [location, setLocation] = useState<{
    latitude: number | undefined;
    longitude: number | undefined;
  }>({ latitude: undefined, longitude: undefined });

  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query.trim(), 400);
 const hasQuery = debouncedQuery.length > 0;
const hasLocation = location.latitude !== undefined;
const hasSearched = hasQuery || hasLocation;

  const { isFetching, isError, isPlaceholderData, data } = useQuery({
    queryKey: [
      "pharmacies",
      debouncedQuery,
      location?.latitude,
      location?.longitude,
    ],
    queryFn: () =>
      getActivePharmacies({
        query: debouncedQuery,
        latitude: location?.latitude,
        longitude: location?.longitude,
        limit: 8,
      }),
    enabled: hasSearched || hasLocation,
    placeholderData: keepPreviousData, // keeps old results visible while the new ones load
  });



  const pharmacies = data?.data ?? [];
  const isTyping = query.trim() !== debouncedQuery; // user typed, debounce not fired yet
  const isLoading = isFetching && (isPlaceholderData || !data);
  const noResults =
    !isFetching && !isTyping && (isError || pharmacies.length === 0);

  function handleReset() {
    setQuery("");
  }

  return (
    <div>
      {/* Form always stays mounted, so typing is never interrupted */}
      <HeroSeachForm
        location={location}
        setLocation={setLocation}
        query={query}
        setQuery={setQuery}
        isFetching={isFetching || isTyping}
      />

      {hasSearched && (
        <div className="mx-auto mt-8 w-full max-w-6xl ">
          {noResults ? (
            <NoPharmacy onReset={handleReset} />
          ) : (
            <div
              className={` w-full bg-card/20 backdrop-blur-2xl mt- h-100  rounded-2xl  ${isLoading ? "opacity-60 transition-opacity" : ""}`}
            >
              <PharmacyGrid pharmacies={pharmacies} onReset={handleReset} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
