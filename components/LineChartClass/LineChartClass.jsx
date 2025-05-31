"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }) => {
  const data = {
    labels: chartData?.map((d) => {
      return d?.scheduled_class__fitness_class__name;
    }),
    datasets: [
      {
        label: "total class count",
        fill: true,
        data: chartData?.map((d) => d.count),
        borderColor: "rgb(22, 125, 45)",
        backgroundColor: "rgb(167, 252, 186)",
      },
    ],
  };
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
