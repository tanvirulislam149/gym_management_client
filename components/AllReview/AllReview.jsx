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

const AllReview = () => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  console.log(reviews);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://gym-management-henna.vercel.app/all_reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="m-5 sm:m-20">
      <p className="text-primary font-bold text-3xl lg:text-5xl ml-10 mb-10">
        -Reviews
      </p>
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
              <div className="h-full bg-white rounded-4xl">
                <div className="text-black p-10">
                  <div className="flex justify-center">
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
                  <br />
                  <div className="avatar flex justify-center mb-3">
                    <div className="w-24 rounded-full">
                      <img
                        src={
                          r.user.image
                            ? `https://res.cloudinary.com/tanvirulislam149/${r.user.image}`
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />
                    </div>
                  </div>
                  <p className="text-center font-bold">{r.user.email}</p>
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AllReview;
