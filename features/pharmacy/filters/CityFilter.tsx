"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CAMEROON_REGIONS } from "@/features/registrations/contants";

function CityFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get("city") || "";

  // Start with the region that contains the city in the URL (survives page reloads)
  const [region, setRegion] = useState(
    () =>
      CAMEROON_REGIONS.find((r) => r.towns.includes(currentCity))?.name ?? "",
  );

  // Compare against the selected region from state (not region.name === region.name)
  const selectedRegion = CAMEROON_REGIONS.find((r) => r.name === region);

  function updateCity(city: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("query");
    params.delete("page");

    if (city) {
      params.set("city", city);
    } else {
      params.delete("city");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleRegionChange(value: string) {
    setRegion(value);
    // A city from the previous region is no longer valid
    updateCity("");
  }

  function handleCityChange(value: string) {
    updateCity(value === "all" ? "" : value);
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex flex-col gap-0.5 w-40">
        <Label className="text-sm text-muted-foreground ml-1">Regions</Label>

        <Select value={region} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full max-w-48 border-ring/20">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>

          <SelectContent >
            <SelectGroup>
              <SelectLabel>Regions</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {CAMEROON_REGIONS.map((r) => (
                <SelectItem key={r.name} value={r.name}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-0.5 w-40">
        <Label className="text-sm text-muted-foreground ml-1">
          Cities / Town
        </Label>

        <Select
          value={currentCity}
          onValueChange={handleCityChange}
          disabled={!selectedRegion}
        >
          <SelectTrigger className="w-full max-w-48 border-ring/20">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cities</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {selectedRegion?.towns.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CityFilter;