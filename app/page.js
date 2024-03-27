"use client";
import "leaflet/dist/leaflet.css";
import NavBar from "./components/navbar.js";
import NewsBar from "./components/newsTab.js";

import dynamic from "next/dynamic";
import { Chat } from "@mui/icons-material";
import CarbonEmissionsLeaderboard from "./components/Leaderboard/CarbonEmissionsLeaderboard.jsx";

const MapWithNoSSR = dynamic(() => import("./components/Map.js"), {
  ssr: false,
});

// Use MapWithNoSSR in your component or page

export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
      {/* <NewsBar /> */}
      <CarbonEmissionsLeaderboard />
    </div>
  );
}
