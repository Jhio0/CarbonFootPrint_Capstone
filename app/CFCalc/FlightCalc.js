"use client"
import React, { useState } from "react";
import airportsData from "./Airports.json"; // Ensure this path is correct

// Function to calculate distance between two lat/lon points in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const FlightsCalc = ({ flights = [], setFlights, onFlightEmissionsChange }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const addFlight = () => {
    const originAirport = airportsData.find(
      (airport) => airport.iata_code === origin
    );
    const destinationAirport = airportsData.find(
      (airport) => airport.iata_code === destination
    );

    if (!originAirport || !destinationAirport) {
      alert("Invalid IATA code(s). Please check and try again.");
      return;
    }

    const distance = calculateDistance(
      originAirport.latitude_deg,
      originAirport.longitude_deg,
      destinationAirport.latitude_deg,
      destinationAirport.longitude_deg
    );
    const flightTime = distance / 800; // Assuming average speed
    const emissions = flightTime * 250; // 250 kg of CO2 per hour

    const newFlight = { origin, destination, emissions };
    const updatedFlights = [...flights, newFlight];
    setFlights(updatedFlights);

    const totalEmissions = updatedFlights.reduce(
      (acc, flight) => acc + flight.emissions,
      0
    );
    onFlightEmissionsChange(totalEmissions);
    setOrigin("");
    setDestination("");
  };

  const removeFlight = (index) => {
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights);

    const totalEmissions = updatedFlights.reduce(
      (acc, flight) => acc + flight.emissions,
      0
    );
    onFlightEmissionsChange(totalEmissions);
  };

  return (
    <div>
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
        placeholder="From (IATA Code)"
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value.toUpperCase())}
        placeholder="To (IATA Code)"
      />
      <br />
      <button onClick={addFlight}>Add Flight</button>
      {flights.map((flight, index) => (
        <div key={index}>
          Flight from {flight.origin} to {flight.destination}:{" "}
          {flight.emissions.toFixed(2)} kg CO2
          <button onClick={() => removeFlight(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FlightsCalc;
