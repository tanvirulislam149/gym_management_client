"use client";
import React, { useEffect, useState } from "react";
import plan_bg from "../../images/plan_bg.jpg";
import Image from "next/image";
import Button from "../Button/Button";
import BookPlanBtn from "../BookPlanBtn/BookPlanBtn";
import api_client from "@/api_client";
import axios from "axios";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://gym-management-0fmi.onrender.com/plans/")
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  // let plans = [];
  // try {
  //   const data = await fetch(
  //     "https://gym-management-0fmi.onrender.com/plans/",
  //     {
  //       cache: "no-store",
  //     }
  //   );
  //   plans = await data.json();
  // } catch (error) {
  //   console.log(error);
  //   console.warn("Could not fetch plans:", error.message);
  // }
  return (
    <div id="plans" className="max-w-[1200px] mx-auto mb-10">
      <p className="text-primary font-bold text-3xl lg:text-5xl mb-10 ml-10">
        -Membership Plans
      </p>
      {loading ? (
        <div className="flex justify-center h-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center">
          {plans?.map((p) => (
            <div
              key={p.id}
              className="card bg-base-100 image-full px-5 md:px-0 my-4 hover:border border-green-400 rounded-none shadow-sm"
            >
              <figure>
                <Image
                  className="w-full"
                  src={plan_bg}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-4xl font-bold text-green-400">
                  {p.price} BDT
                </h2>
                <h2 className="text-xl font-bold leading-none mt-4">
                  {p.type}
                </h2>
                <h2 className="text-xl font-bold leading-none mb-4">
                  Membership
                </h2>
                <ul>
                  {p?.fitness_classes?.map((c) => (
                    <li key={c.id} className="text-lg py-2">
                      {c.name}
                      <hr />
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-end">
                  <BookPlanBtn id={p.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plans;
