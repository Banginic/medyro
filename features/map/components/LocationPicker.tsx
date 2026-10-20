"use client";
import dynamic from "next/dynamic";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationPickerProps = {
  value: Coordinates | null;
  onChange: (coordinates: Coordinates) => void;
};

function MapClickHandler({
  onChange,
}: {
  onChange: LocationPickerProps["onChange"];
}) {
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

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  const initialPosition: [number, number] = [
    value?.latitude ?? 4.0511,
    value?.longitude ?? 9.7679,
  ];

  return (
    <div className="space-y-3">
      <div className="h-53 overflow-hidden rounded-lg w-full">
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

          <MapClickHandler onChange={onChange} />

          {value && <Marker position={[value.latitude, value.longitude]} />}
        </MapContainer>
      </div>

      {value ? (
        <div className="text-sm">
          <p>Latitude: {value.latitude.toFixed(6)}</p>
          <p>Longitude: {value.longitude.toFixed(6)}</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click on the map to select your pharmacy's location.
        </p>
      )}
    </div>
  );
}
