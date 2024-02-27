"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet'; // Import Icon from leaflet
import { useEffect, useState } from 'react';

export default function Map() {
  const [geojsonFeature, setGeojsonFeature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json?country=US&begin=2019-05-01&end=2019-05-04');
        const data = await response.json();

        // Transform fetched data to match geojsonFeature structure
        const transformedData = {
          type: "FeatureCollection",
          features: data.features.map(feature => ({
            type: "Feature",
            geometry: feature.geometry,
            properties: {
              timestamp: feature.properties.timestamp,
              value: feature.properties.value
            }
          }))
        };

        setGeojsonFeature(transformedData);
        setLoading(false); // Set loading to false when data fetching is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <MapContainer center={[48.8566, 2.3522]} zoom={4} style={{ width: '100%', height: '600px' }}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          {geojsonFeature && (
            <GeoJSON 
              data={geojsonFeature}
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.timestamp) {
                  layer.bindPopup(`Timestamp: ${feature.properties.timestamp}<br>Value: ${feature.properties.value}`);
                }
              }}
              pointToLayer={(feature, latlng) => (
                L.circleMarker(latlng, {
                  radius: 5,
                  color: 'red',
                  fillColor: '#f03',
                  fillOpacity: 0.5,
                })
              )}
            />
          )}
        </MapContainer>
      )}
    </div>
  );
}