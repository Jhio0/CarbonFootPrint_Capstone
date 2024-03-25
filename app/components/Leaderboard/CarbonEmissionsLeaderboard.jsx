"use client";

import React, { useState, useEffect } from "react";

const CarbonEmissionsLeaderboard = () => {
  const [countriesEmissions, setCountriesEmissions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Replace `your_endpoint` with the actual endpoint from Climate Trace API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.climatetrace.org/v4/country/emissions?&countries=all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sortedData = data.sort((a, b) => b.emissions - a.emissions);
        setCountriesEmissions(sortedData); // Sort the countries by emissions before setting state
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed right-0 top-3/4 z-50">
      <button className="btn mb-2" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "Show Leaderboard" : "Hide Leaderboard"}
      </button>
      {!isCollapsed && (
        <div className="max-h-96 w-64 overflow-y-scroll bg-white shadow-lg rounded-lg p-4 text-black">
          <h2 className="text-lg font-semibold mb-2 text-black">
            Carbon Emissions Leaderboard
          </h2>
          <ul>
            {countriesEmissions.map((country, index) => (
              <li key={index}>
                Rank{country.rank} {country.country}: {country.emissions[0]}
                MtCO2
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarbonEmissionsLeaderboard;
