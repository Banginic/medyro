"use client";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PharmacyType } from "@/features/pharmacy/types";
import { LocateFixed, MapPin,  } from "lucide-react";
import { useState } from "react";
import GetCurrentLocation from "./GetCurrentLocation";

const DynamicMapForm = dynamic(
  () => import("@/features/map/forms/MapForm"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-lg bg-muted">
        Loading map...
      </div>
    ),
  },
);

function MapSection({ pharmacy }: { pharmacy: PharmacyType }) {
  const [showForm, setForm] = useState(false);
  const [showForm2, setForm2] = useState(false);

  return (
    <div className="border p-4 rounded-md   mx-auto">
      <h2 className="font-semibold card-title mb-4">Map & Location</h2>

      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <div className="flex flex-col gap-1.5  w-full">
          <Label>Latitude</Label>
          <Input value={pharmacy.latitude ?? "0.00000"} readOnly />
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label>Longitude</Label>
          <Input value={pharmacy.longitude ?? "0.00000"} readOnly />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-8 ">
        <div className="flex gap-4">
          <Button
            onClick={() => setForm2(true)}
            type="button"
            size={"sm"}
            variant={"secondary"}
          >
            <LocateFixed />
            Use current location
          </Button>

          <Button
            onClick={() => setForm(true)}
            type="button"
            size={"sm"}
            variant={"secondary"}
          >
            <MapPin />
            Update map
          </Button>
        </div>
      </div>

      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 h-screen grid place-items-center py-8">
            <DynamicMapForm closeForm={setForm} />
          </div>
        )}
        {showForm2 && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 h-screen grid place-items-center py-8">
            <GetCurrentLocation closeForm={setForm2} />
          </div>
        )}
      </>
    </div>
  );
}

export default MapSection;
