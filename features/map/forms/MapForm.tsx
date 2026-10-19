import { useState } from "react";
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
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { updateMap } from "../actions/updateMap";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type PropsType = {
  location: Coordinates | null;
  onChange: (coordinates: Coordinates) => void;
};



function MapClickHandler({ onChange }: { onChange: PropsType["onChange"] }) {
  useMapEvents({
    click(event) {
      onChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({ latitude: 4.0511, longitude: 9.7679 });

  const initialPosition: [number, number] = [
    location?.latitude ?? 4.0511,
    location?.longitude ?? 9.7679,
  ];

  function handleSubmitSuccess() {
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<PharmacyTypes, MapSchemaType>({
    mutationFn: updateMap,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
    handleSubmitSuccess,
  });

  function handleSubmit() {
    if (location) {
      mutate(location);
    }
  }

  return (
    <Card className="p-4 lg:p-8 w-[98%] max-w-xl mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4"
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
            <div className="h-73 overflow-hidden rounded-lg w-full">
              <MapContainer
                center={initialPosition}
                zoom={15}
                className="h-full w-full"
                scrollWheelZoom
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onChange={setLocation} />

                {location && (
                  <Marker position={[location.latitude, location.longitude]} />
                )}
              </MapContainer>
            </div>

            {location ? (
              <div className="text-sm">
                <p>Latitude: {location.latitude.toFixed(6)}</p>
                <p>Longitude: {location.longitude.toFixed(6)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on the map to select your pharmacy's location.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
            
              onClick={handleSubmit}
              disabled={isPending || location?.latitude === 4.0511}
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

export default MapForm;
