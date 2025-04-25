import React from "react";
import styles from "./Banner.module.css";
import ButtonComp from "../Button/ButtonComp";

const Banner = () => {
  return (
    <div
      className={`${styles.container} text-5xl lg:text-7xl flex justify-center items-center`}
    >
      <div className="">
        <p className="mb-4">Build Perfect body shape for</p>
        <p>good and healthy life</p>
        <div className="flex justify-center">
          <ButtonComp>Be A Member</ButtonComp>
          <ButtonComp>Member Login</ButtonComp>
        </div>
      </div>
    </div>
  );
};

export default Banner;
