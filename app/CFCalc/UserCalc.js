  "use client";
  import React, { useState, useEffect } from "react";
  import FlightsCalc from "./FlightCalc";
  import EmissionDonutChart from "./EmissionsDonutChart";
  import AIClimateRecommendation from "./CalcAI";
  //firebase
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "/app/_utils/firebase"; // Adjust the path as necessary to where your Firebase config is exported
  import { onAuthStateChanged } from "firebase/auth";

  //maps
  import MapRouting from "./MapRouting";
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
    const [fetchRecommendation, setFetchRecommendation] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    //firebase
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in:", user);
          setCurrentUser(user);
        } else {
          console.log("No user signed in.");
          setCurrentUser(null);
        }
      });

      return unsubscribe; // Cleanup subscription
    }, []);

    const saveEmissionData = async () => {
      if (!currentUser) {
        console.log("No user signed in.");
        return;
      }

      try {
        await setDoc(
          doc(db, "emissionsData", currentUser.uid),
          {
            electricityEmission,
            naturalGasEmission,
            flightEmissions,
            vehicleEmissions,
            totalEmissions,
          },
          { merge: true }
        ); // Use merge to avoid overwriting other fields

        alert("Emissions data saved successfully.");
      } catch (error) {
        alert("Error saving emissions data: ", error);
      }
    };

    useEffect(() => {
      updateTotalEmissions(); // This recalculates total emissions whenever relevant states change
    }, [
      electricityEmission,
      naturalGasEmission,
      flightEmissions,
      vehicleEmissions,
      totalEmissions,
    ]);

    const updateTotalEmissions = () => {
      const updatedTotalEmissions =
        parseFloat(electricityEmission) +
        parseFloat(naturalGasEmission) +
        parseFloat(flightEmissions) +
        parseFloat(vehicleEmissions);
      setTotalEmissions(updatedTotalEmissions);
    };

    // Update to handle flight emissions
    const handleFlightEmissionsChange = (emissions) => {
      setFlightEmissions(emissions);
      updateTotalEmissions();
    };

    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    };

    const calculateEmissions = () => {
      let electricityCalc = 0;
      let naturalGasCalc = 0;

      // Example calculation from Home tab
      if (country && region) {
        const factors = emissionFactors[country][region];
        if (factors) {
          electricityCalc =
            parseFloat(electricityUsed) *
            (factors.generation + factors.transmission);
          naturalGasCalc = parseFloat(naturalGasUsed) * factors.naturalGas;
        }
      }
      setElectricityEmissions(electricityCalc);
      setNaturalGasEmissions(naturalGasCalc);
      setFetchRecommendation(true);
      updateTotalEmissions();
    };

    useEffect(() => {
      if (fetchRecommendation) {
        setFetchRecommendation(false);
      }
    }, [fetchRecommendation]);

    const calculateVehicleEmissions = () => {
      const v_emissionFactors = {
        Car: 0.197,
        Motorcycle: 0.113,
        TruckSUV: 0.372,
      };
      const emissions =
        parseFloat(mileage) * (v_emissionFactors[vehicleType] || 0);
      setVehicleEmissions(emissions);
      updateTotalEmissions();
    };

    return (
      <div className="flex w-full min-h-screen my-5 ">
        <div className="flex-grow grid w-full h-full card bg-base-300 rounded-box place-items-center ">
          <div role="tablist" className="tabs tabs-bordered mb-5">
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setRegion(""); // Reset region when country changes
                  }}
                >
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Region</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
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
              </label>
            </div>
          )}

          {activeTab === "Home" && (
            <div>
              <span className="label-text">Electricity</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                value={electricityUsed}
                onChange={(e) => setElectricityUsed(e.target.value)}
                placeholder="Electricity used (kWh)"
              />
              <br />
              <span className="label-text">Natural Gas</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                value={naturalGasUsed}
                onChange={(e) => setNaturalGasUsed(e.target.value)}
                placeholder="Natural gas used (GJ)"
              />
              <br />
              <br />
              <button className="btn btn-outline" onClick={calculateEmissions}>
                Calculate
              </button>
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
              <span className="label-text">Vehicle Type</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="TruckSUV">Truck/SUV</option>
              </select>
              <br />
              <span className="label-text">Mileage</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Enter Mileage in Km"
              />
              <br />
              <br />
              <button
                className="btn btn-outline"
                onClick={calculateVehicleEmissions}
              >
                Calculate
              </button>

              <p className="mt-5 stat-desc">
                Total Vehicle Emissions: {vehicleEmissions.toFixed(2)} kg CO2e
              </p>
            </div>

          )}
          <button
            className="btn btn-outline btn-success mt-10"
            onClick={saveEmissionData}
          >
            Save Results
          </button>
          <AIClimateRecommendation
          emissions={{ electricityEmission, naturalGasEmission }}
          onCalculate={fetchRecommendation}
        />
        </div>
        <div className="divider divider-horizontal"></div> {/*middle line*/}
        <div className="flex-grow grid w-full h-full card bg-base-300 rounded-box place-items-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Emissions</div>
              <div className="stat-value">
                {totalEmissions.toFixed(2)} kg CO2e
              </div>
              <div className="stat-desc"></div>
            </div>
          </div>
          <div className="size-[350px]">
            <EmissionDonutChart
              electricityEmission={electricityEmission}
              naturalGasEmission={naturalGasEmission}
              flightEmission={flightEmissions}
              vehicleEmission={vehicleEmissions}
            />
          </div>
          
        </div>

        
        <div className="w-1/2 h-full card bg-base-300 rounded-box place-items-center">
          {/* MapRouting content */}
          <MapRouting />
        </div>
        
      </div>
    );
  };

  export default UserCalc;
