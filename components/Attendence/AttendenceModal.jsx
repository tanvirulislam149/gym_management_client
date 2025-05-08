"use client";
import api_client from "@/api_client";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";

const AttendenceModal = ({ id, fetchClasses }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (id) {
      api_client
        .get(`http://127.0.0.1:8000/attendence/?scheduled_class_id=${id}`)
        .then((res) => setClasses(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleAttendence = (scheduled_class, value) => {
    const data = { ...scheduled_class, attendence: value };
    api_client
      .put(`http://127.0.0.1:8000/attendence/${scheduled_class.id}/`, data)
      .then((res) => {
        console.log(res);
        fetchClasses();
        document.getElementById("attendenceModal").close();
      })
      .catch((err) => console.log(err));
  };

  console.log(classes, id);
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
          {classes.length ? (
            <table className="table text-black">
              {/* head */}
              <thead className="text-black">
                <tr>
                  <th>#</th>
                  <th>User Email</th>
                  <th>Class Name</th>
                  <th>Date</th>
                  <th>Time</th>
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
            <p className="text-center font-bold">No class available</p>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AttendenceModal;
