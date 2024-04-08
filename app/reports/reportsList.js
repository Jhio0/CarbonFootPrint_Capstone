"use client"
import React, { useState, useEffect } from "react";

import { UserAuth } from "../context/AuthContext.js";

import { useLocation } from './LocationContext';

export default function ReportPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const { location, setLocation } = useLocation(); // Destructure location and setLocation from useLocation() hook
    const [reports, setReports] = useState([]);

    const { user } = UserAuth();

    const loadReports = async () => {
        if (typeof window !== 'undefined') {
            const reports = await getReports(user.uid);
            console.log("Reports", reports);
            setReports(reports);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Guard clause to ensure user is authenticated
        if (!user) {
            console.error('User is not authenticated.');
            return;
        }
    
        const report = {
            title: title,
            text: text,
            date: date,
            location: location, // Use location directly
        };
    
        try {
            console.log("Submitting report", report);
            console.log("User", user.uid);
            const reportId = await addReport(user.uid, report);
            console.log('Report added with ID:', reportId);
            setTitle("");
            setText("");
            setDate("");
            setLocation(""); // Clear the location after submission
        } catch (error) {
            console.error('Error submitting report:', error);
            // Handle the error appropriately in your UI
        }
    };

    useEffect(() => {
        loadReports();
    }, [user]);

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="text-black">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="text-black">
                        <label htmlFor="text">Text:</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="text-black">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="text-black">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} 
                            className="text-black"
                        />
                    </div>
                    <button className="text-black" onSubmit={addReport} type="submit">Submit Report</button>
                </form>

                <div className="reportsContainer">
                    {reports && reports.map((report) => (
                        <div key={report.id}>
                            <h2>{report.title}</h2>
                            <p>{report.text}</p>
                            <p>{report.date}</p>
                            <p>{report.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}