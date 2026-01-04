"use client";
import api_client from "@/api_client";
import React, { useEffect, useState } from "react";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { format, parseISO } from "date-fns";
import Modal from "../../../../components/Modal/Modal";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";

const My_classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api_client
      .get("https://gym-management-0fmi.onrender.com/attendence/")
      .then((res) => setClasses(res.data))
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthUser>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-8">My Classes</p>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
          {loading ? (
            <div className="w-full my-20 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : classes.length ? (
            <table className="table">
              {/* head */}
              <thead className="text-base">
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Class Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Instructor</th>
                  <th>Attendence</th>
                </tr>
              </thead>
              <tbody className="bg-black">
                {classes.map((c, index) => (
                  <tr key={c.id}>
                    <th>{index + 1}</th>
                    <td>{c.user.email}</td>
                    <td>{c.scheduled_class.fitness_class.name}</td>
                    <td>
                      {format(
                        parseISO(c.scheduled_class.date_time),
                        "MMMM dd, yyyy"
                      )}
                    </td>
                    <td>
                      {format(
                        parseISO(c.scheduled_class.date_time),
                        "hh:mm aa"
                      )}
                    </td>
                    <td>{c.scheduled_class.instructor}</td>
                    <td>
                      {c.attendence == "Present" ? (
                        <span className="bg-green-400 text-black px-3 py-2 rounded-full font-bold">
                          Present
                        </span>
                      ) : (
                        <span className="bg-red-400 text-black px-3 py-2 rounded-full font-bold">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p className="my-20 text-center font-bold">No classes found.</p>
            </div>
          )}
        </div>
        <ErrorModal />
      </DashboardLayout>
    </AuthUser>
  );
};

export default My_classes;
