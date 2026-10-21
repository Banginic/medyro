"use client";

import { useState } from "react";
import Image from "next/image";
import FindPharmacyForm from "../forms/FindPharmacyForm";
import { useQuery } from "@tanstack/react-query";
import NoPharmacy from "./NoPharmacy";
import FindPharmacyGrid from "./FindPharmacyGrid";
import { getActivePharmacies } from "../actions/getActivePharmacies";

function FindPharmacyPage() {
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const { isFetching, isError, data } = useQuery({
    queryKey: [searchCity, "Pharmacy"],
    queryFn: () => getActivePharmacies({ city, limit: 8 }),
    enabled: !!searchCity,
  });

  const hasSearched = !!searchCity;
  const showForm = !hasSearched || isFetching;
  const noResults = isError || !data?.data || data.data.length === 0;

  function handleFetching() {
    if (!city) return;
    setSearchCity(city);
  }

  function handleReset() {
    setSearchCity("");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full md:w-2xl lg:w-6xl flex-col items-center  gap-8 px-4 py-24 md:px-1 lg:flex-row lg:gap-16 lg:py-1">
      {/* Form (top on mobile, left on desktop) */}
      <div className="w-full lg:w-1/2  overflow-y-auto">
        {showForm ? (
          <FindPharmacyForm
            region={region}
            setRegion={setRegion}
            city={city}
            setCity={setCity}
            isFetching={isFetching}
            handleFetching={handleFetching}
          />
        ) : noResults ? (
          <NoPharmacy onReset={handleReset} />
        ) : (
          <FindPharmacyGrid pharmacies={data?.data} onReset={handleReset} />
        )}
      </div>

      {/* Image (bottom on mobile, right on desktop) */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg: h-100 lg:w-3/5 2xl:w-3/5">
        <Image
          src="/images/pharmacy-image.avif"
          alt="Find a pharmacy near you"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default FindPharmacyPage;
