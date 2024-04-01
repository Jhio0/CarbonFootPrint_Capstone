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
          "rgba(230, 207, 88, 0.2)", // Color for electricity
          "rgba(63, 107, 47, 0.2)", // Color for natural gas
          "rgba(135, 174, 86, 0.2)", // Color for flights
          "rgba(255, 99, 132, 0.2)", // Color for vehicle
        ],
        borderColor: [
          "rgba(230, 207, 88, 1)", // Border color for electricity
          "rgba(63, 107, 47, 1)", // Border color for natural gas
          "rgba(135, 174, 86, 1)", // Border color for flights
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
