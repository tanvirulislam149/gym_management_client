import React from "react";

const ReviewPost = () => {
  return (
    <div className="my-4">
      <div>
        <label htmlFor="" className="font-bold text-xl">
          Rating:
        </label>
        <br />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
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
        name=""
        className="textarea lg:w-1/2 w-full"
        placeholder="Enter your comment"
        id=""
      ></textarea>
      <br />
      <button className="btn btn-primary mt-2 text-black">Submit</button>
    </div>
  );
};

export default ReviewPost;
