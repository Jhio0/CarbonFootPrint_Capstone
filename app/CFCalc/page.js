"use client";
import React, { useState } from "react";


import dynamic from 'next/dynamic';

const UserCalcWithNoSSR = dynamic(() => import("./UserCalc"), {
  ssr: false
});
function Page() {
  const [emissions, setEmissions] = useState({
    electricityEmission: 0,
    naturalGasEmission: 0,
  });

  const updateEmissions = (electricityEmission, naturalGasEmission) => {
    setEmissions({ electricityEmission, naturalGasEmission });
  };

  return (
    <main className="bg-[#1E1E1C] min-h-screen w-full flex flex-col justify-center items-start">
      <div className="bg-[#1E1E1C]">
        <UserCalcWithNoSSR updateEmissions={updateEmissions} />
      </div>
    </main>
  );
}

export default Page;
