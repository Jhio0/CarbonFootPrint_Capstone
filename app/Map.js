"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

export default function Map() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const features = allAssets.map(source => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [source.Centroid.Geometry[0], source.Centroid.Geometry[1]] // Extract longitude and latitude
          },
          properties: {
            name: source.Name,
            province: source.Country,
            co2: source.Emissions[0]?.['2021']?.find(emission => emission.co2)?.co2 // Extract CO2 emission for 2021
          }
        }));
  
        setGeojsonFeatures(features);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emissions data:', error);
        setLoading(false);
      }
    };
  
    fetchEmissionsData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '600px' }}>
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
              const { name, province, co2 } = feature.properties;
              layer.bindPopup(`<b>${province}: ${name}</b><br>CO2 Emission (2021): ${co2 || 'N/A'} Tons`);
            }}
          />
        </MapContainer>
      )}
    </div>
  );
}