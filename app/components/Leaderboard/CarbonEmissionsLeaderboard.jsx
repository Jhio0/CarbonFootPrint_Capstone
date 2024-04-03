"use client"

import React, { useEffect, useState } from 'react';
import EmissionsGraphs from './EmissionsGraphs';


export default function CarbonEmissionsLeaderboard() {
    const [loading, setLoading] = useState(true);
    const [emissionsData, setEmissionsData] = useState([]);
    const [startYear, setStartYear] = useState('2018');
    const [continent, setContinent] = useState('Asia'); // [Africa, Americas, Asia, Europe, Oceania

    // Import the i18n-iso-countries package - for country name to code conversion
    // var countries = require("i18n-iso-countries");

    const handleSelectChange = (event) => {
        setStartYear(event.target.value);
    };

    useEffect(() => {
        const fetchCountryCode = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`); // Fetch the data
        
                if (!response.ok) {
                    // Get the response text which might include an error message from the server
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
                }
        
                const data = await response.json();
                console.log(data);
                const cca3Array = data.map(country => country.cca3);
                return cca3Array;
            } catch (error) {
                console.error("There was a problem fetching the countries data:", error);
            }
        };
        
    
        const fetchDataForCountry = async (countryCode) => {
            try {
                const response = await fetch(`https://api.climatetrace.org/v4/country/emissions?&since=${startYear}&countries=${countryCode}`);
                if (!response.ok) {
                    // Correctly reference `response` instead of `res` to log the error
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}, Body: ${errorText}`);
                }
                const data = await response.json();
        
                if (data && data.length > 0) {
                    return {
                        country: countryCode,
                        emissions: data[0].emissions.co2, // Make sure this data path is correct
                    };
                } else {
                    // Handle the case where data might not be in the expected format or is empty
                    throw new Error(`No emissions data returned for country code: ${countryCode}`);
                }
            } catch (error) {
                console.error(`Error fetching data for country code ${countryCode}:`, error);
                // Return a fallback object or handle it as appropriate
                return { country: countryCode, emissions: null };
            }
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
                Carbon Emissions Leaderboard
            </h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>
                        <EmissionsGraphs />
                    </div>
                    <div>
                    <select value={startYear} onChange={handleSelectChange} className='dropdown'>
                        {[...Array(2023 - 2015)].map((_, index) => (
                            <option key={index} value={2015 + index}>
                                {2015 + index}
                            </option>
                        ))}
                    </select>
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
                                    {item.country}: {item.emissions} tons of CO2
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
