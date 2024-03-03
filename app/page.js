"use client"
import "leaflet/dist/leaflet.css";
import Map from "./components/Map.js"; // Assuming Map.js is in the same directory
import NavBar from "./components/navbar.js";
import NewsBar from "./components/newsTab.js";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Map />
      <NewsBar />
    </div>
  );
}