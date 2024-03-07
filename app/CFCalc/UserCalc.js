import React, { useState } from "react";

const emissionFactors = {
  Canada: {
    "Alberta (AB)": {
      generation: 0.51,
      transmission: 0.03,
      naturalGas: 0.18293,
    },
    "British Columbia (BC)": {
      generation: 0.014,
      transmission: 0.001,
      naturalGas: 0.18293,
    },
    "Manitoba (MB)": {
      generation: 0.0019,
      transmission: 0.0001,
      naturalGas: 0.18293,
    },
    "New Brunswick (NB)": {
      generation: 0.35,
      transmission: 0.02,
      naturalGas: 0.18293,
    },
    "Newfoundland and Labrador (NL)": {
      generation: 0.011,
      transmission: 0.001,
      naturalGas: 0.18293,
    },
    "Nova Scotia (NS)": {
      generation: 0.42,
      transmission: 0.02,
      naturalGas: 0.18293,
    },
    "Ontario (ON)": {
      generation: 0.04,
      transmission: 0.005,
      naturalGas: 0.18293,
    },
    "Prince Edward Island (PE)": {
      generation: 0.018,
      transmission: 0.0015,
      naturalGas: 0.18293,
    },
    "Quebec (QC)": {
      generation: 0.006,
      transmission: 0.0007,
      naturalGas: 0.18293,
    },
    "Saskatchewan (SK)": {
      generation: 0.68,
      transmission: 0.03,
      naturalGas: 0.18293,
    },
    "Northwest Territories (NT)": {
      generation: 0.67,
      transmission: 0.03,
      naturalGas: 0.18293,
    },
    "Yukon (YT)": {
      generation: 0.013,
      transmission: 0.002,
      naturalGas: 0.18293,
    },
    "Nunavut (NU)": {
      generation: 0.67,
      transmission: 0.03,
      naturalGas: 0.18293,
    },
  },
  USA: {
    "Alabama (AL)": {
      generation: 0.342229,
      transmission: 0.016126,
      naturalGas: 0.18293,
    },
    "Alaska (AK)": {
      generation: 0.419561,
      transmission: 0.01977,
      naturalGas: 0.18293,
    },
    "Arizona (AZ)": {
      generation: 0.422331,
      transmission: 0.02,
      naturalGas: 0.18293,
    },
    "Arkansas (AR)": {
      generation: 0.495846,
      transmission: 0.023364,
      naturalGas: 0.18293,
    },
    // Note: Only a selection of states are included for brevity. Add all other states as needed.
  },
};

const UserCalc = ({ updateEmissions }) => {
  const [activeTab, setActiveTab] = useState("Location");
  const [country, setCountry] = useState("Canada");
  const [region, setRegion] = useState("");
  const [electricityUsed, setElectricityUsed] = useState("");
  const [naturalGasUsed, setNaturalGasUsed] = useState("");
  // Placeholder states for Flights and Vehicle
  const [flightEmissions, setFlightEmissions] = useState(0);
  const [vehicleEmissions, setVehicleEmissions] = useState(0);
  // States for Flights tab
  const [flightType, setFlightType] = useState("Return");
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  // States for Vehicle tab
  const [mileage, setMileage] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");

  // This function should be expanded with actual calculations for flights and vehicles
  const calculateEmissions = () => {
    if (activeTab === "Home") {
      const factor = emissionFactors[country]?.[region];
      if (factor) {
        const electricityEmission =
          parseFloat(electricityUsed) *
          (factor.generation + factor.transmission);
        const naturalGasEmission =
          parseFloat(naturalGasUsed) * factor.naturalGas;
        // Update state in Page.js
        updateEmissions(electricityEmission, naturalGasEmission);
      }
    } else if (activeTab === "Flights") {
      // Update with actual flight calculation logic
      updateEmissions(flightEmissions, 0); // Example, replace with actual calculation
    } else if (activeTab === "Vehicle") {
      // Update with actual vehicle calculation logic
      updateEmissions(vehicleEmissions, 0); // Example, replace with actual calculation
    }
  };

  // Generate options for the region based on the selected country
  const regionsOptions =
    country === "Canada"
      ? Object.keys(emissionFactors.Canada)
      : Object.keys(emissionFactors.USA);

  const TabButton = ({ name }) => (
    <button
      className={`px-4 py-2 ${
        activeTab === name ? "bg-gray-300" : "bg-gray-200"
      } text-black`}
      onClick={() => setActiveTab(name)}
    >
      {name}
    </button>
  );

  return (
    <div>
      <div className="flex border-b">
        <TabButton name="Location" />
        <TabButton name="Home" />
        <TabButton name="Flights" />
        <TabButton name="Vehicle" />
      </div>

      {activeTab === "Location" && (
        <div>
          <h2>Location</h2>
          <select
            className="text-black"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setRegion(""); // Reset region when country changes
            }}
          >
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
          </select>
          <br />
          <select
            className="text-black"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={!country}
          >
            <option value="">Select your province/state</option>
            {regionsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {activeTab === "Home" && (
        <div>
          <h2>Home</h2>
          <input
            className="text-black"
            type="number"
            value={electricityUsed}
            onChange={(e) => setElectricityUsed(e.target.value)}
            placeholder="Electricity used (kWh)"
          />
          <br />
          <input
            className="text-black"
            type="number"
            value={naturalGasUsed}
            onChange={(e) => setNaturalGasUsed(e.target.value)}
            placeholder="Natural gas used (units)"
          />
        </div>
      )}

      {activeTab === "Flights" && (
        <div>
          <h2>Flights</h2>
          <select
            className="text-black"
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
          >
            <option value="Return">Return trip</option>
            <option value="One-way">One-way flight</option>
          </select>
          <br />
          <input
            className="text-black"
            type="text"
            value={flightFrom}
            onChange={(e) => setFlightFrom(e.target.value)}
            placeholder="From"
          />
          <br />
          <input
            className="text-black"
            type="text"
            value={flightTo}
            onChange={(e) => setFlightTo(e.target.value)}
            placeholder="To"
          />
        </div>
      )}

      {activeTab === "Vehicle" && (
        <div>
          <h2>Vehicle</h2>
          <input
            className="text-black"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="Mileage"
          />
          <br />
          <select
            className="text-black"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="Car">Car</option>
            <option value="Motorbike">Motorbike</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
          </select>
        </div>
      )}

      {/* Placeholder for a Calculate button */}
      <button onClick={calculateEmissions}>Calculate</button>
    </div>
  );
};

export default UserCalc;
