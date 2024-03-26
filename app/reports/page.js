"use client";
import React, { useState, useEffect } from "react";
import { LocationProvider } from './LocationContext';
import { UserAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import MapReport from "./MapReport.js";
import ReportPage from "./reportsList.js";
import ReportForm from './reportForm.js';
import { LogInError } from '../_utils/authError/authLoginError';
export default function Page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LocationProvider>
        {user ? (
          <div className="flex justify-between">
            <div className="w-full">
              <MapReport/>
            </div>
            <div className="w-2/5 h-full">
              <ReportForm/>
            </div>
          </div>
        ) : (
          <div>
            <LogInError/>
          </div>
        )}
      </LocationProvider>
    </div>
  );
}
