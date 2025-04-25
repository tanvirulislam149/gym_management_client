import React from "react";

const Button = ({ children }) => {
  return (
    <div>
      <button className="btn bg-green-400 hover:bg-white m-3 text-black border-none">
        {children}
      </button>
    </div>
  );
};

export default Button;
