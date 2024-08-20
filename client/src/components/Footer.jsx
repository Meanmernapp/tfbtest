import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Array of footer links
  const footerLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/policies/terms-of-service", label: "Terms of Service" },
    { to: "/policies/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <footer className="dark:bg-[#0F172A] bg-gray-300 text-gray-800 dark:text-white text-center py-4  bottom-0 left-0 right-0">
      <div className="flex items-center xss:items-start sm:items-start  xsm:flex-wrap sm:flex-wrap xss:flex-wrap content-start sm:flex-col xss:flex-col md:flex-row">
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`hover:underline mx-4 hover:font-semibold ${
              location.pathname === link.to ? "font-bold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
