import React from "react";

const Button = ({ children }) => {
  return (
    <div>
      <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold py-2 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
        {children}
      </button>
    </div>
  );
};

export default Button;
