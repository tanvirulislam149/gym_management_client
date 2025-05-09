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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const fetchClasses = () => {
    axios
      .get("https://gym-management-henna.vercel.app/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = (id) => {
    setDeleteLoading(true);
    api_client
      .delete(`/fitness_classes/${id}`)
      .then((res) => {
        if (res.status === 204) {
          setDeleteLoading(false);
          fetchClasses();
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-4">Manage Classes</p>
        <div className="overflow-x-auto rounded-box border border-gray-800 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
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
                    <img className="w-30" src={p.image} alt="" />
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
                      className="btn bg-red-400 text-black btn-sm"
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal text={"Plan deleted successfully"} />
        <UpdateClassesModal id={updateId} fetchClasses={fetchClasses} />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Manage_classes;
