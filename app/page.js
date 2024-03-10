"use client"
import "leaflet/dist/leaflet.css";
import Map from "./Map.js"; // Assuming Map.js is in the same directory
import CarbonEmissionsLeaderboard from "./components/Leaderboard/CarbonEmissionsLeaderboard.jsx";
import Chatbot from "./components/Chatbot/Chatbot.jsx";

export default function Home() {
  return (
    <div>
      {/* <Map />  */}
      <Chatbot />
      {/* <CarbonEmissionsLeaderboard /> */}
    </div>
  );
}