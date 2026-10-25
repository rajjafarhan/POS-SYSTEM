import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const fmt = (n) => Number(n || 0).toLocaleString("en-US");
const short = (n) =>
  Math.abs(n) >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : Math.abs(n) >= 1e3 ? `${+(n / 1e3).toFixed(1)}K` : `${n}`;

// [{ _id: { month }, totalSum }] -> 12 values, one per month (0 when missing)
const byMonth = (rows) => {
  const out = Array(12).fill(0);
  (rows ?? []).forEach((r) => {
    const m = Number(r?._id?.month);
    if (m >= 1 && m <= 12) out[m - 1] = Number(r.totalSum) || 0;
  });
  return out;
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: { usePointStyle: true, pointStyle: "rectRounded", boxWidth: 10 },
    },
    tooltip: {
      callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(39, 38, 67, 0.06)" },
      ticks: { callback: (v) => short(v) },
    },
  },
};

export const BarChart = ({ sales, expense }) => {
  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Sales",
        data: byMonth(sales),
        backgroundColor: "#2c698d",
        borderRadius: 6,
        maxBarThickness: 28,
      },
      {
        label: "Purchases",
        data: byMonth(expense),
        backgroundColor: "#e9b44c",
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
