"use client";
import api_client from "@/api_client";
import React, { useState } from "react";

const BookPlanBtn = ({ id }) => {
  const [error, setError] = useState("");
  const handleBookPlan = () => {
    setError("");
    api_client
      .post("http://127.0.0.1:8000/book_plans/", { plans: id })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          document.getElementById("bookPlanSuccessful").showModal();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById(`bookPlan${id}`).showModal();
        }}
        className="btn bg-green-400 hover:bg-white my-3 text-black border-none"
      >
        Book Plan
      </button>
      <dialog id={`bookPlan${id}`} className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Are you sure you want to book this plan?
          </h3>
          <p className="text-sm">
            [N.B: You can only select the plan for once.]
          </p>
          {error ? <p>{error}</p> : ""}
          <div className="flex justify-around mt-6">
            <button
              onClick={handleBookPlan}
              className="btn text-base btn-success text-black"
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn text-base btn-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="bookPlanSuccessful" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Plan booked successfully.</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookPlanBtn;
