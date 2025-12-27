"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// const position: [number, number] = [51.505, -0.09];

type Props = {
  lat: number,
  lng: number,
  nome: string
}

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


export default function Map({ lat, lng, nome }: Props) {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      className="z-1"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={markerIcon}>
        <Popup>{nome}</Popup>
      </Marker>
    </MapContainer>
  );
}
