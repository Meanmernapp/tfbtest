import React from "react";

const CardDetail = () => {
  return (
    <div className="flex w-full  p-10 bg-gray-100 text-gray-600 items-center">
      <div className="w-full">
        <h3 className="text-lg font-semibold leading-tight text-gray-800">
          SW Limited.
        </h3>
        <h6 className="text-sm leading-tight mb-2">
          <span>ASX:SFW </span>
          &nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST
        </h6>
        <div className="flex w-full items-end mb-6">
          <span className="block leading-none text-3xl text-gray-800">
            2.320
          </span>
          <span className="block leading-5 text-sm ml-4 text-green-500">
            {`${0.11 < 0 ? "▼" : "▲"} ${(0.11).toFixed(3)} (${(
              4.966 * 100 -
              100
            ).toFixed(3)}%)`}
          </span>
        </div>
        <div className="flex w-full text-xs">
          <div className="flex w-5/12">
            <div className="flex-1 pr-3 text-left font-semibold">Open</div>
            <div className="flex-1 px-3 text-right">2.230</div>
          </div>
          <div className="flex w-7/12">
            <div className="flex-1 px-3 text-left font-semibold">
              Market Cap
            </div>
            <div className="flex-1 pl-3 text-right">93.8M</div>
          </div>
        </div>
        <div className="flex w-full text-xs">
          <div className="flex w-5/12">
            <div className="flex-1 pr-3 text-left font-semibold">High</div>
            <div className="px-3 text-right">2.215</div>
          </div>
          <div className="flex w-7/12">
            <div className="flex-1 px-3 text-left font-semibold">P/E ratio</div>
            <div className="pl-3 text-right">20.10</div>
          </div>
        </div>
        <div className="flex w-full text-xs">
          <div className="flex w-5/12">
            <div className="flex-1 pr-3 text-left font-semibold">Low</div>
            <div className="px-3 text-right">2.215</div>
          </div>
          <div className="flex w-7/12">
            <div className="flex-1 px-3 text-left font-semibold">
              Dividend yield
            </div>
            <div className="pl-3 text-right">{`1.67%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
