"use client";
import React, { useEffect, useState } from "react";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";

const My_plans = () => {
  const [payments, setPayments] = useState([]);
  const [plan, setPlan] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    api_client
      .get("http://127.0.0.1:8000/payment/")
      .then((res) => setPayments(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api_client
      .get("http://127.0.0.1:8000/book_plans/")
      .then((res) => {
        if (res.data[0].current_plan_days !== "No active plan") {
          setActive(true);
        }
        if (res.data[0].plans.id) {
          api_client
            .get(`http://127.0.0.1:8000/plans/${res.data[0].plans.id}`)
            .then((res) => setPlan(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AuthUser>
      <DashboardLayout>
        <div>
          <p className="text-3xl font-bold text-center mb-8">My plan</p>
          <div className="lg:flex justify-between">
            <div className="w-7/12">
              <div className="overflow-x-auto bg-white rounded-lg">
                <p className="text-xl font-bold text-black text-center my-4">
                  Payments
                </p>
                <table className="table text-black">
                  {/* head */}
                  <thead className="text-black">
                    <tr>
                      <th>#</th>
                      <th>Plan Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p, index) => (
                      <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.booked_plans.plans.type}</td>
                        <td>{p.start_date}</td>
                        <td>{p.end_date}</td>
                        <td>{p.amount}</td>
                        <td>{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-5/12">
              <div className="card mx-auto bg-base-200 image-full w-65 rounded-none shadow-sm">
                <p className="text-right -mt-3">
                  {active ? (
                    <span className="bg-green-400 text-black px-3 py-2 rounded-full font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-400 text-black px-3 py-2 rounded-full font-bold">
                      Not Active
                    </span>
                  )}
                </p>
                <div className="card-body">
                  <h2 className="text-4xl font-bold text-green-400">
                    {plan?.price} BDT
                  </h2>
                  <h2 className="text-xl font-bold leading-none mt-4">
                    {plan?.type}
                  </h2>
                  <h2 className="text-xl font-bold leading-none mb-4">
                    Membership
                  </h2>
                  <ul>
                    {plan?.fitness_classes?.map((c) => (
                      <li key={c.id} className="text-lg py-2">
                        {c.name}
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthUser>
  );
};

export default My_plans;
