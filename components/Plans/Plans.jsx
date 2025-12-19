// "use client";
// import React, { useEffect, useState } from "react";
// import plan_bg from "../../images/plan_bg.jpg";
// import Image from "next/image";
// import Button from "../Button/Button";
// import BookPlanBtn from "../BookPlanBtn/BookPlanBtn";
// import api_client from "@/api_client";
// import axios from "axios";
// import { FaCheck, FaTimes } from "react-icons/fa";

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   console.log(plans);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("https://gym-management-0fmi.onrender.com/plans/")
//       .then((res) => setPlans(res.data))
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }, []);
//   // let plans = [];
//   // try {
//   //   const data = await fetch(
//   //     "https://gym-management-0fmi.onrender.com/plans/",
//   //     {
//   //       cache: "no-store",
//   //     }
//   //   );
//   //   plans = await data.json();
//   // } catch (error) {
//   //   console.log(error);
//   //   console.warn("Could not fetch plans:", error.message);
//   // }
//   return (
//     // <div id="plans" className="max-w-[1200px] mx-auto mb-10">
//     //   <p className="text-primary font-bold text-3xl lg:text-5xl mb-10 ml-10">
//     //     -Membership Plans
//     //   </p>
//     //   {loading ? (
//     //     <div className="flex justify-center h-50">
//     //       <span className="loading loading-spinner loading-xl"></span>
//     //     </div>
//     //   ) : (
//     //     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center">
//     //       {plans?.map((p) => (
//     //         <div
//     //           key={p.id}
//     //           className="card bg-base-100 image-full px-5 md:px-0 my-4 hover:border border-green-400 rounded-none shadow-sm"
//     //         >
//     //           <figure>
//     //             <Image
//     //               className="w-full"
//     //               src={plan_bg}
//     //               width={500}
//     //               height={500}
//     //               alt="Picture of the author"
//     //             />
//     //           </figure>
//     //           <div className="card-body">
//     //             <h2 className="text-4xl font-bold text-green-400">
//     //               {p.price} BDT
//     //             </h2>
//     //             <h2 className="text-xl font-bold leading-none mt-4">
//     //               {p.type}
//     //             </h2>
//     //             <h2 className="text-xl font-bold leading-none mb-4">
//     //               Membership
//     //             </h2>
//     //             <ul>
//     //               {p?.fitness_classes?.map((c) => (
//     //                 <li key={c.id} className="text-lg py-2">
//     //                   {c.name}
//     //                   <hr />
//     //                 </li>
//     //               ))}
//     //             </ul>
//     //             <div className="card-actions justify-end">
//     //               <BookPlanBtn id={p.id} />
//     //             </div>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   )}
//     // </div>
//     <section id="plans" className="py-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Membership <span className="text-green-500">Plans</span>
//           </h2>
//           <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
//             Choose the perfect plan for your fitness journey. All plans include
//             access to our state-of-the-art facilities.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`bg-gray-800/70 rounded-2xl p-8 border-2 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 ${
//                 plan.type === "Pro"
//                   ? "border-green-500 relative scale-105"
//                   : "border-gray-700"
//               }`}
//             >
//               {plan.type === "Pro" && (
//                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold text-sm">
//                     Most Popular
//                   </span>
//                 </div>
//               )}

//               <div className="text-center mb-8 pt-4">
//                 <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
//                 <div className="flex justify-center items-baseline mb-4">
//                   <div>
//                     <p className="text-5xl font-bold">${plan.price}</p>
//                     <p className="text-gray-400 ml-2">
//                       {plan.months} months access
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-300">{plan.description}</p>
//               </div>

//               <ul className="space-y-4 mb-8">
//                 {plan.fitness_classes.map((classes, idx) => (
//                   <li key={idx} className="flex items-center">
//                     {/* {feature.included ? (
//                       <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
//                     ) : (
//                       <FaTimes className="text-gray-500 mr-3 flex-shrink-0" />
//                     )} */}
//                     <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
//                     <span>{classes.name}</span>
//                   </li>
//                 ))}
//               </ul>

//               <BookPlanBtn plan={plan} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Plans;

// components/Plans.jsx
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaUserShield,
  FaStar,
  FaFire,
} from "react-icons/fa";
import BookPlanBtn from "../BookPlanBtn/BookPlanBtn";

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
    <section
      id="plans"
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-900/5 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-900/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <div className="inline-flex items-center px-4 py-2 bg-green-900/20 rounded-full text-green-400 text-sm font-semibold mb-6 border border-green-800/50">
            <FaFire className="mr-2" /> FLEXIBLE MEMBERSHIPS
          </div> */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your <span className="text-green-500">Fitness Path</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Select the perfect plan that aligns with your goals and budget. All
            plans include access to our world-class facilities.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 rounded-2xl p-8 border-1 border-gray-500 ${
                plan.type === "Pro" ? "ring-2 ring-green-500 -mt-8" : ""
              }`}
            >
              {/* Plan Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{plan.type}</h3>
                  </div>
                </div>

                {plan.type === "Pro" && (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-full">
                    Premium
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="items-baseline mb-2">
                  <p className="text-5xl font-bold">
                    {plan.price} <span className="text-xl">BDT</span>
                  </p>
                  <p className="text-gray-400">{plan.months} months access</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.fitness_classes.map((classes, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`mr-3 p-1 rounded text-green-500`}>
                      {/* {classes.included ? <FaCheck /> : <FaTimes />} */}
                      <FaCheck />
                    </div>
                    <span className={"text-gray-300"}>{classes.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {/* <button
                className={`w-full py-4 rounded-xl font-semibold text-lg ${
                  plan.buttonVariant === "primary"
                    ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {selectedPlan === plan.name ? "Selected ✓" : "Choose Plan"}
              </button> */}
              <BookPlanBtn plan={plan} />

              {/* Additional Info */}
              {plan.name === "Pro" && (
                <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
                  <div className="text-green-400 text-sm font-semibold mb-2">
                    🔥 Best Value
                  </div>
                  <div className="text-gray-400 text-sm">
                    83% of members choose this plan
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table for Mobile */}
        <div className="mt-16 lg:hidden">
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h4 className="text-xl font-bold mb-6 text-center">
              Plan Comparison
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span>Group Classes</span>
                <div className="flex gap-4">
                  <span className="text-gray-400">Limited</span>
                  <span className="text-green-500">Unlimited</span>
                  <span className="text-green-500">Unlimited</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span>Trainer Sessions</span>
                <div className="flex gap-4">
                  <span className="text-gray-400">0</span>
                  <span className="text-green-500">4/month</span>
                  <span className="text-green-500">Unlimited</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Common Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h4 className="font-bold mb-3 text-green-400">
                Can I switch plans later?
              </h4>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect at the start of your next billing cycle.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h4 className="font-bold mb-3 text-green-400">
                Is there a cancellation fee?
              </h4>
              <p className="text-gray-300">
                No cancellation fees. You can cancel your membership anytime
                with 30 days notice.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">30-Day</div>
            <div className="text-gray-400">Money Back Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">
              No Lock-In
            </div>
            <div className="text-gray-400">Cancel Anytime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">Free</div>
            <div className="text-gray-400">Week Trial</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
