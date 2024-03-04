"use client"
import React, { useEffect, useState, useRef } from 'react';

import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import markerImage from '../img/marker.png';
export default function Map() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
    fetchEmissionsData();
  }, []);

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '600px' }} ref={mapRef} worldCopyJump={true}  
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
              })
            )}
            onEachFeature={(feature, layer) => {
              const { name, province, co2_2022, owners } = feature.properties;
              const ownerInfo = owners ? owners.map(owner => `<li>${owner.CompanyName}: ${owner.PercentageOfInterestCompany}%</li>`).join('') : 'None';
              layer.bindPopup(`<b>${name}</b><br><b>Province:</b> ${province}<br><ul>Owners:<br>${ownerInfo}</ul><br>CO2 Emission (2022): ${co2_2022} Tons`);
            }}
          />
          <SearchField/>
        </MapContainer>
      )}
    </div>
  );
}