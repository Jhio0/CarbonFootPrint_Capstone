import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const EmissionDonutChart = ({
  electricityEmission,
  naturalGasEmission,
  flightEmission,
  vehicleEmission,
}) => {
  const data = {
    labels: ["Electricity", "Natural Gas", "Flights", "Vehicle"],
    datasets: [
      {
        label: "Carbon Emissions",
        data: [
          electricityEmission,
          naturalGasEmission,
          flightEmission,
          vehicleEmission,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)", // Color for flights
          "rgba(255, 99, 132, 0.2)", // Color for vehicle
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)", // Border color for flights
          "rgba(255, 99, 132, 1)", // Border color for vehicle
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Carbon Emissions Breakdown",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label +=
                new Intl.NumberFormat("en-US", { style: "decimal" }).format(
                  context.parsed
                ) + " kg CO2e";
            }
            return label;
          },
        },
      },
    },
    cutout: "70%",
  };

  return <Doughnut data={data} options={options} />;
};

export default EmissionDonutChart;