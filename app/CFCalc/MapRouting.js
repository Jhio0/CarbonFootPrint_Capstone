"use client"
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-control-geocoder';

import 'leaflet-easybutton/src/easy-button'
import 'leaflet-easybutton/src/easy-button.css'
import "font-awesome/css/font-awesome.min.css";
import './routingstyling.css'; // Import OSM Buildings



const MapRouting = () => {
  const [startWaypoint, setStartWaypoint] = useState(null);
  const [distance, setDistance] = useState(null); // State to store distance

  
  return (
    <div>
      <MapContainer center={[20, 0]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
        />
        <Routing startWaypoint={startWaypoint} setDistance={setDistance}/>
        <LeafletLocateControl setStartWaypoint={setStartWaypoint} />
      </MapContainer>
    </div>
  );
};

const LeafletLocateControl = ({ setStartWaypoint }) => {
  const map = useMap();
  const [startInputValue, setStartInputValue] = useState('');
  const locateControlRef = useRef(null);

  useEffect(() => {
    if (!locateControlRef.current) {
      // Add the locate control to the map
      const locateControl = L.control
        .locate({
          position: 'topleft',
          drawCircle: false,
          drawMarker: false,
          showPopup: false,
          strings: {
            title: 'Show me where I am',
          },
          locateOptions: {
            enableHighAccuracy: true,
          },
        })
        .addTo(map);

      // Store the locate control instance in the ref
      locateControlRef.current = locateControl;
    }
    map.on('locationfound', (e) => {
      const { lat, lng } = e.latlng;
      const startWaypoint = L.latLng(lat, lng);
      setStartWaypoint(startWaypoint);
      setStartInputValue(`${lat},${lng}`); // Update start input value with located coordinates
    });

  }, [map, setStartWaypoint]);
  
  return null;
};

const Routing = ({ startWaypoint,  setDistance }) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);
  const [isRoutingControlVisible, setIsRoutingControlVisible] = useState(true);

  useEffect(() => {
    const routing = L.Routing.control({
      createMarker: function (i, waypoint, n) {
        const marker = L.circleMarker(waypoint.latLng, {
          radius: 5,
          color: 'purple',
          fillColor: '#800080',
          fillOpacity: 0.7,
        });

        // Add popup to the marker
        marker.bindPopup(waypoint.name);

        return marker;
      },
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ className: 'animate' }] // Adding animate class
      },
      waypoints: startWaypoint ? [startWaypoint] : [],
      geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    // Event listener for routesfound event
    routing.on('routesfound', function(e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      
      // Extract distance in kilometers
      const distanceInKm = summary.totalDistance / 1000;

      // You can save the distance to a variable here or perform any other action
      console.log('Distance:', distanceInKm.toFixed(2), 'kilometers');
      setDistance(distanceInKm);
    });


    return () => {
      if (routing) {
        map.removeControl(routing);
      }
    };
  }, [map, startWaypoint]);

  

  return null;
};

export default MapRouting;