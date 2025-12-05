import React from "react";
import Button from "../Button/Button";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";

const Contact = () => {
  return (
    <div id="contact" className="max-w-[1200px] my-10 md:mx-auto mx-3">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your{" "}
          <span className="text-green-500">Fitness Journey</span>?
        </h2>
        <p className="text-gray-300 text-lg">
          Join PrimeFit today and get your first week FREE with no commitment.
        </p>
      </div>
      <div className="mx-3 md:mx-auto md:flex">
        <div className="md:w-1/2 w-full md:p-5 md:pr-15">
          <p className="text-3xl mb-10 font-bold">CONTACT US</p>
          <p className="my-10 text-lg">
            Muscle Gain courses and certifications are open to individuals and
            trainers seeking to improve their health and fitness through
            effective training and nutritional strategies.
          </p>
          <div className="flex items-center mb-5">
            <MdEmail className="w-8 h-8 mr-4" />
            <p>muscle_gain@gmail.com</p>
          </div>
          <div className="flex items-center mb-5">
            <IoCall className="w-8 h-8 mr-4" />
            <p>+8801712-345678</p>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:p-5">
          <p className="text-3xl mb-5 font-bold">SEND US EMAIL</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="input w-full bg-white text-black my-3"
          />
          <input
            type="email"
            placeholder="Enter email"
            className="input w-full bg-white text-black my-3"
          />
          <textarea
            className="textarea h-24 w-full bg-white text-black my-3"
            placeholder="Enter your message"
          ></textarea>
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
