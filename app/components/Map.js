"use client"
import React, { useEffect, useState, useRef } from 'react';

import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";



const data = [
  {
    "label": "Ads",
    "value": 32
  },
  {
    "label": "Subscriptions",
    "value": 45
  }
];

const data2 = [
  {
    "label": "Ads",
    "value": 32
  },
  {
    "label": "Subscriptions",
    "value": 45
  },
  {
    "label": "Subscriptions",
    "value": 23
  }
];

export default function Map() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [ownerEmissions, setOwnerEmissions] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchEmissionsData = async () => {
      try {
        // Fetch emissions data for North American countries
        const responseNorthAmerica = await fetch('https://api.climatetrace.org/v4/assets?continent=NA');
        const { assets: assetsNorthAmerica } = await responseNorthAmerica.json();
  
        // Fetch emissions data for Asian countries
        const responseAsia = await fetch('https://api.climatetrace.org/v4/assets?continent=AS');
        const { assets: assetsAsia } = await responseAsia.json();
  
        // Combine emissions data for North America and Asia
        const allAssets = [...assetsNorthAmerica, ...assetsAsia];
  
        // Create GeoJSON features for each emissions source
        const features = allAssets.map(source => {
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
              coordinates: [source.Centroid.Geometry[0], source.Centroid.Geometry[1]] // Extract longitude and latitude
            },
            properties: {
              name: source.Name,
              province: source.Country,
              co2_2022,
              owners: source.Owners
            }
          };
        });
  
        setGeojsonFeatures(features);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emissions data:', error);
        setLoading(false);
      }
    };
  
    fetchEmissionsData()
    
    ;
  }, []);
  
  const handleFeatureClick = async (feature) => {
    try {
      // Extracting coordinates of the clicked feature
      const { coordinates } = feature.geometry;
      const [longitude, latitude] = coordinates;
  
      // Fetching emissions data for the clicked coordinates
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
      const totalEmissions = parseFloat(co2Emissions) + parseFloat(ch4Emissions);
      const ownerPercentageEmissions = selectedAsset.Owners.map(owner => ({
        label: `${owner.CompanyName} - Percentage Emissions`,
        value: ((parseFloat(owner.PercentageOfInterestCompany) / 100) * totalEmissions).toFixed(2)
      }));
      setOwnerEmissions(ownerPercentageEmissions);
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
  // UseEffect to update the chart data when selectedData changes
  useEffect(() => {
    // Log the selectedData state to verify
    console.log('Selected Data:', selectedData);
  
    // Update chart data here using selectedData
  }, [selectedData]);
  

  const SearchField = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();
    
    // Create GeoSearchControl with green dot marker
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '470px' }} ref={mapRef} worldCopyJump={true}  
          maxBounds={[
            [null, -180], // No restriction on the left
            [null, 180],  // No restriction on the right
            [90, -180],   // Top Left
            [-90, 180]    // Bottom Right
          ]}>
            <TileLayer 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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
            <SearchField/>
          </MapContainer>
        )}

        <div className="flex justify-center"> 
          <div className='flex'>
            <div className='ml-[150px] bg-grey rounded-lg shadow-lg  w-100 h-50px' >
            <Doughnut
                data={{
                  labels: selectedData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Emissions",
                      data: selectedData.map((data) => data.value),
                      backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                      borderColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Emission Data",
                    },
                  },
                }}
                />
            </div>
            <div className='mr-[150px] m-10 bg-grey rounded-lg shadow-lg p-4 w-100 h-50px'>
            <Bar
              data={{
                labels: ownerEmissions.map((data) => data.label),
                datasets: [
                  {
                    label: "Count",
                    data: ownerEmissions.map((data) => data.value),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
              }}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>

  );
}