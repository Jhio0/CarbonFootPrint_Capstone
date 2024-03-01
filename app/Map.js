"use client"
import React, { useEffect, useState, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

export default function Map() {
  const [geojsonFeatures, setGeojsonFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
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

  useEffect(() => {
    setSearchResult(null); // Reset search result when search input changes
  }, [searchInput]);

  const handleSearch = () => {
    const result = geojsonFeatures.find(feature => {
      const { name, province } = feature.properties;
      return name.toLowerCase().includes(searchInput.trim().toLowerCase()) || province.toLowerCase().includes(searchInput.trim().toLowerCase());
    });
    if (result) {
      setSearchResult(result);
      mapRef.current.setView([result.geometry.coordinates[1], result.geometry.coordinates[0]], 5);
    } else {
      console.log(`Asset/province ${searchInput} not found`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          className="text-black"
          type="text"
          placeholder="Search for an asset or province..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button className="text-black" onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <MapContainer center={[38, -97]} zoom={4} style={{ width: '100%', height: '600px' }} ref={mapRef} worldCopyJump={true}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          {searchResult && (
            <GeoJSON 
              data={{
                type: "FeatureCollection",
                features: [searchResult]
              }}
              pointToLayer={(feature, latlng) => (
                L.circleMarker(latlng, {
                  radius: 5,
                  color: 'blue',
                  fillColor: '#3186cc',
                  fillOpacity: 0.5,
                })
              )}
              onEachFeature={(feature, layer) => {
                const { name, province, co2_2022, owners } = feature.properties;
                const ownerInfo = owners ? owners.map(owner => `<li>${owner.CompanyName}: ${owner.PercentageOfInterestCompany}%</li>`).join('') : 'None';
                layer.bindPopup(`<b>${name}</b><br><b>Province:</b> ${province}<br><ul>Owners:<br>${ownerInfo}</ul><br>CO2 Emission (2022): ${co2_2022} Tons`);
              }}
            />
          )}
          <GeoJSON 
            data={{
              type: "FeatureCollection",
              features: geojsonFeatures.filter(feature => feature !== searchResult) // Exclude search result from plotted data
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
        </MapContainer>
      )}
    </div>
  );
}