import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserAuth } from "../context/AuthContext.js";
import firebase from 'firebase/app';
import 'firebase/firestore';  
import 'firebase/auth';  
import { getDoc, doc } from "firebase/firestore";
import { db } from '../_utils/firebase.js';

export const UserEmissions = () => {
    const [emission, setEmission] = useState({});
    const { user } = UserAuth();
    
    useEffect(() => {
        fetchEmissionsData();
    }, [user]);

    const fetchEmissionsData = async () => {
        const useremission = doc(db, "emissionsData", user.uid);  
        const emissionSnap = await getDoc(useremission);
        console.log(emissionSnap.data());

        setEmission(emissionSnap.data());  
    };

    if (!emission) {
        return null;
      }

    return (
        <TableContainer component={Paper} sx={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Total Emissions</TableCell>
                            <TableCell align="right">Electricity Emissions</TableCell>
                            <TableCell align="right">Natural Gas Emissions</TableCell>
                            <TableCell align="right">Flight Emissions</TableCell>
                            <TableCell align="right">Vehicle Emissions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key="emissions"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{emission.totalEmissions}</TableCell>
                            <TableCell align="right">{emission.electricityEmission}</TableCell>
                            <TableCell align="right">{emission.naturalGasEmission}</TableCell>
                            <TableCell align="right">{emission.flightEmissions}</TableCell>
                            <TableCell align="right">{emission.vehicleEmissions}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
    );
}