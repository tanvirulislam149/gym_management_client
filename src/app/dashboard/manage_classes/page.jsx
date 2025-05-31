"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import axios from "axios";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";
import UpdateClassesModal from "../../../../components/UpdateClassesModal/UpdateClassesModal";

const Manage_classes = () => {
  const [classes, setClasses] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(0);
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchClasses = () => {
    setLoading(true);
    axios
      .get("https://gym-management-henna.vercel.app/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = (id) => {
    setDeleteLoading(id);
    api_client
      .delete(`/fitness_classes/${id}`)
      .then((res) => {
        if (res.status === 204) {
          fetchClasses();
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setDeleteLoading(0));
  };
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-8">Manage Classes</p>
        <div className="overflow-x-auto rounded-box border border-gray-800 bg-base-100">
          {loading ? (
            <div className="w-full h-30 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : classes.length ? (
            <table className="table">
              {/* head */}
              <thead className="bg-base-200 text-base">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {classes.map((p, index) => (
                  <tr key={p.id}>
                    <th>{index + 1}</th>
                    <td>
                      <img className="min-w-30 max-w-30" src={p.image} alt="" />
                    </td>
                    <td>{p.name}</td>
                    <td className="w-96">{p.description}</td>
                    <td>
                      <button
                        onClick={() => {
                          document
                            .getElementById("UpdateClassesModal")
                            .showModal();
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
                        className="btn bg-red-400 text-black btn-sm w-20"
                      >
                        {deleteLoading === p.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-30 flex justify-center items-center">
              <p className="text-lg font-bold">No classes found.</p>
            </div>
          )}
        </div>
        <Modal text={"Plan deleted successfully"} />
        <UpdateClassesModal id={updateId} fetchClasses={fetchClasses} />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Manage_classes;
