import React from "react";
import terms from "./terms.json";
import { Link } from "react-router-dom";
const TermsOfService = () => {
  return (
    <div className="text-gray-800 dark:text-white">
      <div className="mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Terms of Service</h2>
        {terms?.sections?.map((item, index) => (
          <div key={item.title}>
            <h3 className="text-xl font-semibold mb-3">
              {index ? "SECTION " + index + " - " : ""} {item.title}
            </h3>
            {item.content?.map((description) => (
              <p className="text-md mb-2">{description}</p>
            ))}
          </div>
        ))}
      </div>
      <Link
        to={"/policies"}
        className={`hover:underline mx-4 hover:font-semibold underline`}
      >
        ← Back to All Policies
      </Link>
    </div>
  );
};

export default TermsOfService;
