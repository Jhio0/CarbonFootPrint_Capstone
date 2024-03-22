"use client"
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext.js";
import { useLocation } from './LocationContext';
import { addReport, getReports } from "./_services/reports-service.js";
import { FaLocationDot } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosCheckmark } from "react-icons/io";

export default function ReportForm() {
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
    <div className="bg-white dark:bg-gray-900">
        <form action="" className="p-10 max-w-xl mx-auto shadow-md sm:border-0 md:border md:border-gray-900 md:dark:border-gray-100 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="mb-10">
                <h1 className="font-bold text-4xl mb-3">Report</h1>
                <p className="font-medium text-lg mb-5"></p>
                <hr className="border-gray-900 dark:border-gray-100"/>
            </div>
            <div className="mb-5">
                <label for="message" className="text-lg flex justify-between items-end"><span>Message</span></label>
                <textarea name="message" id="message" cols="30" rows="10" className="shadow-md mt-1 block w-full sm:text-sm rounded-none border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"></textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="title" className="text-lg flex justify-between items-end"><span>Title</span></label>
                <div className="mt-1 flex shadow-md">
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 block w-full sm:text-sm rounded-none border border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"/>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="date" className="text-lg flex justify-between items-end"><span>Date</span></label>
                <div className="mt-1 flex shadow-md">
                    <span className="inline-flex items-center px-3 rounded-none border border-r-0 border-gray-900 dark:border-gray-100"><CiCalendarDate /></span>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 block w-full sm:text-sm rounded-none border border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"/>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="location" className="text-lg flex justify-between items-end"><span>Location</span></label>
                <div className="mt-1 flex shadow-md">
                    <span className="inline-flex items-center px-3 rounded-none border border-r-0 border-gray-900 dark:border-gray-100"><FaLocationDot /></span>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}  className="flex-1 block w-full sm:text-sm rounded-none border border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"/>
                </div>
            </div>
            <div>
                <button type="submit" onSubmit={addReport} className="font-medium shadow-md rounded-none p-2 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-900 dark:border-gray-100 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 hover:bg-gray-900 dark:hover:bg-gray-100">Submit Report</button>
            </div>
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
    );
}

// <label for="email" className="text-lg flex justify-between items-end"><span>Date</span><span className="text-xs text-red-500">Required</span></label>