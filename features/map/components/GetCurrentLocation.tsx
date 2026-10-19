"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { LoadingBTN } from "@/components/index";
import { useMutate } from "@/hooks/useMutate";
import { Save, X } from "lucide-react";
import { PharmacyTypes } from "@/features/pharmacy/types";
import { MapSchemaType } from "../schemas/mapSchema";
import { QUERY_KEYS } from "@/features/query-keys";
import "leaflet/dist/leaflet.css";
import { updateMap } from "../actions/updateMap";

export default function GetCurrentLocation({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  function handleSubmitSuccess() {
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<PharmacyTypes, MapSchemaType>({
    mutationFn: updateMap,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
    handleSubmitSuccess,
  });

  const [error, setError] = useState("");

  function handleSubmit() {
    if (coordinates) {
      mutate(coordinates);
    }
  }

  const getLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError(
          "Unable to retrieve your location. Please allow location access or enter the coordinates manually.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <Card className="p-4 lg:p-8 w-[98%] max-w-xl mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4 z-50"
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Update your location</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update the location using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <section className="mt-4 ">
          <div className="space-y-3">
            <button
              title="Click to add your location"
              type="button"
              onClick={getLocation}
              className="inline-flex items-center cursor-pointer gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              <LocateFixed size={18} />
              Use my current location
            </button>

            {coordinates && (
              <div className="text-sm">
                <p>Latitude: {coordinates.latitude}</p>
                <p>Longitude: {coordinates.longitude}</p>
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
              onClick={handleSubmit}
              disabled={isPending || !coordinates?.latitude}
              type="submit"
              size={"sm"}
            >
              {isPending ? (
                <div>
                  <LoadingBTN message="Saving..." />
                </div>
              ) : (
                <>
                  <Save />
                  Save
                </>
              )}
            </Button>
          </div>
        </section>
      </>
    </Card>
  );
}
