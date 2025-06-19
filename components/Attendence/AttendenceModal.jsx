"use client";
import api_client from "@/api_client";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ErrorModal from "../ErrorModal/ErrorModal";

const AttendenceModal = ({ id, fetchClasses }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendenceClass = () => {
    setLoading(true);
    api_client
      .get(
        `https://gym-management-0fmi.onrender.com/attendence/?scheduled_class_id=${id}`
      )
      .then((res) => setClasses(res.data))
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchAttendenceClass();
    }
  }, [id]);

  const handleAttendence = (scheduled_class, value) => {
    const data = { ...scheduled_class, attendence: value };
    api_client
      .put(
        `https://gym-management-0fmi.onrender.com/attendence/${scheduled_class.id}/`,
        data
      )
      .then((res) => {
        fetchClasses();
        fetchAttendenceClass();
      })
      .catch((err) => document.getElementById("errorModal").showModal());
  };

  return (
    <dialog id="attendenceModal" className="modal">
      <div className="modal-box bg-white text-black w-3/4 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="overflow-x-auto rounded-box text-black">
          {loading ? (
            <div className="w-full h-30 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : classes.length ? (
            <table className="table text-black">
              {/* head */}
              <thead className="text-black">
                <tr>
                  <th>#</th>
                  <th>User Email</th>
                  <th>Class Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {classes?.map((p, index) => (
                  <tr key={p.id}>
                    <th>{index + 1}</th>
                    <td>{p.user.email}</td>
                    <td>{p.scheduled_class.fitness_class.name}</td>
                    <td>
                      {format(
                        parseISO(p.scheduled_class.date_time),
                        "MMMM dd, yyyy"
                      )}
                    </td>
                    <td>
                      {format(
                        parseISO(p.scheduled_class.date_time),
                        "hh:mm aa"
                      )}
                    </td>
                    <td>{p.attendence}</td>
                    <td>
                      <select
                        onChange={(e) => handleAttendence(p, e.target.value)}
                        defaultValue={p.attendence}
                        className="select bg-white text-black border border-black"
                      >
                        <option disabled={true}>Pick a color</option>
                        <option value={"Absent"}>Absent</option>
                        <option value={"Present"}>Present</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center font-bold">
              No student booked this class.
            </p>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <ErrorModal />
    </dialog>
  );
};

export default AttendenceModal;
