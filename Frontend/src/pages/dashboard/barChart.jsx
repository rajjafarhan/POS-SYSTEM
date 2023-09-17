import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Sales vs Expenses BarChart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: [65, 51, 30, 45, 46, 55, 40],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Expense",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const BarChart = () => {
  return <Bar options={options} data={data} />;
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const data2 = {
  labels2,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [1, 2, 3, 53, 2, 43, 76, 23, 7],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Area() {
  return <Line options={options2} data={data2} />;
}
