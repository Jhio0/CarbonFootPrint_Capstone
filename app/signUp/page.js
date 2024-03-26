'use client';
import React from 'react';
import { AuthSignUp } from './auth-signup';
import { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { SignUpError } from '../_utils/authError/authSignUpError';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function SignUp(){
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
    const backgroundStyle = {
        background: `url('signupbi.gif')`,  
        backgroundSize: 'cover',
    }

    const gridContainerStyle = {
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        padding: '10px',
        columnGap: '10px',
        rowGap: '10px'
      };

    const SignUpContainerStyle = {
        gridArea: '2 / 2 / 6 / 5',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gridTemplateRows: 'repeat(4,1fr)',

    }
    const SignUpInputStyle = {
        gridArea: '1 / 3 / 5 / 5',
        backgroundColor: 'rgba(33, 45, 51, 0.5)',

    }
    const SignUpDisplayStyle = {
        gridArea: '1 / 1 / 5 / 3',
        backgroundColor: '#212d33',
        padding:'20PX',
        letterSpacing: '4px',

    }
    const SignUpDisplayH1 = {
        padding: '5px',
        marginTop: '10vh'
    };

    const SignUpDisplayH2 = {
        padding: '5px',
    };



    return (
        <div style={backgroundStyle}>
            {user ? (
                <div>
                    <SignUpError/>
                </div>
            ) : (
            <Grid style={gridContainerStyle}>
                <Grid style={SignUpContainerStyle}>
                    <div style={SignUpInputStyle}>
                        <AuthSignUp/>
                    </div>
                    <div style={SignUpDisplayStyle}>
                        <Typography variant="h3" style={SignUpDisplayH1}>Sign up now</Typography>
                        <br/>
                        <Typography variant="h5" style={SignUpDisplayH2}>Help save the world by minimizing your carbon footprint</Typography>
                    </div>
                </Grid>
            </Grid>
        )}

        </div>
    );
}