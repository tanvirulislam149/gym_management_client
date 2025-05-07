"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import CreateClassModal from "../../../../components/CreateClassModal/CreateClassModal";
import axios from "axios";
import { format, parseISO } from "date-fns";
import UpdateScheduledClassModal from "../../../../components/UpdateSchedulecClass/UpdateScheduledClassModal";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";

const Schedule_classes = () => {
  const [scheduledClasses, setScheduledClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [id, setId] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchClasses = () => {
    axios
      .get(`http://127.0.0.1:8000/scheduled_classes/?fitness_class_id=${id}`)
      .then((res) => {
        setScheduledClasses(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setDeleteLoading(true);
    api_client
      .delete(`http://127.0.0.1:8000/scheduled_classes/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log(res);
          setDeleteLoading(false);
          fetchClasses();
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClasses();
  }, [id]);
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-4">Schedule Classes</p>
        <div className="flex justify-between my-3">
          <select
            defaultValue="Pick a class"
            onChange={(e) => setId(e.target.value)}
            className="select bg-white text-black border border-black"
          >
            <option value="">Filter by class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              document.getElementById("CreateClassModal").showModal()
            }
            className="btn bg-green-400 text-black"
          >
            Schedule A Class
          </button>
        </div>
        <div className="overflow-x-auto rounded-box border border-gray-800 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Instructor</th>
                <th>
                  Total <br />
                  Seats
                </th>
                <th>
                  Booked <br /> Seats
                </th>
                <th>
                  Present <br /> Students
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {scheduledClasses.map((p, index) => (
                <tr key={p.id}>
                  <th>{index + 1}</th>
                  <td>{p.fitness_class.name}</td>
                  <td>{format(parseISO(p.date_time), "MMMM dd, yyyy")}</td>
                  <td>{format(parseISO(p.date_time), "hh:mm aa")}</td>
                  <td>{p.instructor}</td>
                  <td>{p.total_seats}</td>
                  <td>{p.booked_seats}</td>
                  <td>{p.present_students}</td>
                  <td>
                    <button
                      onClick={() => {
                        document
                          .getElementById("updateScheduledClassModal")
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
        <Modal text={"Class deleted."} />
        <CreateClassModal fetchClasses={fetchClasses} classes={classes} />
        <UpdateScheduledClassModal
          fetchClasses={fetchClasses}
          classes={classes}
          updateId={updateId}
        />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Schedule_classes;
