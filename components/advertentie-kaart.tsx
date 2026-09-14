"use client";

import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import { coordsVoorStad } from "@/lib/steden";
import "leaflet/dist/leaflet.css";

export function AdvertentieKaart({ stad }: { stad: string }) {
  const positie = coordsVoorStad(stad);

  return (
    <MapContainer
      center={positie}
      zoom={13}
      minZoom={8}
      maxZoom={18}
      scrollWheelZoom
      dragging
      doubleClickZoom
      className="advertentie-kaart size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={positie}
        radius={8}
        pathOptions={{
          color: "#1d5fd1",
          weight: 2,
          fillColor: "#1d5fd1",
          fillOpacity: 0.9,
        }}
      />
    </MapContainer>
  );
}
