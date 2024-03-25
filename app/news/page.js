"use client";

import React from "react";
import { Link } from "react-router";
import newsBar from "./components/newsBar";

export default function NewsItem({ news }) {
    return (
        <div className="bg-black">
            <newsBar />
        </div>
    );
}
