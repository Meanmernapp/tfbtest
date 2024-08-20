
import React from "react";
import { Link, useLocation,  useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { handleLogout, } from "../store/authSlice";

const ProfileTabs = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Define an array of tab objects with their routes
  const tabs = [
    { title: "Profile", route: "/profile" },
    { title: "Vote", route: "/" },
  ];

  const manageLogout = async () => {
    dispatch(handleLogout());
    navigate("/");
  };

  return (
    <div className="flex items-center py-2 text-gray-800 dark:text-white">
      {tabs.map((tab) => (
        <React.Fragment key={tab.title}>
          <Link
            to={tab.route}
            className={`hover:underline focus:outline-none inline-block ${
              location.pathname === tab.route ? "font-bold" : ""
            }`}
          >
            {tab.title}
          </Link>
          <span className="mx-4">|</span>
        </React.Fragment>
      ))}
      <button
        onClick={manageLogout}
        className={`hover:underline focus:outline-none inline-block`}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileTabs;
