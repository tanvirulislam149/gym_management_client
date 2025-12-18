import React from "react";
import styles from "./Banner.module.css";
import Button from "../Button/Button";
import Link from "next/link";
import MessageCont from "../MessageCont/MessageCont";
import { FaPlayCircle, FaUsers } from "react-icons/fa";
import bannerImg from "../../images/gym.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:py-26">
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
              <Link href={"/register"}>
                <Button>Be A Member</Button>
              </Link>

              <Link href={"/login"}>
                <Button>Member Login</Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bannerImg}
                alt="Modern Gym Interior"
                className="w-full h-64 md:h-96 object-cover"
              />
              {/* <img
                src={bannerImg}
                alt="Modern Gym Interior"
                className="w-full h-64 md:h-96 object-cover"
              /> */}
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
