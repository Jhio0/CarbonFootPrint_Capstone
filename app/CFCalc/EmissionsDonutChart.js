import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const EmissionDonutChart = ({
  electricityEmission,
  naturalGasEmission,
  flightEmission,
}) => {
  const totalEmission =
    electricityEmission + naturalGasEmission + flightEmission;
  const data = {
    labels: ["Electricity", "Natural Gas", "Flights"],
    datasets: [
      {
        label: "Carbon Emissions",
        data: [electricityEmission, naturalGasEmission, flightEmission],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)", // Color for flights
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)", // Border color for flights
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
      subtitle: {
        display: true,
        text: `Total: ${totalEmission} kg CO2e`,
        position: "bottom",
      },
    },
    cutout: "70%",
  };

  return <Doughnut data={data} options={options} />;
};

export default EmissionDonutChart;
