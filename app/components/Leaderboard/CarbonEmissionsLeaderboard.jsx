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
        const sortedData = data.sort((a, b) => a.rank - b.rank);
        setCountriesEmissions(sortedData); // Sort the countries by emissions before setting state
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed right-0 top-[550px] z-50">
      <button
        className="btn mb-0 bg-off-black border-light-green border-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Show Leaderboard" : "Hide Leaderboard"}
      </button>
      {!isCollapsed && (
        <div className="max-h-64 overflow-y-auto shadow-lg rounded-lg bg-off-black border-light-green border-l-2 border-y-2">
          <table className="table w-full">
            <thead className="text-white">
              <tr>
                <th colspan="3" className="text-center">
                  CO2e Emissions in Last 20 Years
                </th>
              </tr>
              <tr className="border-[#E6CF58] border-y-2">
                <th>Rank</th>
                <th>Country</th>
                <th>Emissions (Tonnes CO2e)</th>
              </tr>
            </thead>
            <tbody>
              {countriesEmissions.map((country, index) => (
                <tr key={index}>
                  <th>{country.rank}</th>
                  <td>{country.country}</td>
                  <td>{country.emissions.co2e_20yr.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarbonEmissionsLeaderboard;
