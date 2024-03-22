"use client"
import React, { useState, useEffect } from "react";
import { addReport, getReports } from "./_services/reports-service.js";
import { UserAuth } from "../context/AuthContext.js";
import { LocationProvider } from './LocationContext';
import MapReport from "./MapReport.js";
import ReportForm from './reportForm.js';

export default function ReportPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [location, setLocation] = useState("");
    const [reports, setReports] = useState([]);
    const { user } = UserAuth();

    const handleAddReport = (event) => {
        setReports([...reports, event]);
    };

    const loadReports = async () => {
        if (typeof window !== 'undefined') {
            const reportsData = await getReports(user.uid);
            console.log("Reports", reportsData);
            setReports(reportsData);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!user) {
            console.error('User is not authenticated.');
            return;
        }
    
        const report = {
            title: title,
            text: text,
            date: date,
            location: location,
            isPrivate: isPrivate
        };
    
        try {
            const reportId = await addReport(user.uid, report);
            console.log('Report added with ID:', reportId);
            handleAddReport(report);
            setTitle("");
            setText("");
            setDate("");
            setLocation("");
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    useEffect(() => {
        if (user) {
            loadReports();
        }
    }, [user, reports]);
    
    return (
        <LocationProvider>
            <div className='bg-gray-900 w-full items-center p-20 m-auto flex flex-row'>
                <div className="bg-gray-800 py-4 px-4 rounded-md">
                    <h1 className="text-2xl">Submit a Report</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-white input"
                            />
                        </div>
                        <div className="p-2">
                            <label htmlFor="text">Text:</label>
                            <textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="text-white textarea"
                            />
                        </div>
                        <div className="p-2">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="text-white input"
                            />
                        </div>
                        <div className="p-2">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="text-white input"
                            />
                        </div>
                        <div className="p-2">
                            <label htmlFor="isPrivate">Use Private:</label>
                            <input
                                type="checkbox"
                                id="isPrivate"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        </div>
                        <button className="btn mt-2 ml-2" type="submit">Submit Report</button>
                    </form>
                </div>
                <div className="reportsContainer">
                    {reports.map((report) => (
                        <div key={report.id} className="p-3 bg-gray-800 rounded-md m-3">
                            <h2>{report.title}</h2>
                            <p>{report.text}</p>
                            <p>{report.date}</p>
                            <p>{report.location}</p>
                            <p>{report.isPrivate}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="w-full">
                        <MapReport/>
                    </div>
                    <div className="w-2/5 h-full">
                        <ReportForm/>
                    </div>
                </div>
            </div>
        </LocationProvider>
    );
}
