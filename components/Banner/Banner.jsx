import React from "react";
import styles from "./Banner.module.css";
import Button from "../Button/Button";

const Banner = () => {
  return (
    <div
      className={`${styles.container} text-5xl lg:text-7xl flex justify-center items-center`}
    >
      <div className="">
        <p className="mb-4">Build Perfect body shape for</p>
        <p>good and healthy life</p>
        <div className="flex justify-center">
          <div className="mx-3">
            <Button>Be A Member</Button>
          </div>
          <div className="mx-3">
            <Button>Member Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
