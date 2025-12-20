"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import axios from "axios";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";
import UpdatePlanModal from "../../../../components/UpdatePlan/UpdatePlan";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";

const Manage_plan = () => {
  const [plans, setPlans] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(0);
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    setLoading(true);
    axios
      .get("https://gym-management-henna.vercel.app/plans/")
      .then((res) => setPlans(res.data))
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    setDeleteLoading(id);
    api_client
      .delete(`/plans/${id}`)
      .then((res) => {
        if (res.status === 204) {
          fetchPlans();
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setDeleteLoading(0));
  };

  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-10">Manage Plan</p>
        <div className="overflow-x-auto rounded-box border border-gray-800 bg-base-100">
          {loading ? (
            <div className="w-full h-30 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : (
            <table className="table">
              {/* head */}
              <thead className="bg-base-200 text-base">
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Months</th>
                  <th>Price</th>
                  <th>Classes</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p, index) => (
                  <tr key={p.id}>
                    <th>{index + 1}</th>
                    <td>{p.type}</td>
                    <td>{p.months}</td>
                    <td>{p.price}</td>
                    <td>
                      {p.fitness_classes.map((c) => (
                        <p key={c.id}>{c.name}</p>
                      ))}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          document.getElementById("update_plan").showModal();
                          setUpdateId(p.id);
                        }}
                        className="btn bg-green-400 text-black btn-sm"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn bg-red-400 w-20 text-black btn-sm"
                      >
                        {deleteLoading === p.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Modal text={"Plan deleted successfully"} />
        <UpdatePlanModal id={updateId} fetchPlans={fetchPlans} />
        <ErrorModal />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Manage_plan;
