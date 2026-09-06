import React from "react";

function Pricing() {
  return (
    <div className="bg-[#6100d011]">
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side */}
        <div>
          <h1 className="mb-3 text-2xl font-semibold">Unbeatable pricing</h1>
          <p className="mb-4 leading-relaxed">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a
            href="#"
             className="custom-link"
          >
            See Pricing
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        {/* Right side */}
        <div className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 text-center">
            <div className="p-5 border border-gray-300">
              <h1 className="mb-3 text-3xl font-semibold">₹0</h1>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>

            <div className="p-5 border border-gray-300">
              <h1 className="mb-3 text-3xl font-semibold">₹20</h1>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Pricing;
