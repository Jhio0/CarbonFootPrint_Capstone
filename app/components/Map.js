/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

import DoughnutChart from './Chart/Doughnut.js';
import BarChart from './Chart/BarChart.js';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

import { countryCodeToName, countryCodes } from './items/countryUtils';




export default function Map() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [geojsonFeaturesCountry, setGeojsonFeaturesCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [ownerEmissions, setOwnerEmissions] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new OpenStreetMapProvider();
        // Fetch emissions data for North American countries
        const responseNorthAmerica = await fetch('https://api.climatetrace.org/v4/assets?continent=NA');
        const { assets: assetsNorthAmerica } = await responseNorthAmerica.json();
  
        // Define a function to fetch emissions data for a single country with a delay
        const fetchEmissionsDataWithDelay = async (countryCode) => {
          const response = await fetch(`https://api.climatetrace.org/v4/country/emissions?&countries=${countryCode}`);
          const emissionsData = await response.json();
          
          // Convert country code to full country name
          const countryName = countryCodeToName(countryCode);
  
          const searchResult = await provider.search({ query: countryName });
          let coordinates = [0, 0]; // Default coordinates
          if (searchResult.length > 0) {
            coordinates = [searchResult[0].x, searchResult[0].y]; // Extracting longitude and latitude
          }
  
          return { countryCode, countryName, coordinates, emissionsData };
        };
  
        // Fetch carbon emissions data for each North American country with a delay
        const emissionsResults = [];
        for (const countryCode of countryCodes) {
          const result = await fetchEmissionsDataWithDelay(countryCode);
          emissionsResults.push(result);
          // Introduce a delay of 1 second before making the next request
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
  
        // Create GeoJSON features for emissions data
        const emissionsFeatures = assetsNorthAmerica.map(source => {
          const { Emissions } = source;
          let co2_2022 = 'N/A';
          if (Emissions) {
            for (let i = 0; i < Emissions.length; i++) {
              if (Emissions[i]['2022']) {
                co2_2022 = Emissions[i]['2022'].find(emission => emission.co2)?.co2 || 'N/A';
                break;
              }
            }
          }
  
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [source.Centroid.Geometry[0], source.Centroid.Geometry[1]]
            },
            properties: {
              name: source.Name,
              province: source.Country,
              co2_2022,
              owners: source.Owners
            }
          };
        });
  
        // Create GeoJSON features for carbon emissions data
        const carbonEmissionFeatures = emissionsResults.map(result => {
          const { countryCode, countryName, coordinates, emissionsData } = result;
          if (emissionsData.length > 0) {
            const { emissions } = emissionsData[0];
            const co2Emissions = emissions?.co2 || 'N/A'; // Extract CO2 emissions
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coordinates // Use longitude and latitude
              },
              properties: {
                countryCode: countryCode,
                countryName: countryName,
                co2Emissions: co2Emissions // Assign CO2 emissions
              }
            };
          } else {
            return null;
          }
        }).filter(feature => feature !== null);
  
        // Merge features from both emissions data and carbon emissions data
        const mergedFeatures = [...emissionsFeatures];
  
        setGeojsonFeatures(mergedFeatures);
        setGeojsonFeaturesCountry(carbonEmissionFeatures);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emissions data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  
  const handleFeatureClick = async (feature) => {
    try {
      // Extracting coordinates of the clicked feature
      const { coordinates } = feature.geometry;
      const [longitude, latitude] = coordinates;
  
      // Fetching emissions data for the clicked coordinates with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch(`https://api.climatetrace.org/v4/assets?latitude=${latitude}&longitude=${longitude}`);
      const { assets } = await response.json();
  
      // Find the closest asset to the clicked coordinates
      const selectedAsset = findClosestAsset(assets, longitude, latitude);
  
      // Extracting CO2 and CH4 emissions for the year 2022
      const emissions2022 = selectedAsset.Emissions?.find(emission => emission["2022"]);
      const co2Emissions = emissions2022?.["2022"]?.find(emission => emission.co2)?.co2 || 'N/A';
      const ch4Emissions = emissions2022?.["2022"]?.find(emission => emission.ch4)?.ch4 || 'N/A';
  
      // Update selectedData state with the fetched emissions data for the selected asset
      setSelectedData([
        { label: `${selectedAsset.name} - CO2 Emissions (Tons)`, value: co2Emissions },
        { label: `${selectedAsset.name} - CH4 Emissions (Tons)`, value: ch4Emissions }
      ]);
  
      // Update ownerEmissions state with the percentage emissions for each owner
      if (selectedAsset.Owners && selectedAsset.Owners.length > 0) {
        const totalEmissions = parseFloat(co2Emissions) + parseFloat(ch4Emissions);
        const ownerPercentageEmissions = selectedAsset.Owners.map(owner => ({
          label: `${owner.CompanyName} - Percentage Emissions`,
          value: ((parseFloat(owner.PercentageOfInterestCompany) / 100) * totalEmissions).toFixed(2)
        }));
        setOwnerEmissions(ownerPercentageEmissions);
      } else {
        // If no owners, set ownerEmissions to an empty array
        setOwnerEmissions([]);
      }
  
      // If the clicked feature is a country, fetch emissions data for that country and update selectedData
      if (feature.properties.countryCode && feature.properties.countryName) {
        const { countryCode, countryName } = feature.properties;
  
        // Fetch emissions data for the clicked country with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const countryResponse = await fetch(`https://api.climatetrace.org/v4/country/emissions?&countries=${countryCode}`);
        const countryEmissionsData = await countryResponse.json();
  
        // Extract CO2 emissions for the clicked country
        const countryCo2Emissions = countryEmissionsData.length > 0 ? countryEmissionsData[0]?.emissions?.co2 || 'N/A' : 'N/A';
  
        // Update selectedData state with the fetched CO2 emissions data for the selected country
        setSelectedData([
          ...selectedData,
          { label: `${countryName} - CO2 Emissions (Tons)`, value: countryCo2Emissions }
        ]);
      }
    } catch (error) {
      console.error('Error fetching emissions data:', error);
    }
  };

  // Function to find the closest asset to the clicked coordinates
  const findClosestAsset = (assets, longitude, latitude) => {
    let minDistance = Number.MAX_VALUE;
    let closestAsset = null;
  
    assets.forEach(asset => {
      const assetLongitude = asset.Centroid.Geometry[0];
      const assetLatitude = asset.Centroid.Geometry[1];
      const distance = Math.sqrt((assetLongitude - longitude) ** 2 + (assetLatitude - latitude) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestAsset = asset;
      }
    });
  
    return closestAsset;
  };

  

  const SearchField = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();

  
    // Create GeoSearchControl with green dot marker
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      classNames: {
        input: 'search-input',
        container: 'search-container',
      },
      marker: {
        // Use green dot as marker
        icon: L.divIcon({
          className: 'green-dot',
          html: '<div style="background-color: green; width: 10px; height: 10px; border-radius: 50%;"></div>',
          iconSize: [10, 10]
        }),
        draggable: false,
      },
      popupFormat: ({ query, result }) => result.label,
      resultFormat: ({ result }) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: false,
      searchLabel: 'Enter address',
      keepResult: false,
      updateMap: true,
    });
  
    // Add GeoSearchControl to the map
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map, searchControl]);
  
    return null;
  };

  
  
  return (
    <div>
      <div className='flex flex-col'>
        {loading ? (
          <div className='items-center justify-center'>
            <div className="spinner"></div>
          </div>
        ) : (

          <MapContainer center={[38, -97]} zoom={4}  ref={mapRef} worldCopyJump={true}  
          maxBounds={[
            [null, -180], // No restriction on the left
            [null, 180],  // No restriction on the right
            [90, -180],   // Top Left
            [-90, 180]    // Bottom Right
          ]}>
            <TileLayer 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
            />
            

            <GeoJSON 
              data={{
                type: "FeatureCollection",
                features: geojsonFeatures
              }}
              pointToLayer={(feature, latlng) => (
                L.circleMarker(latlng, {
                  radius: 5,
                  color: 'red',
                  fillColor: '#f03',
                  fillOpacity: 0.5,
                }).on('click', () => handleFeatureClick(feature)) 
              )}
              onEachFeature={(feature, layer) => {
                const { name, province, co2_2022, owners } = feature.properties;
                const ownerInfo = owners ? owners.map(owner => `<li>${owner.CompanyName}: ${owner.PercentageOfInterestCompany}%</li>`).join('') : 'None';
                layer.bindPopup(`<b>${name}</b><br><b>Province:</b> ${province}<br><ul>Owners:<br>${ownerInfo}</ul><br>CO2 Emission (2022): ${co2_2022} Tons`);
                layer.on('click', () => handleFeatureClick(feature));
              }}
            />
            <GeoJSON 
              data={{
                type: "FeatureCollection",
                features: geojsonFeaturesCountry
              }}
              pointToLayer={(feature, latlng) => (
                L.circleMarker(latlng, {
                  radius: 5,
                  color: 'purple',
                  fillColor: '#800080',
                  fillOpacity: 0.5,
                }).on('click', () => handleFeatureClick(feature)) 
              )}
              onEachFeature={(feature, layer) => {
                const { countryName, co2Emissions } = feature.properties;
                layer.bindPopup(`<b>Country:</b> ${countryName}<br><b>CO2 Emission:</b> ${co2Emissions} Tons`);
                layer.on('click', () => handleFeatureClick(feature));
              }}
            />
            {/* Overlaying content */}
              <div className="flex justify-center" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}> 
                <div className='flex flex-col'>
                  <div className='min-h-3/4 h-auto w-full bg-gray-400 flex justify-center items-center flex-wrap rounded-md
                      backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                      <div className='m-10 w-100%'>
                        <DoughnutChart selectedData={selectedData} />
                      </div>
                  </div>
                  <div className='min-h-3/4 h-auto w-full bg-gray-400 flex justify-center items-center flex-wrap rounded-md
                      backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                      <div className='m-10 w-100%'>
                        <BarChart ownerEmissions={ownerEmissions} />
                      </div>
                  </div>
                </div>
              </div>
            <SearchField/>
          </MapContainer>
        )}


          <div className='mb-20'>
            <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '490px' }} ref={mapRef} worldCopyJump={true}  
            maxBounds={[
              [null, -180], // No restriction on the left
              [null, 180],  // No restriction on the right
              [90, -180],   // Top Left
              [-90, 180]    // Bottom Right
            ]}>
              <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
              />
              

              <GeoJSON 
                data={{
                  type: "FeatureCollection",
                  features: geojsonFeatures
                }}
                pointToLayer={(feature, latlng) => (
                  L.circleMarker(latlng, {
                    radius: 5,
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                  }).on('click', () => handleFeatureClick(feature)) 
                )}
                onEachFeature={(feature, layer) => {
                  const { name, province, co2_2022, owners } = feature.properties;
                  const ownerInfo = owners ? owners.map(owner => `<li>${owner.CompanyName}: ${owner.PercentageOfInterestCompany}%</li>`).join('') : 'None';
                  layer.bindPopup(`<b>${name}</b><br><b>Province:</b> ${province}<br><ul>Owners:<br>${ownerInfo}</ul><br>CO2 Emission (2022): ${co2_2022} Tons`);
                  layer.on('click', () => handleFeatureClick(feature));
                }}
              />
              <GeoJSON 
                data={{
                  type: "FeatureCollection",
                  features: geojsonFeaturesCountry
                }}
                pointToLayer={(feature, latlng) => (
                  L.circleMarker(latlng, {
                    radius: 5,
                    color: 'purple',
                    fillColor: '#800080',
                    fillOpacity: 0.5,
                  }).on('click', () => handleFeatureClick(feature)) 
                )}
                onEachFeature={(feature, layer) => {
                  const { countryName, co2Emissions } = feature.properties;
                  layer.bindPopup(`<b>Country:</b> ${countryName}<br><b>CO2 Emission:</b> ${co2Emissions} Tons`);
                  layer.on('click', () => handleFeatureClick(feature));
                }}
              />
              <SearchField/>
            </MapContainer>
          </div>
        

        <div className="flex justify-center mb-20"> 
          <div className='flex'>
            <div className='ml-[150px] bg-grey rounded-lg shadow-lg  w-100 h-50px' >
              <DoughnutChart selectedData={selectedData} />
            </div>
            <div className='mr-[150px] m-10 bg-grey rounded-lg shadow-lg p-4 w-100%'>
              <BarChart ownerEmissions={ownerEmissions} />
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}