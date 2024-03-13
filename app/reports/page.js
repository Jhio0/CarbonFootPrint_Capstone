"use client"
import React, { useState, useEffect } from "react";


import MapReport from "./MapReport.js";
import ReportPage from "./reportsList.js"
// page generated by chatgpt as a placeholder
export default function page() {
    return (
    <div className="flex">
        <div className="w-1/2">
            <MapReport/>
        </div>
        <div>
            <ReportPage/>
        </div>
    </div>
    );
}
