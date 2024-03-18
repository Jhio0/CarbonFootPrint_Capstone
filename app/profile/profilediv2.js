"use client"
import * as React from 'react'
import { UserEmissions } from './user-emissions';
import { UserReports } from './user-reports';
import Grid from '@mui/material/Grid';

export const ProfileDiv2= () => {
  
    return (
        <Grid>
            <UserEmissions/>
            <br/>
            <UserReports/>
        </Grid>
    );

}