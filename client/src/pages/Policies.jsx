import React from "react";
import { Link } from "react-router-dom";

const Policies = () => {
  return (
    <div className="text-gray-800 dark:text-white">
      <div className=" mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold px-3">Policies</h2>
        <Link
          to="/policies/privacy-policy"
          className="block text-[#E2E8F0] sm:text-sm xss:text-sm underline bg-transparent font-semibold py-1 px-10 sm:px-4 xss:px-2  mr-2 uppercase"
        >
          Privacy Policy
        </Link>
        <Link
          to="/policies/terms-of-service"
          className="block text-[#E2E8F0] sm:text-sm xss:text-sm underline bg-transparent font-semibold py-1 px-10 sm:px-4 xss:px-2  mr-2 uppercase"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default Policies;
