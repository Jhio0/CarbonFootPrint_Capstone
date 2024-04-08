"use client";

import React from "react";
import { UserAuth } from "../context/AuthContext.js";
import { useState, useEffect } from "react";
import { addAccount } from "./_services/account-service.js";


export default function AccountPage() {
    const { user } = UserAuth(); // Get the user from the auth hook
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Guard clause to ensure user is authenticated
        if (!user) {
            console.error('User is not authenticated.');
            return;
        }
        // Get the form data
        const formData = new FormData(event.target);
        const account = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username"),
        };
        try {
            const userId = await addAccount(user.uid, account);
            console.log('Account added with ID:', userId);
        } catch (error) {
            console.error('Error submitting account:', error);
        }
    }

    return(
        <div className="p-20 border-5 border-black max-w-4xl mx-auto my-8">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4"
            >
                <div className="mb-8">
                    <h1 className="text-black text-3xl font-bold">Account Page</h1>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">User Details</h2>
                    {/* Uncomment and use when ready */}
                    {/* <p className="mt-2">User ID: {user.uid}</p>
                    <p>Username: {user.username}</p> */} {/* Assuming 'username' is available */}
                </div>
                <div className="flex flex-row space-x-4 mb-8">
                    <div className="flex-1">
                        <h2 className="text-black font-semibold">First Name:</h2>
                        <input type="text" placeholder="First Name" className="mt-2 p-2 border-2 border-gray-200 rounded-lg w-full" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-black font-semibold">Last Name:</h2>
                        <input type="text" placeholder="Last Name" className="mt-2 p-2 border-2 border-gray-200 rounded-lg w-full" />
                    </div>
                </div>
                <div className="flex flex-row mb-8">
                    <div className="flex-1">
                        <h2 className="text-black font-semibold">Username:</h2>
                        <input type="text" placeholder="Username" className="mt-2 p-2 border-2 border-gray-200 rounded-lg w-full" />
                    </div>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            
            
            </form>

        </div>
    );
} 