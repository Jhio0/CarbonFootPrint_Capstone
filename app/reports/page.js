"use client"
import React, { useState, useEffect } from "react";
import { addReport, getReports } from "./_services/reports-service.js";
import { UserAuth } from "../context/AuthContext.js";

// page generated by chatgpt as a placeholder
export default function ReportPage() {
    // State variables for each input field
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [reports, setReports] = useState([]);
    // const [reportsUtil, newReportsUtil] = useState(reports);

    const { user } = UserAuth(); // Get the user from the auth hook

    // Handler to process the report submission

    const handleAddReport = (event) => {
        newReportsUtil([...reports, event])
    } 

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
            location: location,
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
            // Handle the error appropriately in your UI
        }
    };

    useEffect(() => {
        if (user) {
            loadReports();
        }
        else{
            return;
        }
    }, [user, reports]);
    

    return (
        <div className='bg-gray-900 w-full justify-center items-center p-20 m-auto flex flex-col'>
            <h1 className="text-2xl">Submit a Report</h1>
            <form onSubmit={handleSubmit}>
                <div className="p-2">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-black"
                    />
                </div>
                <div className="p-2">
                    <label htmlFor="text">Text:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="text-black"
                    />
                </div>
                <div className="p-2">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-black"
                    />
                </div>
                <div className="p-2">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="text-black"
                    />
                </div>
                <button onSubmit={addReport} type="submit">Submit Report</button>
            </form>

            <div className="reportsContainer">
                {/* Display the reports here */}
                {/* fix this, pass props like the web dev 2 assignments */}
                {reports.map((report) => (
                    <div key={report.id}>
                        <h2>{report.title}</h2>
                        <p>{report.text}</p>
                        <p>{report.date}</p>
                        <p>{report.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
