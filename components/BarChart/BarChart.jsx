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

export const options = {
  responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: false,
  //       text: "Chart.js Bar Chart",
  //     },
  //   },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

const BarChart = ({ chartData }) => {
  const data = {
    labels: chartData?.earning_data?.map((d) => {
      return d?.booked_plans__plans__type;
    }),
    datasets: [
      {
        label: "Total Earnings",
        data: chartData?.earning_data?.map((d) => d.total_amount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
    // datasets: chartData?.earning_data?.map((d) => {
    //   console.log(d.total_amount);
    //   return {
    //     label: "Dataset 1",
    //     data: [d?.total_amount],
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   };
    // }),
    // datasets: [
    //   {
    //     label: "Dataset 1",
    //     data: [200, 700],
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   },
    // ],
  };

  return (
    <div className="w-full">
      <Bar className="w-full" options={options} data={data} />
    </div>
  );
};

export default BarChart;
