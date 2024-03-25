"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import L from 'leaflet'; 
import 'leaflet-routing-machine';
import 'leaflet-geosearch/dist/geosearch.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import AirportData from './Airports.json'; // Import Airport data

const MapRouting = () => {
  const [sourceAirport, setSourceAirport] = useState(null);
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  useEffect(() => {
    // Populate source and destination options with airport data
    setSourceOptions(AirportData);
    setDestinationOptions(AirportData);
  }, []);

  const handleSourceAirportChange = (_, value) => {
    setSourceAirport(value);
  };

  const handleDestinationAirportChange = (_, value) => {
    setDestinationAirport(value);
  };

  // Populate options with all airports when input is empty
  const handleSearch = (query, setOptions) => {
    if (!query) {
      setOptions(AirportData);
      return;
    }
    // Filter options based on user input (query)
    const filteredOptions = AirportData.filter(option =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <div>
      <MapContainer center={[20, 0]} zoom={6}>
        <TileLayer 
          attribution='&copy; <a href=7"https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
        />
        <div className="flex items-end" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
          <div className='min-h-3/4 h-auto w-full bg-gray-400 flex justify-center items-center flex-wrap rounded-md backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <Autocomplete
              id='source-airport'
              options={sourceOptions}
              onChange={handleSourceAirportChange}
              getOptionLabel={(option) => option.name}
              onInputChange={(e, value) => handleSearch(value, setSourceOptions)}
              style={{ 
                width: 300, 
                background: 'rgba(0, 0, 0, 0.1)', // Black with 10% opacity
                borderRadius: '8px', // Rounded corners
                border: '1px solid #ccc', // Border
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow
                color: '#fff', // Text color
                zIndex: 1000, // Ensure Autocomplete is above other elements
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color='secondary'
                  label='Source'
                  variant='outlined'
                  InputLabelProps={{ style: { color: 'purple' } }}
                  style={{ background: 'transparent' }} // Set input field background to transparent
                />
              )}
            />
          </div>
          <div className='min-h-3/4 h-auto w-full bg-gray-400 flex justify-center items-center flex-wrap rounded-md backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <Autocomplete
              id='destination-airport'
              options={destinationOptions}
              onChange={handleDestinationAirportChange}
              getOptionLabel={(option) => option.name}
              onInputChange={(e, value) => handleSearch(value, setDestinationOptions)}
              style={{ 
                width: 300, 
                background: 'rgba(0, 0, 0, 0.1)', // Black with 10% opacity
                borderRadius: '8px', // Rounded corners
                border: '1px solid #ccc', // Border
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow
                color: '#fff', // Text color
                zIndex: 1000, // Ensure Autocomplete is above other elements
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color='secondary'
                  label='Destination'
                  variant='outlined'
                  InputLabelProps={{ style: { color: 'purple' } }}
                  style={{ background: 'transparent' }} // Set input field background to transparent
                />
              )}
            />
          </div>
        </div>
        {(sourceAirport && destinationAirport) && (
          <Routing sourceAirport={sourceAirport} destinationAirport={destinationAirport} />
        )}
      </MapContainer>
    </div>
  );
};

const Routing = ({ sourceAirport, destinationAirport }) => {
  const map = useMap();
  

  useEffect(() => {
    if (sourceAirport && destinationAirport) {
      const waypoints = [
        L.latLng(parseFloat(sourceAirport.latitude_deg), parseFloat(sourceAirport.longitude_deg)),
        L.latLng(parseFloat(destinationAirport.latitude_deg), parseFloat(destinationAirport.longitude_deg)),
      ];

      L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        show: false,
        createMarker: function(i, waypoint, n) {
          return L.circleMarker(waypoint.latLng, {
            radius: 5,
            color: 'purple',
            fillColor: '#800080',
            fillOpacity: 0.7
          });
        }
      }).addTo(map);
    }
  }, [sourceAirport, destinationAirport, map]);

  return null;
};

export default MapRouting;