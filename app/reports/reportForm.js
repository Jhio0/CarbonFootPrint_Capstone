"use client"
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext.js";
import { useLocation } from './LocationContext';
import { addReport, addPublicReport, getReports } from "./_services/reports-service.js";
import { FaLocationDot } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosCheckmark } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReportForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [isPrivate, setPrivate] = useState(false);
    const { location, setLocation } = useLocation(); // Destructure location and setLocation from useLocation() hook
    const [reports, setReports] = useState([]);
    const [reportsUtil, newReportsUtil] = useState(reports);

    const { user } = UserAuth(); // Get the user from the auth hook

    // Handler to process the report submission

    const handleAddReport = (event) => {
        newReportsUtil([...reports, event])
    } 

    const loadReports = async () => {
        try {
            const reports = await getReports(user.uid);
            setReports(reports);
        }
        catch (error) {
            console.error('Error loading reports:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
    
        // Guard clause to ensure user is authenticated
        if (!user) {
            console.error('User is not authenticated.');
            return;
        }

        // Input validation
        if (title.trim() === "" || title.length > 100) {
            console.error('Title must be between 1 and 100 characters.');
            toast.error("Title must be between 1 and 100 characters.", { position: "top-center" });
            return;
        }

        if (!date) {
            console.error('Date cannot be empty.');
            toast.error("Date cannot be empty.", { position: "top-center" });
            return;
        }

        if (text.trim().split(/\s+/).length > 1500) {
            console.error('Text cannot exceed 1500 words.');
            return;
        }
    
        const report = {
            title: title,
            text: text,
            date: date,
            location: location,
            private: isPrivate,
            author: user.displayName, // Assuming displayName is available in your user object
            uid: user.uid, 
        };
    
        try {
            console.log("Submitting report", report);
            
            if (isPrivate === true) {
                // If the report is private, call addReport
                const reportId = await addReport(user.uid, report);
                console.log('Private report added with ID:', reportId);
            } else {
                // If the report is not private, call addPublicReport
                const reportId = await addPublicReport(user.uid, report);
                console.log('Public report added with ID:', reportId);
            }
    
            // Reset form fields after submission
            setTitle("");
            setText("");
            setDate("");
            setLocation(""); // Clear the location after submission
            setPrivate(false); // Reset the isPrivate state
        } catch (error) {
            console.error('Error submitting report:', error);
            // Handle the error appropriately in your UI
        }
    };

    useEffect(() => {
        try {
            if (user) {
                loadReports();
            }
            else{
                return;
            }
        } catch (error) {
            console.error('Error loading reports:', error);
        }
    }, [user]);



    return (
        <div className="bg-white dark:bg-gray-900">
        <form action="" onSubmit={handleSubmit} className="p-10 max-w-xl mx-auto shadow-md sm:border-0 md:border md:border-gray-900 md:dark:border-gray-100 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="mb-10">
                <h1 className="font-bold text-4xl mb-3">Report</h1>
                <p className="font-medium text-lg mb-5"></p>
                <hr className="border-gray-900 dark:border-gray-100"/>
            </div>
            <div className="mb-5">
                <label htmlFor="title" className="text-lg flex justify-between items-end"><span>Title</span></label>
                <div className="mt-1 flex shadow-md">
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 block w-full sm:text-sm rounded-none border border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"/>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="message" className="text-lg flex justify-between items-end"><span>Text</span></label>
                <textarea name="message" id="message" cols="30" rows="10" value={text} onChange={(e) => setText(e.target.value)} className="shadow-md mt-1 block w-full sm:text-sm rounded-none border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"></textarea>
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
            <div className="mb-5">
                <label htmlFor="location" className="text-lg flex justify-between items-end"><span>Private</span></label>
                <div className="mt-1 flex shadow-md">
                    <input type="checkbox" id="location" value={isPrivate} onChange={(e) => setPrivate(e.target.checked)}  className="flex-1 block w-full sm:text-sm rounded-none border border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900"/>
                </div>
            </div>
            <div>
                <button type="submit" className="font-medium shadow-md rounded-none p-2 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-900 dark:border-gray-100 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 hover:bg-gray-900 dark:hover:bg-gray-100">Submit Report</button>
            </div>
        </form>
        
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
    );
}
