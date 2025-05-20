import React from "react";
import Button from "../Button/Button";

const Contact = () => {
  return (
    <div className="max-w-[1200px] my-10 mx-3 md:mx-auto md:flex">
      <div className="md:w-1/2 w-full md:p-5 md:pr-15">
        <p className="text-3xl mb-10 font-bold">CONTACT US</p>
        <p className="my-10 text-lg">
          Muscle Gain courses and certifications are open to individuals and
          trainers seeking to improve their health and fitness through effective
          training and nutritional strategies.
        </p>
        <p className="mt-10 text-lg">
          House- 5, Lavel -5, Lake Drive Road, Sector-7,Uttara, Dhaka 1230.
        </p>
        <p>+8801712-345678</p>
      </div>
      <div className="md:w-1/2 w-full md:p-5">
        <p className="text-3xl mb-5 font-bold">SEND US EMAIL</p>
        <input
          type="text"
          placeholder="Enter your name"
          className="input w-full bg-white text-black my-3"
        />
        <input
          type="text"
          placeholder="Enter email"
          className="input w-full bg-white text-black my-3"
        />
        <textarea
          className="textarea h-24 w-full bg-white text-black my-3"
          placeholder="Bio"
        ></textarea>
        <Button>Send</Button>
      </div>
    </div>
  );
};

export default Contact;
