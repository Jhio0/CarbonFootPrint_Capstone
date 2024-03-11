import React, { useState } from "react";
import FlightsCalc from "./FlightCalc";
import EmissionDonutChart from "./EmissionsDonutChart";
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
  const [flightEmissions, setFlightEmissions] = useState(0);
  const [mileage, setMileage] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleEmissions, setVehicleEmissions] = useState(0);
  const [electricityEmission, setElectricityEmissions] = useState(0);
  const [naturalGasEmission, setNaturalGasEmissions] = useState(0);
  const [flights, setFlights] = useState([]);
  const [totalEmissions, setTotalEmissions] = useState(0);

  // Update to handle flight emissions
  const handleFlightEmissionsChange = (emissions) => {
    setFlightEmissions(emissions);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const calculateEmissions = () => {
    let electricityEmission = 0;
    let naturalGasEmission = 0;
    let vehicleEmissions = 0;

    // Example calculation from Home tab
    if (country && region) {
      const factors = emissionFactors[country][region];
      if (factors) {
        electricityEmission =
          parseFloat(electricityUsed) *
          (factors.generation + factors.transmission);
        naturalGasEmission = parseFloat(naturalGasUsed) * factors.naturalGas;
      }
    }
    const totalEmissions =
      electricityEmission +
      naturalGasEmission +
      flightEmissions +
      vehicleEmissions;
    setTotalEmissions(totalEmissions);
    // Add your calculation logic for other tabs here

    setElectricityEmissions(electricityEmission);
    setNaturalGasEmissions(naturalGasEmission);
  };

  const calculateVehicleEmissions = () => {
    const v_emissionFactors = {
      Car: 0.197,
      Motorcycle: 0.113,
      TruckSUV: 0.372,
    };
    const emissions =
      parseFloat(mileage) * (v_emissionFactors[vehicleType] || 0);
    setVehicleEmissions(emissions);
  };

  return (
    <div>
      <div className="tabs">
        {["Location", "Home", "Flights", "Vehicle"].map((tabName) => (
          <button
            key={tabName}
            className={`tab tab-bordered ${
              activeTab === tabName ? "tab-active" : ""
            }`}
            onClick={() => handleTabChange(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {activeTab === "Location" && (
        <div>
          <h2>Location</h2>
          <select
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
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={!country}
          >
            <option value="">Select your province/state</option>
            {country &&
              Object.keys(emissionFactors[country]).map((regionKey) => (
                <option key={regionKey} value={regionKey}>
                  {regionKey}
                </option>
              ))}
          </select>
        </div>
      )}

      {activeTab === "Home" && (
        <div>
          <h2>Home</h2>
          <input
            type="number"
            value={electricityUsed}
            onChange={(e) => setElectricityUsed(e.target.value)}
            placeholder="Electricity used (kWh)"
          />
          <br />
          <input
            type="number"
            value={naturalGasUsed}
            onChange={(e) => setNaturalGasUsed(e.target.value)}
            placeholder="Natural gas used (units)"
          />
          <br />
          <button onClick={calculateEmissions}>Calculate</button>
        </div>
      )}

      {activeTab === "Flights" && (
        <div>
          <h2>Flights</h2>
          <FlightsCalc
            flights={flights}
            setFlights={setFlights}
            onFlightEmissionsChange={handleFlightEmissionsChange}
          />
        </div>
      )}

      {activeTab === "Vehicle" && (
        <div>
          <h2>Vehicle Emissions</h2>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="Mileage (Km)"
          />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="TruckSUV">Truck/SUV</option>
          </select>
          <br />
          <button onClick={calculateVehicleEmissions}>
            Calculate Vehicle Emissions
          </button>
          <p>Total Vehicle Emissions: {vehicleEmissions.toFixed(2)} kg CO2e</p>
        </div>
      )}

      <EmissionDonutChart
        electricityEmission={electricityEmission}
        naturalGasEmission={naturalGasEmission}
        flightEmission={flightEmissions} // Pass flight emissions to the chart
        vehicleEmission={vehicleEmissions} // Pass vehicle emissions to the chart
      />
      <div>Total Emissions: {totalEmissions.toFixed(2)} kg CO2e</div>
    </div>
  );
};

export default UserCalc;
