"use client"
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ProfileDiv1 } from './profilediv';
import { ProfileDiv2 } from './profilediv2';
import { UserAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import { useRouter } from 'next/navigation';  

export default function Profile() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: 4, paddingBottom: 4,height: '100%', }}>
                    <Grid item xs={12} sm={11} md={4} lg={3}>
                        <ProfileDiv1 />
                    </Grid>
                    <Grid item xs>
                        <ProfileDiv2 />
                    </Grid>
                </Grid>
            ) : (
                <div>
                    <p>Please sign in to view your profile.</p>
                </div>
            )}
        </Container>
    );
}
