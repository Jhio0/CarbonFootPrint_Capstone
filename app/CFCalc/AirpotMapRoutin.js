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
import '@elfalem/leaflet-curve'

import './routingstyling.css'; 
const AirportMapRouting = () => {
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
    <div style={{ height: '100vh', width: '95vh' }}>
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
        const sourceLatLng = [parseFloat(sourceAirport.latitude_deg), parseFloat(sourceAirport.longitude_deg)];
        const destinationLatLng = [parseFloat(destinationAirport.latitude_deg), parseFloat(destinationAirport.longitude_deg)];
        
        // Plot markers for source and destination airports
        const sourceMarker = L.circleMarker(sourceLatLng, { radius: 5, color: 'red' })
          .bindPopup(`<b>${sourceAirport.name}</b>`)
          .addTo(map);
        
        const destinationMarker = L.circleMarker(destinationLatLng, { radius: 5, color: 'blue' })
          .bindPopup(`<b>${destinationAirport.name}</b>`)
          .addTo(map);
        
        // Calculate distance between source and destination
        const distance = Math.sqrt(Math.pow(destinationLatLng[0] - sourceLatLng[0], 2) + Math.pow(destinationLatLng[1] - sourceLatLng[1], 2));
        
        // Calculate angle offset
        const angleOffset = 30; // Adjust this value as needed
        
        // Define the path for the curved route
        const midPoint = [
          (sourceLatLng[0] + destinationLatLng[0]) / 2,  // Midpoint x-coordinate
          (sourceLatLng[1] + destinationLatLng[1]) / 2   // Midpoint y-coordinate
        ];
        
        const controlPoint = [
          // Calculate control point offset based on distance and angle
          midPoint[0] + (distance / 4) * Math.cos(angleOffset * Math.PI / 180),
          midPoint[1] + (distance / 4) * Math.sin(angleOffset * Math.PI / 180)
        ];
        
        const pathData = [
            'M', sourceLatLng,
            'Q', controlPoint,
            destinationLatLng
        ];
        
        // Draw curved route
        const curve = L.curve(pathData, { color: 'blue' }).addTo(map);
        
        // Apply animation class to the drawn line
        curve._path.classList.add('animate');
        
        // Fit the map bounds to include all markers and the route
        const bounds = L.latLngBounds([sourceLatLng, destinationLatLng]);
        map.flyToBounds(bounds);
        
        // Clean up markers and route when component unmounts
        return () => {
          map.removeLayer(sourceMarker);
          map.removeLayer(destinationMarker);
          map.removeLayer(curve);
        };
      }
    }, [sourceAirport, destinationAirport, map]);
    
    return null;
};

export default AirportMapRouting;