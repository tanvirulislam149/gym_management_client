"use client";
import React, { useEffect, useState } from "react";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";
import { format, parseISO } from "date-fns";
import PaymentModal from "../../../../components/PaymentModal/PaymentModal";

const My_plans = () => {
  const [payments, setPayments] = useState([]);
  const [plan, setPlan] = useState();
  const [booked_plan, setBooked_plan] = useState();
  const [active, setActive] = useState("No active plan");

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
        setBooked_plan(res.data);
        if (res?.data[0]?.current_plan_days) {
          setActive(res?.data[0]?.current_plan_days);
        }
        if (res?.data[0]?.plans?.id) {
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
            <div className="w-8/12">
              <div className="flex justify-between">
                <div className="bg-white p-2 w-full text-black mb-4 rounded-lg">
                  <p>
                    <span className="font-bold">Current Plan Dates : </span>
                    {active != "No active plan" ? (
                      <span>
                        {format(
                          parseISO(active?.split(" to ")[0]),
                          "MMMM dd, yyyy"
                        )}{" "}
                        to{" "}
                        {format(
                          parseISO(active?.split(" to ")[1]),
                          "MMMM dd, yyyy"
                        )}
                      </span>
                    ) : (
                      active
                    )}
                  </p>
                </div>
                <div className="w-2/12 flex justify-end">
                  <button
                    onClick={() =>
                      document.getElementById("payment_modal").showModal()
                    }
                    className="btn ml-auto btn-primary text-black"
                  >
                    Pay now
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto bg-white rounded-lg">
                <p className="text-xl font-bold text-black text-center my-4">
                  Payments
                </p>
                {payments.length ? (
                  <table className="table text-black mb-3">
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
                          <td>
                            {format(parseISO(p.start_date), "MMMM dd, yyyy")}
                          </td>
                          <td>
                            {format(parseISO(p.end_date), "MMMM dd, yyyy")}
                          </td>
                          <td>{p.amount}</td>
                          <td>
                            <span className="bg-green-400 text-black px-4 py-2 rounded-full font-bold">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-black text-center mb-5 text-lg">
                    No payments done yet
                  </p>
                )}
              </div>
            </div>
            <div className="w-4/12">
              <div className="card mx-auto bg-base-200 image-full w-65 rounded-none shadow-sm">
                <p className="text-right -mt-3">
                  {active !== "No active plan" ? (
                    <span className="bg-green-400 text-black px-3 py-2 rounded-full font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-400 text-black px-3 py-2 rounded-full font-bold">
                      Not Active
                    </span>
                  )}
                </p>
                <div className="card-body mt-5">
                  {plan ? (
                    <>
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
                    </>
                  ) : (
                    <p className="text-base font-bold">No plan booked</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaymentModal booked_plan={booked_plan} />
      </DashboardLayout>
    </AuthUser>
  );
};

export default My_plans;
