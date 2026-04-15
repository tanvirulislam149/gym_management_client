"use client";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import api_client from "@/api_client";
import axios from "axios";
import ReviewPost from "./ReviewPost";
import Modal from "../Modal/Modal";
import ErrorModal from "../ErrorModal/ErrorModal";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReview = () => {
    setLoading(true);
    axios
      .get(
        `https://gym-management-0fmi.onrender.com/fitness_classes/${id}/reviews/`,
      )
      .then((res) => setReviews(res.data))
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReview();
  }, []);
  return (
    <div className="my-5">
      <div className="bg-[#13161c] rounded-2xl border border-gray-800/60 p-6 shadow-xl">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-5">
          <h3 className="text-xl font-semibold text-white border-l-4 border-green-500 pl-3">
            Member reviews
          </h3>
          <span className="bg-[#1e2a24] text-green-300 text-xs px-3 py-1 rounded-full">
            {reviews.length} review
            {reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
          {reviews.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            reviews.map((review) => (
              <div className="border-b border-gray-600 pb-4 last:border-0">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-white">
                      {review.user.email}
                    </span>
                  </div>
                  <div className="rating review_rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${review.id}`}
                        className="mask mask-star-2 w-4 h-4 bg-green-500"
                        aria-label="1 star"
                        checked={review.rating === star}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic text-sm mt-2">
                  "{review.comment}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <ReviewPost fetchReview={fetchReview} id={id} />
      <ErrorModal />
    </div>
  );
};

export default Reviews;
