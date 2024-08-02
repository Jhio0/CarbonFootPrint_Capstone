import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components used by the Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ ownerEmissions }) => {
  const data = {
    labels: ownerEmissions.map((data) => data.label),
    datasets: [{
      label: "Count",
      data: ownerEmissions.map((data) => data.value),
      backgroundColor: [
        "rgba(43, 63, 229, 0.8)",
        "rgba(250, 192, 19, 0.8)",
        "rgba(253, 135, 135, 0.8)",
      ],
      borderRadius: 5,
    }],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide labels along the x-axis
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Revenue Source",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
