"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import MyMap with SSR disabled
const MyMap = dynamic(() => import("../../../components/MapComp/MapComp"), {
  ssr: false,
});

const About = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="md:w-1/2 m-5 md:px-10">
        <div>
          <p className="text-3xl font-bold border-b-4 border-white w-60 text-center mx-auto">
            Muscle Gain
          </p>
          <p className="my-10 text-lg text-center">
            Muscle Gain courses and certifications are open to individuals and
            trainers seeking to improve their health and fitness through
            effective training and nutritional strategies.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 h-[600px]">
        <MyMap />
      </div>
    </div>
  );
};

export default About;
