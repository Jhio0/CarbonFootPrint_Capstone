import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the ArcElement, Tooltip, and Legend which are used by the Doughnut component
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ selectedData }) => {
  const data = {
    labels: selectedData.map((data) => data.label),
    datasets: [
      {
        label: "Emissions",
        data: selectedData.map((data) => data.value),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Emission Data",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
