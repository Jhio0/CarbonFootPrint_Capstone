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
        <div className='bg-gray-900 w-full items-center p-20 m-auto flex flex-row'>
            <div className="bg-gray-800 py-4 px-4 rounded-md">
                <div>
                    <h1 className="text-2xl">Submit a Report</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2 ">
                            <div>
                                <label htmlFor="title">Title:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-white input border-2 border-gray-500"
                                />
                            </div>
                        </div>
                        <div className="p-2">
                            <div>
                                <label htmlFor="text">Text:</label>
                            </div>
                            <div>
                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="text-white textarea"
                                />
                            </div>
                        </div>
                        <div className="p-2">
                            <div>
                                <label htmlFor="date">Date:</label>
                            </div>
                            <div>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="text-black"
                                />
                            </div>
                        </div>
                        <div className="p-2">
                            <div>
                                <label htmlFor="location">Location:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="text-black"
                                />
                            </div>
                        </div>
                        <button className="btn" onSubmit={addReport} type="submit">Submit Report</button>
                    </form>
                </div>
            </div>

            <div className="reportsContainer">
                {/* Display the reports here */}
                {/* fix this, pass props like the web dev 2 assignments */}
                {reports.map((report) => (
                    <div key={report.id} className="p-3 bg-gray-800 rounded-md m-3">
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
