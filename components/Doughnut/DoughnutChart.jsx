import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  plugins: {
    datalabels: {
      color: "#000",
      font: {
        weight: "bold",
        size: 14,
      },
      formatter: (value) => value, // 👈 This displays raw number
    },
    legend: {
      display: true,
    },
  },
  cutout: "70%", // Makes it a doughnut chart
};

const DoughnutChart = ({ chartData }) => {
  function getRandomHexColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(getRandomHexColor());
    }
    return colors;
  }

  const data = {
    labels: chartData?.map((d) => d.booked_plans__plans__type),
    datasets: [
      {
        label: "Votes",
        data: chartData?.map((d) => d.count),
        backgroundColor: generateRandomColors(chartData?.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-70 flex justify-center">
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default DoughnutChart;
