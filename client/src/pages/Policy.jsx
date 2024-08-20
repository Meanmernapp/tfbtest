import React from "react";
import polices from "./polices.json";
import { Link } from "react-router-dom";
const Policy = () => {
  return (
    <div className="text-gray-800 dark:text-white">
      <div className="mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>
        {polices?.sections?.map((item, index) => (
          <div key={item.title}>
            <h3 className="text-xl font-bold mb-3 capitalize">{item?.title}</h3>
            {item.description?.map((description) => (
              <p
                dangerouslySetInnerHTML={{ __html: description }}
                className="text-md mb-2"
              ></p>
            ))}
          </div>
        ))}
      </div>
      <Link to={"/policies"} className={`hover:underline mx-4 hover:font-semibold underline`}>
        ← Back to All Policies
      </Link>
    </div>
  );
};

export default Policy;
