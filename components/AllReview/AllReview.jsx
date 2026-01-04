"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import Modal from "../Modal/Modal";
import ErrorModal from "../ErrorModal/ErrorModal";

const AllReview = () => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://gym-management-0fmi.onrender.com/all_reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="m-5 sm:m-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-green-900/20 rounded-full text-green-400 text-sm font-semibold mb-6 border border-green-800/50">
          <FaQuoteLeft className="mr-2" /> MEMBER TESTIMONIALS
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Hear From Our <span className="text-green-500">Community</span>
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Don't just take our word for it. See what our members have to say
          about their PrimeFit experience.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center h-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <Swiper
          // install Swiper modules
          spaceBetween={30}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {reviews?.map((r) => (
            <SwiperSlide key={r.id}>
              <div className="h-full bg-gray-800/70 border-1 border-gray-500 rounded-2xl">
                <div className="text-gray-400 p-10">
                  <div className="flex">
                    <div className="avatar flex justify-center mb-3">
                      <div className="w-16 h-16 rounded-full">
                        <img
                          src={
                            r.user.image
                              ? `https://res.cloudinary.com/tanvirulislam149/${r.user.image}`
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="w-8/12 ml-4">
                      <p className="font-bold">{r.user.email}</p>
                      <div className="flex">
                        <div className="rating">
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
                  </div>
                  <FaQuoteLeft />
                  <p className="text-gray-300 text-lg mb-1 italic leading-relaxed">
                    {r.comment}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <ErrorModal />
    </div>
  );
};

export default AllReview;
