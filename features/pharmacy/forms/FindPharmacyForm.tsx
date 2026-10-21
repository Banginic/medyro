"use client";

import { LoadingBTN } from "@/components/index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMEROON_REGIONS } from "@/features/registrations/contants";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  region: string;
  city: string;
  setRegion: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  handleFetching: () => void;
  isFetching: boolean;
}

function FindPharmacyForm({
  region,
  city,
  setRegion,
  setCity,
  handleFetching,
  isFetching,
}: PropsType) {
  const selectedRegion = CAMEROON_REGIONS.find((item) => item.name === region);

  return (
    <>
      <Card className="p-6 rounded-2xl border ">
        <CardHeader>
          <CardTitle>Find a pharmacy in your area</CardTitle>
          <CardDescription> Select your your region and town</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                avoidCollisions={false}
                className="max-h-70 overflow-y-auto"
              >
                <SelectGroup>
                  <SelectLabel>Regions</SelectLabel>
                  {CAMEROON_REGIONS.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="region">Town / City</Label>
            <Select
              value={city}
              onValueChange={setCity}
              disabled={!selectedRegion?.towns}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {selectedRegion?.towns.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-8">
            <Button
              disabled={isFetching}
              type="button"
              onClick={handleFetching}
              className="w-full"
            >
              {isFetching ? (
                <LoadingBTN message="Searching..." />
              ) : (
                "Find Pharmacy"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default FindPharmacyForm;
