import React from "react";
import { CiFilter } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";

const History = () => {
  return (
    <div className="p-8">
      <h1 className="lg:text-4xl lg:bold">Transaction History</h1>

      <div className="flex my-6 gap-6 items-center justify-between">
        <div className="flex items-center w-[30%] justify-between">
          {/* Search Input */}
          <label className="rounded-lg bg-white border border-[#D941A9] flex items-center gap-2 input">
            <input type="text" className="bg-transparent grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* Filter */}
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="btn m-1">
              <CiFilter />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a>Time</a>
              </li>
              <li>
                <a>Amount</a>
              </li>
            </ul>
          </div>
        </div>

        <div className=" bg-[#00247B] rounded-lg flex flex-col items-center p-2 shadow-lg">
          <h3 className="text-base text-white">Total Amount:</h3>
          <span className="text-base text-white">X Amount</span>
        </div>
      </div>
      <HistoryCart />
      <HistoryCart />
      <HistoryCart />
    </div>
  );
};

function HistoryCart() {
  return (
    <div className="p-4 border rounded-lg flex gap-4 shadow-md bg-[#2185f7] text-white mb-4 last:mb-0">
      <CiReceipt color="#fff" size={24} />
      <span>X amount of Units bought at Y price.</span>
    </div>
  );
}

export default History;
