"use client";

import React from "react";
import { UserAuth  } from "../context/AuthContext.js";


export default function AccountPage() {
    const { user } = UserAuth(); // Get the user from the auth hook
    return(
        <div className="p-20 border-5 border-black">
            <div>
                <h1 className="text-black text-3xl">Account Page</h1>
            </div>
            <div>
                <h2>User Details</h2>
                {/* <p>User ID: {user.uid}</p>
                <p>Email: {user.email}</p> */}
            </div>
            <div className="flex flex-row">
                <div>
                    <h2 className="text-black">First Name:</h2>
                    <input type="text" placeholder="First Name" />
                </div>
                <div>
                    <h2 className="text-black">Last Name:</h2>
                    <input type="text" placeholder="Last Name" />
                </div>
            </div>
            <div className="flex flex-row">
                <div>
                    <h2 className="text-black">Email:</h2>
                    <input type="text" placeholder="Email" />
                </div>
                <div>
                    <h2 className="text-black">Phone:</h2>
                    <input type="text" placeholder="Phone" />
                </div>
            </div>
            <div>
                <button className="btn">Save</button>
            </div>
        </div>
    );
} 