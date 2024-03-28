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
import './routingstyling.css';

const MapRouting = () => {
  const [startWaypoint, setStartWaypoint] = useState(null);

  return (
    <div>
      <MapContainer center={[20, 0]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

const Routing = ({ startWaypoint }) => {
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

    setRoutingControl(routing);

    return () => {
      if (routing) {
        map.removeControl(routing);
      }
    };
  }, [map, startWaypoint]);

  useEffect(() => {
    if (map) {
      const toggleRoutingButton = L.easyButton({
        states: [{
          stateName: 'enable-routing',
          icon: 'fa-car',
          title: 'Show Routing',
          onClick: function (control) {
            control.state('disable-routing');
            setIsRoutingControlVisible(true);
          }
        }, {
          stateName: 'disable-routing',
          icon: "<i class='fa fa-car' style='color: red;'></i>",
          title: 'Hide Routing',
          onClick: function (control) {
            control.state('enable-routing');
            setIsRoutingControlVisible(false);
          }
        }]
      }).addTo(map);

      return () => {
        map.removeControl(toggleRoutingButton);
      };
    }
  }, [map]);

  useEffect(() => {
    if (routingControl) {
      if (isRoutingControlVisible) {
        routingControl.show();
      } else {
        routingControl.hide();
      }
    }
  }, [routingControl, isRoutingControlVisible]);

  return null;
};

export default MapRouting;