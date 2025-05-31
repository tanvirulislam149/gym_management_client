"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData }) => {
  const data = {
    labels: chartData?.earning_data?.map((d) => {
      return d?.booked_plans__plans__type;
    }),
    datasets: [
      {
        label: "Total Earnings",
        data: chartData?.earning_data?.map((d) => d.total_amount),
        backgroundColor: "#7bf1a8",
      },
    ],
  };

  return (
    <div className="w-full">
      <Bar className="w-full" data={data} />
    </div>
  );
};

export default BarChart;
