"use client"
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import L from 'leaflet'; 
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const MapRouting = () => {
  const [sourceCity, setSourceCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleSourceCityChange = async (_, value) => {
    setSourceCity(value);
  };

  const handleDestinationCityChange = async (_, value) => {
    setDestinationCity(value);
  };

  const handleSearch = async (query, setOptions) => {
    try {
      const results = await provider.search({ query });
      setOptions(results.map((result) => ({
        label: result.label,
        lat: result.y,
        lng: result.x,
      })));
    } catch (error) {
      console.error('Error searching:', error);
      setOptions([]);
    }
  };

  return (
    <div>
      <MapContainer center={[20, 0]} zoom={6} >
            <TileLayer 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=97162abb-de48-4413-a227-44ce4cfb0cd3`}
            />

        <div className="flex items-end" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
            <div className='min-h-3/4 h-auto w-full bg-gray-400 flex justify-center items-center flex-wrap rounded-md backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                    <Autocomplete
                        id='source-city'
                        options={sourceOptions}
                        onChange={handleSourceCityChange}
                        getOptionLabel={(option) => option.label}
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
                    id='destination-city'
                    options={destinationOptions}
                    onChange={handleDestinationCityChange}
                    getOptionLabel={(option) => option.label}
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

                {(sourceCity && destinationCity) && (
          <Routing sourceCity={sourceCity} destinationCity={destinationCity} />
        )}
        </div>
      </MapContainer>
    </div>
  );
};

const Routing = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  L.Routing.control({
    waypoints: [
      L.latLng(parseFloat(sourceCity.lat), parseFloat(sourceCity.lng)),
      L.latLng(parseFloat(destinationCity.lat), parseFloat(destinationCity.lng)),
    ],
  }).addTo(map);

  return null;
};

export default MapRouting;