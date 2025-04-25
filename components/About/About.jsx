import React from "react";
import Image from "next/image";
import gym from "../../images/gym.jpg";

const About = () => {
  return (
    <div className="md:flex justify-evenly items-center my-20 md:my-30">
      <div className="md:w-2/5 mb-5">
        <p className="text-primary font-bold text-3xl mb-10">-ABOUT OUR GYM</p>
        <p className="text-5xl mb-10 font-bold">
          SAFE BODYBUILDING PROPER SOLUTIONS THAT SAVE OUR VALUABLE TIME!
        </p>
        <p>
          We present your services with flexible, convenient, and client any
          purpose layouts. You can select your favorite layouts.
        </p>
      </div>
      <div className="w-full md:w-2/5">
        <Image
          className="w-full"
          src={gym}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default About;
