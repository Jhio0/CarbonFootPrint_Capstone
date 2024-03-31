"use client";
import React, { useState } from "react";
import UserCalc from "./UserCalc";
import AIClimateRecommendation from "./CalcAI";

function Page() {
  const [emissions, setEmissions] = useState({
    electricityEmission: 0,
    naturalGasEmission: 0,
  });

  const updateEmissions = (electricityEmission, naturalGasEmission) => {
    setEmissions({ electricityEmission, naturalGasEmission });
  };

  return (
    <main className="bg-base-300 min-h-screen w-full flex flex-col justify-center items-start">
      <div className="bg-base-300">
        <UserCalc updateEmissions={updateEmissions} />
        <AIClimateRecommendation emissions={emissions} />
      </div>
    </main>
  );
}

export default Page;
