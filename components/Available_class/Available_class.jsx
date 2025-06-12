"use client";
import React, { useEffect, useState } from "react";
import api_client from "@/api_client";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

const Available_class = ({ id }) => {
  const user = useSelector((state) => state?.user?.user);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://gym-management-henna.vercel.app/scheduled_classes/?fitness_class_id=${id}`
    )
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
        }
      });
  };
  return (
    <div className="px-4 overflow-y-auto lg:h-[500px]">
      <p className="text-center text-2xl font-bold my-3 border-b-2">
        Available Classes
      </p>
      {loading ? (
        <div className="w-full mt-20 flex justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : classes.length ? (
        classes.map((c) => (
          <div key={c.id} className="card bg-base-200 my-4 w-full lg:w-90">
            <div className="card-body">
              <h2 className="text-lg">
                <span className="font-bold">Time: </span>
                {new Date(c.date_time).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <hr />
              <h2 className="text-lg">
                <span className="font-bold">Instructor: </span>
                {c.instructor}
              </h2>
              <hr />
              <h2 className="text-lg">
                <span className="font-bold">Total Seats: </span>
                {c.total_seats}
              </h2>
              <hr />
              <div className="card-actions justify-end">
                <button
                  disabled={new Date(c.date_time) < new Date() ? true : false}
                  onClick={() => {
                    user
                      ? handleBookClass(c.id)
                      : document.getElementById("my_modal_3").showModal();
                  }}
                  className="btn btn-primary text-black mt-3"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))
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
  );
};

export default Available_class;
