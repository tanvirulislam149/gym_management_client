import React from "react";
import { FaCheck } from "react-icons/fa";
import BookPlanBtn from "../BookPlanBtn/BookPlanBtn";

const Plans = async () => {
  let plans = [];
  try {
    const data = await fetch("https://gym-management-henna.vercel.app/plans/", {
      cache: "no-store",
    });
    plans = await data.json();
  } catch (error) {
    console.log(error);
    console.warn("Could not fetch plans:", error.message);
  }

  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-900/5 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-900/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 rounded-2xl p-8 border-1 border-gray-500 ${
                plan.type === "Pro" ? "ring-2 ring-green-500 md:-mt-8" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{plan.type}</h3>
                  </div>
                </div>

                {plan.type === "Pro" && (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                {plan.type === "Elite" && (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-full">
                    Premium
                  </div>
                )}
              </div>
              <div className="mb-8">
                <div className="items-baseline mb-2">
                  <p className="text-5xl font-bold">
                    {plan.price} <span className="text-xl">BDT</span>
                  </p>
                  <p className="text-gray-400">{plan.months} months access</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.fitness_classes.map((classes, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`mr-3 p-1 rounded text-green-500`}>
                      <FaCheck />
                    </div>
                    <span className={"text-gray-300"}>{classes.name}</span>
                  </div>
                ))}
              </div>
              <BookPlanBtn plan={plan} />

              {plan.type === "Pro" && (
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
