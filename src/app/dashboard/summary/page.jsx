"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";
import { RiCurrencyFill } from "react-icons/ri";
import { MdClass } from "react-icons/md";
import { GrPlan } from "react-icons/gr";
import BarChart from "../../../../components/BarChart/BarChart";
import LineChart from "../../../../components/LineChart/LineChart";
import LineChartClass from "../../../../components/LineChartClass/LineChartClass";
import DoughnutChart from "../../../../components/Doughnut/DoughnutChart";

const Summary = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data, loading);

  useEffect(() => {
    setLoading(true);
    api_client
      .get("http://127.0.0.1:8000/dashboard/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthComp>
      <DashboardLayout>
        {loading ? (
          <div className="w-full my-20 flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
              <div className="bg-white text-black p-5 px-3 rounded-lg font-bold flex items-center">
                <div className="bg-green-300 rounded-full p-3 mr-3">
                  <RiCurrencyFill className="w-7 h-7 m-1" />
                </div>
                <div>
                  <p className="text-4xl">${data.earning.amount__sum}</p>
                  <p className="text-gray-600">Total earnings</p>
                </div>
              </div>
              <div className="bg-white text-black p-5 px-3 rounded-lg font-bold flex items-center">
                <div className="bg-green-300 rounded-full p-3 mr-3">
                  <MdClass className="w-7 h-7 m-1" />
                </div>
                <div>
                  <p className="text-4xl">
                    {data.Total_booked_class.id__count}
                  </p>
                  <p className="text-gray-600">Booked classes</p>
                </div>
              </div>
              <div className="bg-white text-black p-5 px-3 rounded-lg font-bold flex items-center">
                <div className="bg-green-300 rounded-full p-3 mr-3">
                  <GrPlan className="w-7 h-7 m-1" />
                </div>
                <div>
                  <p className="text-4xl">{data.Total_payment.id__count}</p>
                  <p className="text-gray-600">Payment records</p>
                </div>
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-5 mt-5">
              <div className="bg-white rounded-xl p-5 mb-2">
                <p className="text-lg font-bold mb-2 text-black">
                  Bookings per class
                </p>
                <LineChartClass chartData={data?.booked_class_data} />
              </div>
              <div className="bg-white rounded-xl p-5 mb-2">
                <p className="text-lg font-bold mb-2 text-black">
                  Earnings per plan
                </p>
                <BarChart chartData={data} />
              </div>
              <div className="bg-white rounded-xl p-5 mb-2">
                <p className="text-lg font-bold mb-2 text-black">
                  Bookings per plan
                </p>
                <LineChart chartData={data?.booked_plan_data} />
              </div>
              <div className="bg-white rounded-xl p-5 mb-2">
                <p className="text-lg font-bold mb-2 text-black">
                  Payments per plan
                </p>
                <DoughnutChart chartData={data?.payment_records_data} />
              </div>
            </div>
          </>
        )}
      </DashboardLayout>
    </AuthComp>
  );
};

export default Summary;
