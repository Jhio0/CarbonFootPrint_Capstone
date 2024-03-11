"use client";
import React, { useState } from "react";
import Link from "next/link";
import UserCalc from "./UserCalc";

function Page() {
  const [emissions, setEmissions] = useState({
    electricityEmission: 0,
    naturalGasEmission: 0,
  });

  const updateEmissions = (electricityEmission, naturalGasEmission) => {
    setEmissions({ electricityEmission, naturalGasEmission });
  };

  return (
    <main className="bg-gray-900 min-h-screen w-full flex flex-col justify-center items-center">
      <div className="bg-slate-800">
        <Link href="/" className="font-bold">
          Home
        </Link>
        <UserCalc updateEmissions={updateEmissions} />
      </div>
    </main>
  );
}

export default Page;
