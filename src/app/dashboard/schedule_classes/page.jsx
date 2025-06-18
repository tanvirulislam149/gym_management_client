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
import AttendenceModal from "../../../../components/Attendence/AttendenceModal";

const Schedule_classes = () => {
  const [scheduledClasses, setScheduledClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [id, setId] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [attendenceId, setAttendenceId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://gym-management-0fmi.onrender.com/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchClasses = () => {
    setLoading(true);
    axios
      .get(
        `https://gym-management-0fmi.onrender.com/scheduled_classes/?fitness_class_id=${id}&limit=${limit}&offset=${
          (page - 1) * limit
        }`
      )
      .then((res) => {
        setScheduledClasses(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    setDeleteLoading(true);
    api_client
      .delete(
        `https://gym-management-0fmi.onrender.com/scheduled_classes/${id}/`
      )
      .then((res) => {
        if (res.status === 204) {
          setDeleteLoading(false);
          fetchClasses();
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClasses();
  }, [id, limit, page]);
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-4">Schedule Classes</p>
        <div className="md:flex justify-between my-3">
          <div className="sm:flex w-full">
            <select
              defaultValue="Pick a class"
              onChange={(e) => setId(e.target.value)}
              className="select bg-white text-black border border-black sm:w-60 w-full"
            >
              <option value="">Filter by class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setPage(1);
                setLimit(e.target.value);
              }}
              className="select bg-white text-black border border-black sm:w-60 w-full"
            >
              <option value={5}>Show 5 items</option>
              <option value={10}>Show 10 items</option>
              <option value={25}>Show 25 items</option>
              <option value={50}>Show 50 items</option>
            </select>
          </div>
          <button
            onClick={() =>
              document.getElementById("CreateClassModal").showModal()
            }
            className="btn bg-green-400 text-black"
          >
            Create a class schedule
          </button>
        </div>
        <div className="overflow-x-auto rounded-box border border-gray-800">
          {loading ? (
            <div className="w-full my-20 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : scheduledClasses.results?.length ? (
            <table className="table">
              {/* head */}
              <thead className="bg-base-200">
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {scheduledClasses?.results?.map((p, index) => (
                  <tr className="border-b-gray-700" key={p.id}>
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
                            .getElementById("attendenceModal")
                            .showModal();
                          setAttendenceId(p.id);
                        }}
                        className="btn bg-green-400 text-black btn-sm w-full text-sm"
                      >
                        Attendence
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          document
                            .getElementById("updateScheduledClassModal")
                            .showModal();
                          setUpdateId(p.id);
                        }}
                        className="btn bg-green-400 text-black btn-sm w-full text-sm my-1"
                      >
                        Update
                      </button>
                      <br />
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn bg-red-400 text-black btn-sm w-full text-sm"
                      >
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-screen mt-20">
              <p className="text-center font-bold text-2xl">No classes found</p>
            </div>
          )}
        </div>
        <div className="join mt-3">
          <button
            onClick={() => {
              page !== 1 ? setPage(page - 1) : "";
            }}
            className="join-item btn"
          >
            «
          </button>
          {Array.from(
            { length: scheduledClasses.count / limit + 1 },
            (_, i) => i + 1
          ).map((e) => (
            <button
              key={e}
              onClick={() => setPage(e)}
              className={`join-item btn ${
                page === e ? "bg-green-400 text-black" : ""
              }`}
            >
              {e}
            </button>
          ))}
          <button
            onClick={() => {
              page !== parseInt(scheduledClasses.count / limit) + 1
                ? setPage(page + 1)
                : "";
            }}
            className="join-item btn"
          >
            »
          </button>
        </div>
        <Modal text={"Class deleted."} />
        <CreateClassModal fetchClasses={fetchClasses} classes={classes} />
        <UpdateScheduledClassModal
          fetchClasses={fetchClasses}
          classes={classes}
          updateId={updateId}
        />
        <AttendenceModal id={attendenceId} fetchClasses={fetchClasses} />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Schedule_classes;
