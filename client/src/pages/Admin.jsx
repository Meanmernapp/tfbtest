import React, { useEffect, useMemo, useState } from "react";
import ApexCharts from "react-apexcharts";
import { Link } from "react-router-dom";
import CampaignList from "../components/CampaignList";
import { parseISO, format } from "date-fns";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/apiSlice";
const ExampleComponent = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [votes, setVotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchData({ url: "/api/campaign/getCampaigns?page=" + currentPage })
    )
      .unwrap()
      .then((res) => setCampaigns(res))
      .catch((err) => console.log(err));
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(fetchData({ url: "/api/analytics/getVotes" }))
      .unwrap()
      .then((res) => setVotes(res.data))
      .catch((err) => console.log(err));
  }, []); // Run only once when component mounts
  const totalVotes = useMemo(() => {
    return votes?.map((entry) => ({
      date: parseISO(entry.date),
      votes: entry.votes,
    }));
  }, [votes]);

  const state = {
    series: [
      {
        name: "",
        data: totalVotes.map((item) => item.votes),
      },
    ],
    options: {
      chart: {
        foreColor: "#eb6d1e",
        toolbar: {
          show: false,
        },
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: 2,
        colors: ["#eb6d1e"], // Set the color for lines between bars
        curve: "straight",
      },
      colors: ["#eb6d1e"], // Set the color for bars
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },

      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#eb6d1e",
        strokeColors: "#eb6d1e",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: 5,
          sizeOffset: 3,
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#eb6d1e", // Set the color for labels on the bottom side
          },
        },
      },
      xaxis: {
        categories: totalVotes.map((item) => format(item.date, "MMM dd")),
        labels: {
          style: {
            colors: "#eb6d1e", // Set the color for labels on the bottom side
          },
        },
      },
    },
  };

  return (
    <div className="pb-10 pt-2 py-2 h-full text-gray-800 dark:text-white w-full space-y-10">
      <div className="shadow-md dark:bg-[#070e22] bg-[#e5e7eb] p-5">
        <h2 className="text-xl font-semibold mb-4">Your Campaigns</h2>
        {totalVotes ? (
          <ApexCharts
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        ) : null}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-bold  uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-bold  uppercase tracking-wider"
                >
                  Songs
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-bold  uppercase tracking-wider"
                >
                  Votes
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-bold  uppercase tracking-wider"
                >
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Manage</span>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Analytics</span>
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {campaigns?.data?.map((item, index) => (
                <CampaignList item={item} key={item._id} />
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(campaigns.total / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold m-2">Create</h2>
        <div className="shadow-md dark:bg-[#070e22] bg-[#e5e7eb] py-10 px-5">
          <p className=" mb-4">
            Increase the percentage of visitors in your site
          </p>
          <Link
            to="/admin/create"
            className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase"
          >
            Create a new campaign
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold m-2">Share admin access</h2>
        <div className="shadow-md dark:bg-[#070e22] bg-[#e5e7eb] py-10 px-5">
          <p className=" mb-4">Share admin access with existing users</p>
          <Link
            to="/admin/accounts"
            className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase"
          >
            manage admin users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        <li
          className={`cursor-pointer p-1 rounded-md ${
            isFirstPage
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-[#eb6d1e] text-white"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`cursor-pointer px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-[#eb6d1e] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={`cursor-pointer p-1 rounded-md ${
            isLastPage
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-[#eb6d1e] text-white"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
};
