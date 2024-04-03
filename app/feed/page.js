"use client"
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { PublicReports } from './feed-content';
export default function Feed() {
    return (
        <Container >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: 4, paddingBottom: 4,height: '100%', }}>
                <PublicReports/>
            </Grid>
        </Container>
    );
}
