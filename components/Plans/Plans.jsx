"use client";
import React, { useEffect, useState } from "react";
import plan_bg from "../../images/plan_bg.jpg";
import Image from "next/image";
import Button from "../Button/Button";
import BookPlanBtn from "../BookPlanBtn/BookPlanBtn";
import api_client from "@/api_client";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(plans);

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
    // <div id="plans" className="max-w-[1200px] mx-auto mb-10">
    //   <p className="text-primary font-bold text-3xl lg:text-5xl mb-10 ml-10">
    //     -Membership Plans
    //   </p>
    //   {loading ? (
    //     <div className="flex justify-center h-50">
    //       <span className="loading loading-spinner loading-xl"></span>
    //     </div>
    //   ) : (
    //     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center">
    //       {plans?.map((p) => (
    //         <div
    //           key={p.id}
    //           className="card bg-base-100 image-full px-5 md:px-0 my-4 hover:border border-green-400 rounded-none shadow-sm"
    //         >
    //           <figure>
    //             <Image
    //               className="w-full"
    //               src={plan_bg}
    //               width={500}
    //               height={500}
    //               alt="Picture of the author"
    //             />
    //           </figure>
    //           <div className="card-body">
    //             <h2 className="text-4xl font-bold text-green-400">
    //               {p.price} BDT
    //             </h2>
    //             <h2 className="text-xl font-bold leading-none mt-4">
    //               {p.type}
    //             </h2>
    //             <h2 className="text-xl font-bold leading-none mb-4">
    //               Membership
    //             </h2>
    //             <ul>
    //               {p?.fitness_classes?.map((c) => (
    //                 <li key={c.id} className="text-lg py-2">
    //                   {c.name}
    //                   <hr />
    //                 </li>
    //               ))}
    //             </ul>
    //             <div className="card-actions justify-end">
    //               <BookPlanBtn id={p.id} />
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <section id="plans" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Membership <span className="text-green-500">Plans</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your fitness journey. All plans include
            access to our state-of-the-art facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 hover:transform hover:-translate-y-2 ${
                plan.type === "Pro"
                  ? "border-green-500 relative scale-105"
                  : "border-gray-700"
              }`}
            >
              {plan.type === "Pro" && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <div>
                    <p className="text-5xl font-bold">${plan.price}</p>
                    <p className="text-gray-400 ml-2">
                      {plan.months} months access
                    </p>
                  </div>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.fitness_classes.map((classes, idx) => (
                  <li key={idx} className="flex items-center">
                    {/* {feature.included ? (
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <FaTimes className="text-gray-500 mr-3 flex-shrink-0" />
                    )} */}
                    <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                    <span>{classes.name}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.type === "Pro"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
