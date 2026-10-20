
"use client";

import { useState } from "react";
import { LocateFixed, Save, X } from "lucide-react";
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
import { PharmacyTypes } from "@/features/pharmacy/types";
import { MapSchemaType } from "../schemas/mapSchema";
import { QUERY_KEYS } from "@/features/query-keys";
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

  const [error, setError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  function handleSubmitSuccess() {
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<PharmacyTypes, MapSchemaType>({
    mutationFn: updateMap,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
    handleSubmitSuccess,
  });

  function getLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setIsLocating(false);
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location access was denied. Please allow location access in your browser settings."
            : err.code === err.TIMEOUT
              ? "Getting your location timed out. Please try again."
              : "Unable to retrieve your location. Please try again.",
        );

        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  function handleSubmit() {
    if (!coordinates || isPending) return;

    mutate(coordinates);
  }

  return (
    <Card className="relative mx-auto w-[98%] max-w-xl p-4 lg:p-8">
      <Button
        onClick={() => closeForm(false)}
        variant="ghost"
        className="absolute right-4 top-4 z-50"
        disabled={isPending}
      >
        <X />
      </Button>

      <CardHeader>
        <CardTitle>Update your location</CardTitle>
        <CardDescription className="text-muted-foreground">
          Use your current location to update your pharmacy's map coordinates.
        </CardDescription>
      </CardHeader>

      <section className="mt-4 space-y-3">
        <Button
          type="button"
          onClick={getLocation}
          disabled={isLocating || isPending}
        >
          <LocateFixed size={18} />
          {isLocating ? "Getting location..." : "Use my current location"}
        </Button>

        {coordinates && (
          <div className="space-y-1 text-sm">
            <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
            <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-end gap-4">
          <Button
            onClick={handleSubmit}
            disabled={isPending || isLocating || coordinates === null}
            type="button"
            size="sm"
          >
            {isPending ? (
              <LoadingBTN message="Saving..." />
            ) : (
              <>
                <Save />
                Save
              </>
            )}
          </Button>
        </div>
      </section>
    </Card>
  );
}
