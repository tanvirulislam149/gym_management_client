"use client";
import React, { useEffect, useState } from "react";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { format, parseISO } from "date-fns";
import axios from "axios";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";

const book_class = () => {
  const user = useSelector((state) => state?.user?.user);
  const [classes, setClasses] = useState([]);
  const [scheduledClasses, setScheduledClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://gym-management-0fmi.onrender.com/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => {
        document.getElementById("errorModal").showModal();
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
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClasses();
  }, [id, limit, page]);

  const handleBookClass = (cid) => {
    setError("");
    document.getElementById("bookClassLoading").showModal();
    api_client
      .post("https://gym-management-0fmi.onrender.com/book_classes/", {
        scheduled_class: cid,
      })
      .then((res) => {
        console.log(res);
        fetchClasses();
        if (res.status === 201) {
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassSuccess").showModal();
        }
      })
      .catch((err) => {
        if (err?.response?.data?.scheduled_class?.message) {
          setError(err?.response?.data?.scheduled_class?.message);
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassError").showModal();
        } else if (err?.response?.data?.message) {
          setError(err?.response?.data?.message);
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassError").showModal();
        } else {
          document.getElementById("errorModal").showModal();
        }
      });
  };

  console.log(page, parseInt(scheduledClasses.count / limit) + 1);
  return (
    <AuthUser>
      <DashboardLayout>
        <div className="px-4">
          <p className="text-center text-3xl font-bold my-4 mb-10">
            Available Classes
          </p>
          <div className="sm:flex w-full mb-3">
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
          {loading ? (
            <div className="w-full mt-20 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : scheduledClasses?.results?.length ? (
            <>
              <table className="table bg-base-200 border border-base-200">
                {/* head */}
                <thead className="text-base">
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Instructor</th>
                    <th>Total Seats</th>
                    <th>Booked Seats</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-black">
                  {scheduledClasses?.results?.map((c, index) => (
                    <tr key={c.id}>
                      <th>{index + 1}</th>
                      <td>{c.fitness_class.name}</td>
                      <td>{format(parseISO(c.date_time), "MMMM dd, yyyy")}</td>
                      <td>{format(parseISO(c.date_time), "hh:mm aa")}</td>
                      <td>{c.instructor}</td>
                      <td>{c.total_seats}</td>
                      <td>{c.booked_seats}</td>
                      <td>
                        <button
                          disabled={
                            new Date(c.date_time) < new Date() ? true : false
                          }
                          onClick={() => {
                            user
                              ? handleBookClass(c.id)
                              : document
                                  .getElementById("my_modal_3")
                                  .showModal();
                          }}
                          className="btn btn-primary text-black mt-3"
                        >
                          Book now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  { length: parseInt(scheduledClasses.count / limit) + 1 },
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
            </>
          ) : (
            <div className="">
              <p className="text-center">No Class Available</p>
            </div>
          )}
          <Modal text={"Please login first to book a class"} />
          <dialog id="bookClassSuccess" className="modal">
            <div className="modal-box bg-white text-black">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Class booked successfully.</h3>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="bookClassError" className="modal">
            <div className="modal-box bg-white text-black">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">{error}.</h3>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="bookClassLoading" className="modal">
            <div className="modal-box bg-white text-black">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="w-full my-20 flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <ErrorModal />
        </div>
      </DashboardLayout>
    </AuthUser>
  );
};

export default book_class;
