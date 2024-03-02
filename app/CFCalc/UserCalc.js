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
    // Add other provinces as necessary
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
    // Include all other states as necessary
  },
};

const UserCalc = () => {
  const [country, setCountry] = useState("Canada");
  const [region, setRegion] = useState("");
  const [electricityUsed, setElectricityUsed] = useState("");
  const [naturalGasUsed, setNaturalGasUsed] = useState("");
  const [emissionResult, setEmissionResult] = useState(0);

  const regionsOptions =
    country === "Canada"
      ? Object.keys(emissionFactors.Canada)
      : Object.keys(emissionFactors.USA);

  const calculateEmissions = () => {
    if (region && emissionFactors[country][region]) {
      const { generation, transmission, naturalGas } =
        emissionFactors[country][region];
      const totalEmission = (
        electricityUsed * (generation + transmission) +
        naturalGasUsed * naturalGas
      ).toFixed(2);
      setEmissionResult(totalEmission);
    } else {
      setEmissionResult(0); // Reset or handle error
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
      <h3>Your carbon footprint: {emissionResult} kg CO2e</h3>
    </div>
  );
};

export default UserCalc;
