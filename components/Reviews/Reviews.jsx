"use client";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import api_client from "@/api_client";
import axios from "axios";
import ReviewPost from "./ReviewPost";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  console.log(reviews);
  const fetchReview = () => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/fitness_classes/${id}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReview();
  }, []);
  return (
    <div className="my-20">
      <p className="text-primary font-bold text-3xl lg:text-5xl mb-10">
        -Reviews
      </p>
      <ReviewPost id={id} fetchReview={fetchReview} />
      {loading ? (
        <div className="flex justify-center h-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {reviews?.length ? (
            reviews.map((r) => (
              <div key={r.id} className="h-full bg-white rounded-4xl">
                <div className="text-black p-5">
                  <div className="flex items-center mb-3">
                    <div className="avatar flex justify-center mr-2">
                      <div className="w-14 rounded-full">
                        <img
                          src={
                            r.user.image
                              ? `https://res.cloudinary.com/tanvirulislam149/${r.user.image}`
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-center font-bold">{r.user.email}</p>
                      <div className="rating review_rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`rating-${r.id}`}
                            className="mask mask-star-2 bg-green-500"
                            aria-label="1 star"
                            checked={r.rating === star}
                            readOnly
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <FaQuoteLeft />
                  <p>{r.comment}</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    consectetur adipisicing
                  </p>
                  <div className="flex justify-end">
                    <FaQuoteRight />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      )}
      {!reviews?.length && !loading && (
        <div className="text-center">
          <p className="font-bold text-xl">No reviews found</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
