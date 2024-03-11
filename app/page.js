"use client"
import "leaflet/dist/leaflet.css";
import Map from "./src/components/Map.js"; // Assuming Map.js is in the same directory

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}