"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import L from 'leaflet'; 

import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'; // Import Leaflet Locate Control CSS
import 'leaflet.locatecontrol'; // Import Leaflet Locate Control JS
import AirportData from './Airports.json'; // Import Airport data

const MapRouting = () => {
  const [startWaypoint, setStartWaypoint] = useState(null);

  return (
    <div>
      <MapContainer center={[20, 0]} zoom={6}>
        <TileLayer 
          attribution='&copy; <a href=7"https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
        />
        <Routing startWaypoint={startWaypoint} />
        <LeafletLocateControl setStartWaypoint={setStartWaypoint} />
      </MapContainer>
    </div>
  );
};

const LeafletLocateControl = ({ setStartWaypoint }) => {
  const map = useMap();

  useEffect(() => {
    const locateControl = L.control.locate({
      position: 'topleft',
      drawCircle: true,
      drawMarker: true,
      showPopup: false,
      strings: {
        title: 'Show me where I am',
      },
    }).addTo(map);

    map.on('locationfound', (e) => {
      const { lat, lng } = e.latlng;
      const startWaypoint = L.latLng(lat, lng);
      setStartWaypoint(startWaypoint); // Update startWaypoint state with location found by LeafletLocateControl
    });

    return () => {
      map.removeControl(locateControl);
    };
  }, [map, setStartWaypoint]);

  return null;
};

const Routing = ({ startWaypoint }) => {
  const map = useMap();

  useEffect(() => {
    
      L.Routing.control({
        waypoints: [
          startWaypoint, // Use the location found by LeafletLocateControl as the starting waypoint
        ],
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        createMarker: function(i, waypoint, n) {
          return L.circleMarker(waypoint.latLng, {
            radius: 5,
            color: 'purple',
            fillColor: '#800080',
            fillOpacity: 0.7
          });
        },
        geocoder: L.Control.Geocoder.nominatim()
      }).addTo(map);

  }, [map, startWaypoint]);

  return null;
};


export default MapRouting;