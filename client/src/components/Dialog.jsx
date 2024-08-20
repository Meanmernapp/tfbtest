import React from "react";

const Dialog = ({ children }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-gradient-to-r from-[#000721] via-[#000721] to-[#0a2862] dark:from-[#000721] dark:via-[#000721] dark:to-[#0a2862] shadow-lg rounded-md py-6 px-5 z-50 w-50`}
    >
      {children}
    </div>
  );
};

export default Dialog;
