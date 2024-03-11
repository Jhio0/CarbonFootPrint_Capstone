'use client';
import React from 'react';
import { AuthLogin } from '../_utils/auth-login';
export default function LogIn(){

    const gridContainerStyle = {
        display: 'grid',
        height: '100vh',
        background: `url('loginbi.gif')`,  
        backgroundSize: 'cover',
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
        gridTemplateRows: 'repeat(4,1fr)',

    }
    const LogInInputStyle = {
        gridArea: '1 / 3 / 5 / 5',
        backgroundColor: 'rgba(33, 45, 51, 0.5)',

    }
    const LogInDisplayStyle = {
        gridArea: '1 / 1 / 5 / 3',
        backgroundColor: '#212d33',
        padding:'20PX',
        letterSpacing: '4px',
      };
      
    const LogInDisplayH1 = {
        fontSize: '35px',
        padding:'5px',
    }
    const LogInDisplayH2 = {
        padding:'5px',
        paddingTop: '10px',
    }

    return (
    <div style={gridContainerStyle}>
        <div style={LogInContainerStyle}>
            <div style={LogInInputStyle}>
                <AuthLogin/>
            </div>
            <div style={LogInDisplayStyle}>
                <h2 style={LogInDisplayH1}>Welcome to our Client Portal</h2>
                <p style={LogInDisplayH2}>Explore and manage your account here.</p>
            </div>
        </div>
        
    </div>
    );
}