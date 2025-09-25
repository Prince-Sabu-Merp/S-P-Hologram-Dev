import React from "react";

const InfoMessages = ({ className = "", messageHead, messageBody }) => {
  return (
    <div
      style={{ backgroundColor: "#2D13EA", boxShadow: "-15px 50px 32px rgba(0,0,0,0.25)"  }}
      className={`px-6 py-3 max-w-[540px] rounded-lg overflow-clip shadow-md text-white text-center absolute z-10 top-5 left-1/2 -translate-x-1/2 ${className}`}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        {messageHead}
      </h1>
      <p className="text-base md:text-lg mt-1 text-gray-100">
        {messageBody}
      </p>
    </div>
  );
};

export default InfoMessages;


