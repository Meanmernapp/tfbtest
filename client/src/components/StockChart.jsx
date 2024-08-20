import React from "react";
import BarChart from "../components/BarChart";
import { Link } from "react-router-dom";

const formatter = (number) =>
  number > 999999 ? (number / 1000000).toFixed(1) + "M" : number;

const numberToFix = (number, fix) => (number || 0).toFixed(fix);

const StockChart = ({ ageData, genderData, cityData }) => {
  return (
    <div className="text-gray-800 dark:text-white w-full my-10 space-y-10">
      <BarChart
        name="Top Cities"
        label={cityData
          ?.map((item) => item.demographic)
          ?.filter((item) => item)}
        values={cityData?.map((item) => item.votes)}
      />
      <BarChart
        name="Votes by Gender"
        label={genderData
          ?.map((item) => item.demographic)
          ?.filter((item) => item)}
        values={genderData?.map((item) => item.votes)}
      />
      <BarChart
        name="Votes by Age"
        label={ageData?.map((item) => item.demographic)?.filter((item) => item)}
        values={ageData?.map((item) => item.votes)}
      />
      <div className="rounded shadow-xl overflow-hidden">
        <div>
          <h2 className="text-xl font-semibold m-2">Things to do next</h2>
          <div className="shadow-md dark:bg-[#070e22] bg-[#e5e7eb] py-10 px-5">
            <p className=" mb-4">
              Increase the percentage of visitors in your site
            </p>
            <Link
              to="/admin/create"
              className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase"
            >
              Create a New Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
