/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

import { countryCodeToName, countryCodes } from '../components/items/countryUtils';
import 'leaflet-easybutton/src/easy-button'
import 'leaflet-easybutton/src/easy-button.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';

export default function MapReport() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [geojsonFeaturesCountry, setGeojsonFeaturesCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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
        console.log(`${countryName} - CO2 Emissions (Tons):`, countryCo2Emissions);
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
  
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: true,
        showPopup: false,
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
  
      // Add event listener to the search control to log coordinates
      map.on('geosearch/showlocation', (event) => {
        console.log(`Selected location: Latitude ${event.location.y}, Longitude ${event.location.x}`);
      });
  
      // Add GeoSearchControl to the map
      map.addControl(searchControl);
  
      return () => {
        // Remove GeoSearchControl and event listener when component unmounts
        map.removeControl(searchControl);
        map.off('geosearch/showlocation');
      };
    }, [map, provider]);
  
    return null;
  };

  // Function to create a marker on map click
  const createMarkerOnClick = (evt) => {
    L.marker([evt.latlng.lat, evt.latlng.lng], markerOptions).addTo(mapRef.current);
  };

  // Define marker options
  const markerOptions = {
    draggable: false
  };

  // Toggle button configuration
  const toggle = L.easyButton({
    states: [{
      stateName: 'enable-markers',
      icon: "'<div><FontAwesomeIcon icon={faMapMarked} className='bg-black w-full h-full' /></div>'",
      title: 'Enable markers on click',
      onClick: function(control) {
        control.state('disable-markers');
        mapRef.current.on('click', createMarkerOnClick);
      }
    }, {
      stateName: 'disable-markers',
      icon: "'<div><FontAwesomeIcon icon={faMapMarked} className='bg-black w-full h-full' /></div>'",
      title: 'Disable markers on click',
      onClick: function(control) {
        control.state('enable-markers');
        mapRef.current.off('click', createMarkerOnClick);
      }
    }]
  });

  useEffect(() => {
    if (mapRef.current) {
      toggle.addTo(mapRef.current);
    }
  }, [mapRef.current]); // Add the toggle button to the map

  
  
  return (
      <div >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '475px' }} ref={mapRef} worldCopyJump={true}  
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
        )}
        <div><FontAwesomeIcon icon={faMapMarked} className='bg-black w-20px h-20px' /></div>
      </div>

  );
}

//import 'leaflet-easybutton/src/easy-button'