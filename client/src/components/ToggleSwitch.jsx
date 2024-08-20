import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/authSlice";

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  useEffect(() => {
    document.body.classList.toggle("dark", auth.menu);
  }, [auth.menu]);

  const handleChange = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-${auth.menu ? "white" : "#0F172A"} xss:hidden sm:hidden`}>Light</span>
      <label htmlFor="toggle-switch" className="flex items-center cursor-pointer">
        <div
          className={`relative w-12 h-6 transition-all duration-200 ease-linear rounded-full shadow-inner bg-gray-300 ${
            auth.menu ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <input
            type="checkbox"
            id="toggle-switch" // id to associate with the label
            className="opacity-0 w-0 h-0"
            checked={auth.menu}
            onChange={handleChange}
          />
          <div
            className={`absolute left-0 top-0 w-6 h-6 transition-all duration-200 ease-linear transform ${
              auth.menu ? "translate-x-full bg-gray-700" : "bg-gray-800"
            } rounded-full shadow-md`}
          ></div>
        </div>
      </label>
      <span className={`text-${auth.menu ? "white" : "#0F172A"} xss:hidden sm:hidden`}>Dark</span>
    </div>
  );
};

export default ToggleSwitch;
