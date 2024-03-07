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
  const [country, setCountry] = useState("Canada");
  const [region, setRegion] = useState("");
  const [electricityUsed, setElectricityUsed] = useState("");
  const [naturalGasUsed, setNaturalGasUsed] = useState("");

  const regionsOptions =
    country === "Canada"
      ? Object.keys(emissionFactors.Canada)
      : Object.keys(emissionFactors.USA);

  const calculateEmissions = () => {
    if (region && emissionFactors[country][region]) {
      const { generation, transmission, naturalGas } =
        emissionFactors[country][region];
      const electricityEmission =
        parseFloat(electricityUsed) * (generation + transmission);
      const naturalGasEmission = parseFloat(naturalGasUsed) * naturalGas;
      const totalEmission = electricityEmission + naturalGasEmission;

      // Using updateEmissions prop to pass calculated emissions back to the parent component
      updateEmissions(electricityEmission, naturalGasEmission);

      // Optionally, if you still want to display the result within UserCalc
      alert(`Your carbon footprint: ${totalEmission.toFixed(2)} kg CO2e`);
    } else {
      alert("Please select a region and enter usage amounts.");
    }
  };

  return (
    <div>
      <h2>Carbon Footprint Calculator</h2>
      <select
        className="text-black"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setRegion("");
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
      <br />
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
      <br />
      <button onClick={calculateEmissions}>Calculate</button>
      {/* <h3>Your carbon footprint: {emissionResult} kg CO2e</h3> */}
    </div>
  );
};

export default UserCalc;
