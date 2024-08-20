import React from "react";

const Modal = ({ text, type }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        type === "err" ? "text-rose-400" : "text-white"
      } dark:${
        type === "err" ? "text-rose-400" : "text-gray-800"
      } dark:bg-[#E2E8F0] bg-[#070E22] shadow-lg rounded-md p-6 z-50 h-30`}
    >
      <p className="text-md my-6">{text}</p>
    </div>
  );
};

export default Modal;
