import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useSelector(({ auth }) => auth);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dark:bg-[#0B1532] bg-white flex flex-col mx-auto min-h-screen">
      <nav className="p-4 flex justify-between items-center text-gray-800 dark:text-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleMenu}
            className="text-lg font-bold focus:outline-none md:hidden sm:block"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          <Link to="/" className="text-lg font-bold">
            VOTE
          </Link>
          <Link
            to="/"
            className="block py-2 px-3 hover:underline rounded-md xss:hidden sm:max-md:hidden md:block "
          >
            Home
          </Link>
          {auth.profile?.type === "admin" ? (
            <Link
              to="/admin"
              className="block py-2 px-2 hover:underline rounded-md sm:max-md:hidden md:block  xss:hidden"
            >
              Admin
            </Link>
          ) : null}
          <a
            href="https://www.russworld.com"
            className="block py-2 px-2 hover:underline rounded-md  sm:max-md:hidden md:block xss:hidden"
          >
            Russworld
          </a>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-1">
          {auth?.profile?.email ? (
            <Link to={"/profile"} className="flex items-center space-x-1/2">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 uppercase">
                {auth?.profile?.email?.slice(0, 1)}
              </div>
            </Link>
          ) : null}

          <ToggleSwitch />
        </div>
      </nav>

      {menuOpen && (
        <div className="bg-gray-800 text-gray-200 p-4 md:hidden sm:block">
          <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
            Home
          </Link>
          {auth.profile?.type === "admin" ? (
            <Link
              to="/admin"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Admin
            </Link>
          ) : null}
          <a
            href="https://www.russworld.com"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            Russworld
          </a>
        </div>
      )}

      <div className="flex-grow mb-10">
        <Outlet />
      </div>
      <div className="mt-auto relative">
        <Footer />
      </div>
    </div>
  );
};

export default Header;
