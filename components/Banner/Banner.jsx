import React from "react";
import styles from "./Banner.module.css";
import Button from "../Button/Button";
import Link from "next/link";
import MessageCont from "../MessageCont/MessageCont";
import { FaPlayCircle, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    // <div
    //   className={`${styles.container} text-5xl lg:text-7xl flex justify-center items-center`}
    // >
    //   <div className="">
    //     <p className="mb-4">Build Perfect body shape for</p>
    //     <p>good and healthy life</p>
    //     <div className="flex justify-center">
    //       <div className="mx-3">
    //         <Link href={"/register"}>
    //           <Button>Be A Member</Button>
    //         </Link>
    //       </div>
    //       <div className="mx-3">
    //         <Link href={"/login"}>
    //           <Button>Member Login</Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="text-base fixed md:right-10 right-2 md:bottom-5 bottom-2 z-50 cursor-pointer">
    //     <MessageCont />
    //   </div>
    // </div>
    <section id="home" className="pt-24 pb-16 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Body,{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Transform Your Life
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Experience premium fitness training with state-of-the-art
              equipment, expert trainers, and a supportive community dedicated
              to helping you achieve your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center">
                <FaPlayCircle className="mr-2" /> Watch Tour
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Modern Gym Interior"
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-4 bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full mr-4">
                  <FaUsers className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">3,200+</h3>
                  <p className="text-gray-300">Active Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-base fixed md:right-10 right-2 md:bottom-5 bottom-2 z-50 cursor-pointer">
        <MessageCont />
      </div>
    </section>
  );
};

export default Banner;
