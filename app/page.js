"use client"
import "leaflet/dist/leaflet.css";
import NavBar from "./components/navbar.js";
import NewsBar from "./components/newsTab.js";

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import("./components/Map.js"), {
  ssr: false
});

// Use MapWithNoSSR in your component or page


export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
      {/* hello test */}
      <NewsBar />
    </div>
  );
}