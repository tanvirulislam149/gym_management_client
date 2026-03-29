import Image from "next/image";
import React from "react";
import Available_class from "../../../../components/Available_class/Available_class";
import Reviews from "../../../../components/Reviews/Reviews";

const ClassDetails = async ({ params }) => {
  const { id } = await params;
  const data = await fetch(
    `https://gym-management-0fmi.onrender.com/fitness_classes/${id}`,
  );
  const fitness_class = await data.json();
  return (
    // <div className="min-h-screen mx-5 lg:mx-20 p-2 lg:p-10">
    //   <div className="lg:flex">
    //     <div className="lg:w-4/6">
    //       <Image
    //         className="w-full"
    //         src={fitness_class.image}
    //         width={500}
    //         height={500}
    //         alt="Picture of the author"
    //       />
    //     </div>
    //     <div className="lg:w-2/6 w-full border border-gray-700 lg:mx-10 mt-5 lg:mt-0">
    //       <Available_class id={fitness_class.id} />
    //     </div>
    //   </div>
    //   <div className="py-10">
    //     <p className="text-3xl font-bold my-4">{fitness_class.name}</p>
    //     <hr />
    //     <p className="pt-5">{fitness_class.description}</p>
    //     <Reviews id={fitness_class.id} />
    //   </div>
    // </div>
    <div className="mx-5 lg:mx-20 p-2 lg:px-10 pt-5">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={fitness_class.image}
          alt={fitness_class.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            {fitness_class.name}
          </h1>
          {/* <div className="flex items-center gap-3 mt-2">
          <StarRating rating={avgRating} size="text-2xl" />
          <span className="text-gray-300 text-sm">
            {avgRating > 0
              ? `${avgRating} · ${fitness_class.reviews.length} review${fitness_class.reviews.length !== 1 ? "s" : ""}`
              : "No reviews yet"}
          </span>
        </div> */}
        </div>
      </div>
      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-[#13161c] rounded-2xl border border-gray-600 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-white border-l-4 border-green-500 pl-3 mb-4">
              About this class
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {fitness_class.description}
            </p>
          </div>

          {/* Reviews
          <div className="bg-[#13161c] rounded-2xl border border-gray-800/60 p-6 shadow-xl">
            <div className="flex justify-between items-center flex-wrap gap-2 mb-5">
              <h3 className="text-xl font-semibold text-white border-l-4 border-green-500 pl-3">
                💬 Member reviews
              </h3>
              <span className="bg-[#1e2a24] text-green-300 text-xs px-3 py-1 rounded-full">
                {localClass.reviews.length} review
                {localClass.reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
              {localClass.reviews.length === 0 ? (
                <div className="text-center text-gray-400 py-6">
                  ✨ No reviews yet. Be the first to share your experience!
                </div>
              ) : (
                localClass.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))
              )}
            </div>
          </div>

          Review form
          <div className="bg-[#13161c] rounded-2xl border border-gray-800/60 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-white border-l-4 border-green-500 pl-3 mb-5">
              ✍️ Write a review
            </h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating
                </label>
                <InteractiveStars
                  rating={reviewRating}
                  onRatingChange={setReviewRating}
                  size="text-3xl"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your review
                </label>
                <textarea
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 text-white resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all"
              >
                Post review →
              </button>
            </form>
            <div className="mt-3 text-sm text-center">{formFeedback}</div>
          </div> */}
        </div>

        {/* Right column - Sessions */}
        <div className="space-y-6">
          <div className="bg-[#13161c] rounded-2xl border border-gray-600 shadow-xl">
            <h3 className="text-lg font-bold text-white text-center my-3">
              Upcoming sessions · Book your spot
            </h3>
            <Available_class id={fitness_class.id} />
            <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/20 rounded-2xl p-4 text-center border border-green-800/30">
              <span className="text-sm text-green-200">
                Book your favourite class instantly.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
