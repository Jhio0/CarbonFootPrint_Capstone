"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L, { Icon } from 'leaflet'; // Import Icon from leaflet
import { useEffect } from 'react';

// Define your GeoJSON data
const geojsonFeature = {
  "type": "Feature",
  "properties": {
    "name": "Coors Field",
    "amenity": "Baseball Stadium",
    "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-104.99404, 39.75621]
  }
};

export default function Home() {
  // Define custom marker icon
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38] // size of the icon
  });

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={4} style={{ width: '100%', height: '600px' }}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON 
        data={geojsonFeature}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }}
        filter={(feature) => feature.properties.name !== "Busch Field"}
        pointToLayer={(feature, latlng) => (
          L.marker(latlng, { icon: customIcon }) // Use custom icon for markers
        )}
      />
    </MapContainer>
  );
}