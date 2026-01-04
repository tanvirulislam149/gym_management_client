"use client";
import api_client from "@/api_client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const BookPlanBtn = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const handleBookPlan = () => {
    setLoading(true);
    api_client
      .post("https://gym-management-0fmi.onrender.com/book_plans/", {
        plans: plan.id,
      })
      .then((res) => {
        if (res.status === 201) {
          document.getElementById("bookPlanSuccessful").showModal();
        }
      })
      .catch((err) => {
        document.getElementById("bookPlanError").showModal();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById(`bookPlan${plan.id}`).showModal();
        }}
        // className="btn bg-green-400 hover:bg-white my-3 text-black border-none"
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          plan.type === "Pro"
            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        Book Plan
      </button>
      <dialog id={`bookPlan${plan.id}`} className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {user ? (
            <div className="text-center mt-1">
              <h3 className="font-bold text-lg">
                Are you sure you want to book this plan?
              </h3>
              <p className="text-sm">
                [N.B: You can only select the plan for once.]
              </p>
              <div className="flex justify-end mt-6">
                <form method="dialog">
                  <button className="btn text-base w-30 mr-5 btn-error">
                    No
                  </button>
                </form>
                <button
                  disabled={loading}
                  onClick={handleBookPlan}
                  className="btn text-base w-30 btn-success text-black"
                >
                  {loading ? "Processing..." : "Yes"}
                </button>
              </div>
            </div>
          ) : (
            <p className="font-bold text-center">
              Please login first to book a plan
            </p>
          )}
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
          <h3 className="font-bold text-lg"> Plan booked successfully.</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="bookPlanError" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            You can't book multiple plans. Please renew your plan from
            "Dashboard/My plans".
          </h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookPlanBtn;
