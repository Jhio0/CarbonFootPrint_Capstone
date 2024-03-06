"use client"

import React, { useEffect, useState } from 'react';


export default function CarbonEmissionsLeaderboard() {
    const [loading, setLoading] = useState(true);
    const [emissionsData, setEmissionsData] = useState([]);
    const [startYear, setStartYear] = useState('2018');
    const [continent, setContinent] = useState('europe'); // [Africa, Americas, Asia, Europe, Oceania

    // Import the i18n-iso-countries package - for country name to code conversion
    //  use this api: https://api.first.org/data/v1/countries
    // var countries = require("i18n-iso-countries");


    useEffect(() => {

        const fetchCountryCode = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`); // Fetch the data
        
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                // Parse the JSON response
                const data = await response.json();
                console.log(data);
                // Do something with the data
                const cca3Array = data.map(country => country.cca3);
                return cca3Array;
            } catch (error) {
                // Handle any errors that occurred during the fetch
                console.error("There was a problem fetching the countries data:", error);
            }
        };
    

        const fetchDataForCountry = async (countryCode) => {
            const url = `https://api.climatetrace.org/v4/country/emissions?&since=${startYear}&countries=${countryCode}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
          }
            const data = await response.json();
            // console.log(data);
            return {
                country: data[0].country, // Access the first element of the array
                emissions: data[0].emissions.co2, // Access the CO2 emissions from the first element
            };            
        };

        const fetchData = async () => {
            try {
                // Fetch data for all countries
                const cca3Array = await fetchCountryCode();
                if (cca3Array) {
                    const promises = cca3Array.map(fetchDataForCountry);
                    const results = await Promise.all(promises);
                    results.sort((a, b) => b.emissions - a.emissions);
                    setEmissionsData(results);
                } else {
                    throw new Error('Failed to fetch country codes');
                }
            } catch (error) {
                console.error('Error fetching emissions data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startYear, continent]);

    return (
        <div className='border-black border-4 p-20 bg-black w-full h-full'>
            <h1 className='text-2xl text-white'>
                Carbon Emissions Leaderboard (2020)
            </h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>
                        <input
                        type='range'
                        min={2015}
                        max={2022}
                        value={startYear}
                        className='range'
                        onChange={(e) => setStartYear(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                        value={continent}
                        onChange={(e) => setContinent(e.target.value)}
                        className='select'
                        >
                            <option value='Africa'>Africa</option>
                            <option value='Americas'>Americas</option>
                            <option value='Asia'>Asia</option>
                            <option value='europe'>Europe</option>
                            <option value='Oceania'>Oceania</option>
                        </select>
                    </div>
                    <div>
                        <ol>
                            {emissionsData.map((item, index) => (
                                <li key={index} className='text-white '>
                                    {item.country}: {item.emissions.toLocaleString()} tons of CO2
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
