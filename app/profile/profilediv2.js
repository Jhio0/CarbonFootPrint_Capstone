"use client"
import * as React from 'react'
import { UserEmissions } from './user-emissions';
import Grid from '@mui/material/Grid';
import {UserReports} from './user-reports'
export const ProfileDiv2= () => {
  
    return (
        <Grid>
            <UserEmissions/>
            <br/>
            <UserReports/>
        </Grid>
    );

}