import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const UserEmissions = () =>  {

    function createData(date, totalEmissions, electricityEmissions, naturalGasEmissions, flightEmissions, vehicleEmissions) {
        return { date, totalEmissions, electricityEmissions, naturalGasEmissions, flightEmissions, vehicleEmissions };
    }
      
    const rows = [
        createData('2024-03-01', 159, 6.0, 24, 4.0),
        createData('2024-03-02', 237, 9.0, 37, 4.3),
        createData('2024-03-03', 262, 16.0, 24, 6.0),
        createData('2024-03-04', 305, 3.7, 67, 4.3),
        createData('2024-03-05', 356, 16.0, 49, 3.9),
    ];

    return (
        <TableContainer component={Paper} sx={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Total Emissions</TableCell>
                            <TableCell align="right">Electricity Emissions</TableCell>
                            <TableCell align="right">Natural Gas Emissions</TableCell>
                            <TableCell align="right">Flight Emissions</TableCell>
                            <TableCell align="right">Vehicle Emissions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.date}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.totalEmissions}</TableCell>
                                <TableCell align="right">{row.electricityEmissions}</TableCell>
                                <TableCell align="right">{row.naturalGasEmissions}</TableCell>
                                <TableCell align="right">{row.flightEmissions}</TableCell>
                                <TableCell align="right">{row.vehicleEmissions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
    );
}
