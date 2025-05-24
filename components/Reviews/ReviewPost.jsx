import api_client from "@/api_client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ReviewPost = ({ id, fetchReview }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  const handleReview = (e) => {
    e.preventDefault();
    setLoading(true);
    api_client
      .post(`http://127.0.0.1:8000/fitness_classes/${id}/reviews/`, {
        rating: parseInt(e.target.post_rating.value),
        comment: e.target.comment.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchReview();
        document.getElementById("myForm").reset();
      })
      .catch((err) => console.log(err))
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
    </form>
  );
};

export default ReviewPost;
