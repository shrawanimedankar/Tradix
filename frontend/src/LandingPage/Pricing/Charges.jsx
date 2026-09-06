import React from "react";
import { Link } from "react-router-dom";

function Charges() {
  return (
    <div className="container mx-auto">
      <div className="text-center ">
        <h1 className="custom-heading">
          Transparent Charges
        </h1>

        <h3 className="text-gray-700 text-xl mt-3">
          Simple and transparent pricing with no hidden brokerage charges.
        </h3>

        <p className="mt-4 mb-5">
          Invest in stocks, trade derivatives, and explore the markets with
          straightforward pricing designed for every investor.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 text-center ">
          <div className="p-5 custom-card">
            <h1 className="mb-3 text-[#2d0061be] text-4xl font-semibold">₹0</h1>
            <h2 className="mb-1 text-2xl font-semibold text-[#170031]">
              Equity Delivery
            </h2>
            <p className="text-base">
              Invest in stocks for the long term with zero brokerage on equity
              delivery orders.
            </p>
          </div>
          <div className="p-5 custom-card">
            <h1 className="mb-3 text-[#2d0061be] text-4xl font-semibold">
              ₹20 / order
            </h1>
            <h2 className="mb-1 text-2xl font-semibold text-[#170031]">
              Intraday
            </h2>
            <p className="text-base">
              Flat ₹20 or 0.03%, whichever is lower, per executed order.
            </p>
          </div>
          <div className="p-5 custom-card">
            <h1 className="mb-3 text-[#2d0061be] text-4xl font-semibold">
              ₹20 / order
            </h1>
            <h2 className="mb-1 text-2xl font-semibold text-[#170031]">
              Futures
            </h2>
            <p className="text-base">
              Simple flat pricing for every executed futures order.
            </p>
          </div>
          <div className="p-5 custom-card">
            <h1 className="mb-3 text-[#2d0061be] text-4xl font-semibold">
              ₹20 / order
            </h1>
            <h2 className="mb-1 text-2xl font-semibold text-[#170031]">
              Options
            </h2>
            <p className="text-base">
              Flat ₹20 brokerage per executed options order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charges;
