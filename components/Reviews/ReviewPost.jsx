import api_client from "@/api_client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import ErrorModal from "../ErrorModal/ErrorModal";

const ReviewPost = ({ id, fetchReview }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const user = useSelector((state) => state?.user?.user);

  const handleReview = (e) => {
    e.preventDefault();
    if (!e.target.comment.value || !e.target.post_rating.value) {
      setErrMsg("Please enter ratings and comment properly.");
      document.getElementById("reviewErr").showModal();
      return;
    }
    setLoading(true);
    api_client
      .post(`/fitness_classes/${id}/reviews/`, {
        rating: parseInt(e.target.post_rating.value),
        comment: e.target.comment.value,
      })
      .then((res) => {
        fetchReview();
        document.getElementById("myForm").reset();
      })
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };
  return (
    <form id="myForm" onSubmit={(e) => handleReview(e)} className="my-4">
      <div>
        <label htmlFor="" className="font-bold text-xl">
          Rating:
        </label>
        <br />
        <div className="rating post_review">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              value={star}
              name={`post_rating`}
              className="mask mask-star-2 bg-green-400"
              aria-label="1 star"
            />
          ))}
        </div>
      </div>
      <br />
      <label htmlFor="" className="font-bold text-xl">
        Comment:
      </label>
      <br />
      <textarea
        name="comment"
        className="textarea lg:w-1/2 w-full"
        placeholder="Enter your comment"
        id=""
      ></textarea>
      <br />
      {!user && (
        <p className="text-red-400">Please login first to give review.</p>
      )}
      <input
        type="submit"
        disabled={loading || !user}
        value={loading ? "Submitting..." : "Submit"}
        className="btn btn-primary mt-2 text-black disabled:text-gray-400"
      />
      <ErrorModal />
      {/* Modal For review error */}
      <dialog id="reviewErr" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 style={{ whiteSpace: "pre-line" }} className="font-bold text-lg">
            {errMsg}
          </h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </form>
  );
};

export default ReviewPost;
