"use client";
import React, { useEffect, useState } from "react";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { format, parseISO } from "date-fns";

const book_class = () => {
  const user = useSelector((state) => state?.user?.user);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(error);

  useEffect(() => {
    setLoading(true);
    fetch(`https://gym-management-henna.vercel.app/scheduled_classes`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .finally(() => setLoading(false));
  }, []);

  const handleBookClass = (cid) => {
    setError("");
    document.getElementById("bookClassLoading").showModal();
    api_client
      .post("https://gym-management-henna.vercel.app/book_classes/", {
        scheduled_class: cid,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassSuccess").showModal();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.scheduled_class?.message) {
          setError(err?.response?.data?.scheduled_class?.message);
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassError").showModal();
        } else if (err?.response?.data?.message) {
          setError(err?.response?.data?.message);
          document.getElementById("bookClassLoading").close();
          document.getElementById("bookClassError").showModal();
        }
      });
  };

  console.log(classes);
  return (
    <AuthUser>
      <DashboardLayout>
        <div className="px-4">
          <p className="text-center text-3xl font-bold my-4">
            Available Classes
          </p>
          {loading ? (
            <div className="w-full mt-20 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : classes.length ? (
            <table className="table bg-base-200">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Class Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Instructor</th>
                  <th>Total Seats</th>
                  <th>Booked Seats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c, index) => (
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
                            : document.getElementById("my_modal_3").showModal();
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
        </div>
      </DashboardLayout>
    </AuthUser>
  );
};

export default book_class;
