"use client"
import React from 'react';
import { AuthLogin } from './auth-login';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function LogIn() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
      };
      checkAuthentication();
    }, [user]);
  

    if (loading) {
        // Render loading indicator or placeholder content while authentication is in progress
        return <div>Loading...</div>;
    }

    
    console.log('User:', user);

    const backgroundStyle = {
        background: `url(&apos;loginbi.gif&apos;)`,  
        backgroundSize: 'cover',
    };
    const gridContainerStyle = {
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        padding: '10px',
        columnGap: '10px',
        rowGap: '10px'
    };

    const LogInContainerStyle = {
        gridArea: '2 / 2 / 6 / 5',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gridTemplateRows: 'repeat(4,1fr)'
    };

    const LogInInputStyle = {
        gridArea: '1 / 3 / 5 / 5',
        backgroundColor: 'rgba(33, 45, 51, 0.5)'
    };

    const LogInDisplayStyle = {
        gridArea: '1 / 1 / 5 / 3',
        backgroundColor: '#212d33',
        padding: '20px',
        letterSpacing: '4px'
        
    };
      
    const LogInDisplayH1 = {
        padding: '5px',
        marginTop: '10vh'
    };

    const LogInDisplayH2 = {
        padding: '5px',
    };

    return (
        <div style={backgroundStyle}>
            {user ? (
                <div>
                    Already logged in 
                </div>
            ) : (
            <Grid style={gridContainerStyle}>
                <Grid style={LogInContainerStyle}>
                    <div style={LogInInputStyle}>
                        <AuthLogin/>
                    </div>
                    <div style={LogInDisplayStyle}>
                        <Typography variant="h3" style={LogInDisplayH1}>Welcome to Carbon Chart</Typography>
                        <br/>
                        <Typography variant="h6" style={LogInDisplayH2}>Log in to your account to track and manage your carbon emissions. Together, let's make a positive impact on the environment!</Typography>
                    </div>
                </Grid>
            </Grid>
        )}
        </div>
    );
}