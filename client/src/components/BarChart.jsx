import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ name, label, values }) => {
  const state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 2,

        colors: ["#eb6d1e"], // Set the color for lines between bars
      },
      colors: ["#eb6d1e"], // Set the color for bars
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        categories: label,
        tickPlacement: 'on',
        tickAmount: 5,
        labels: {
          style: {
            colors: "#eb6d1e", // Set the color for labels on the bottom side
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#eb6d1e", // Set the color for labels on the bottom side
          },
        },
      },
    },
    series: [
      {
        name: "",
        data: values,
      },
    ],
  };

  return (
    <div className="shadow-md dark:bg-[#070e22] bg-[#e5e7eb] p-5 my-5">
      <h3 className="text-lg font-semibold leading-tight ">{name}</h3>
      {label && values ? (
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          // width="500"
          height={300}
        />
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default BarChart;
