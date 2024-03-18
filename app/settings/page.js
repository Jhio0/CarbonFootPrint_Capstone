"use client"
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { UserAuth } from '../context/AuthContext'; // Assuming you have an AuthContext


export default function Settings() {
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

    return (
        <Container>
            {user ? (
                <Grid>

                </Grid>
            ) : (
                <div>
                    {/* Render something else if the user is not authenticated */}
                    <p>Please sign in to view your profile.</p>
                </div>
            )}
        </Container>
    );
}