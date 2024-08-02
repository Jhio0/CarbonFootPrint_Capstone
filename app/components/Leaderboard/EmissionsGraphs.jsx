"use client"

import React from "react"
import { Line } from "react-chartjs-2";
import "chart.js/auto";


export default function EmissionsGraphs( {carbonEmissions, methaneEmissions} ) {
    const data ={
        labels: ["Carbon", "Methane"],
        datasets: [
            {
                label: "Emissions",
                data: [carbonEmissions, methaneEmissions],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
            }
        ]
    };

    return (
        <div>
            <h2>Emissions</h2>
            <Line
            datasetIdKey='id'
            data={{
                labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                datasets: [
                {
                    id: 1,
                    label: '',
                    data: [5, 6, 7],
                },
                {
                    id: 2,
                    label: '',
                    data: [3, 2, 1],
                },
                ],
            }}
            />
        </div>
    );
}
