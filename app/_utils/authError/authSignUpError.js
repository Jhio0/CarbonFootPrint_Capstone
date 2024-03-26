"use client"

import React from "react";
import { Typography } from "@mui/material";

export const SignUpError = () => {
    const backgroundStyle = {
        background: `url('signupbi.gif')`,  
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    return (
        <div style={backgroundStyle}>
            <Typography variant="h6">
                Error: Already Signed in 
            </Typography>
        </div>
    );
};
