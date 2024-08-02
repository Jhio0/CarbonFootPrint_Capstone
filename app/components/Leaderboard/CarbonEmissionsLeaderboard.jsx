"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
const CarbonEmissionsLeaderboard = () => {
  const [countriesEmissions, setCountriesEmissions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div>
     <button className="btn mb-2" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FontAwesomeIcon icon={faTrophy} className={!isCollapsed ? 'text-red-500' : ''} />
      </button>

      {!isCollapsed && (
        <div className="max-h-64 overflow-y-auto shadow-lg rounded-lg bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th colspan="3" className="text-center">
                  CO2e Emissions in Last 20 Years
                </th>
              </tr>
              <tr>
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