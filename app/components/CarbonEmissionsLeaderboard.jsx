"use client"

import React, { useEffect, useState } from 'react';

export default function CarbonEmissionsLeaderboard() {
    const [loading, setLoading] = useState(true);
    const [emissionsData, setEmissionsData] = useState([]);
    const [startYear, setStartYear] = useState('2018');
    const [endYear, setEndYear] = useState('2020');
    const countryDataArray = [];

    // List of countries you want to include in the leaderboard
    const countries = ['CAN', 'USA', 'CHN', 'IND', 'RUS', 'BRA']; // Example country ISO codes
    const startDate = '2021';
    const endDate = '2020';
    

    useEffect(() => {
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
                const promises = countries.map(fetchDataForCountry);
                const results = await Promise.all(promises);

                // Sort by emissions in descending order
                results.sort((a, b) => b.emissions - a.emissions);

                setEmissionsData(results);
            } catch (error) {
                console.error('Error fetching emissions data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startYear]);

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
                        min={2010}
                        max={2022}
                        value={startYear}
                        className='range'
                        onChange={(e) => setStartYear(e.target.value)}
                        />
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
