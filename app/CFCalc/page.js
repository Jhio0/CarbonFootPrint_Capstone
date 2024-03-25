"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import Link from "next/link";
import UserCalc from "./UserCalc";
import MapRouting from "./MapRouting";

function Page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [emissions, setEmissions] = useState({
    electricityEmission: 0,
    naturalGasEmission: 0,
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, [user]);

  const updateEmissions = (electricityEmission, naturalGasEmission) => {
    setEmissions({ electricityEmission, naturalGasEmission });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <main className="bg-base-300 min-h-screen w-full flex flex-col justify-center items-start">
          <div className="bg-base-300">
            <UserCalc updateEmissions={updateEmissions} />
          </div>
        </main>
      ) : (
        <div>
          <p>Please sign in to view your profile.</p>
        </div>
      )}
    </div>
  );
}

export default Page;
