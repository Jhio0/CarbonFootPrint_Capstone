"use client";
import React, { useState } from "react";
import Link from "next/link";
import UserCalc from "./UserCalc";
import MapRouting from "./MapRouting";
function Page() {
  const [emissions, setEmissions] = useState({
    electricityEmission: 0,
    naturalGasEmission: 0,
  });

  const updateEmissions = (electricityEmission, naturalGasEmission) => {
    setEmissions({ electricityEmission, naturalGasEmission });
  };

  return (
    <div>
      <MapRouting/>
    </div>
  );
}

export default Page;
