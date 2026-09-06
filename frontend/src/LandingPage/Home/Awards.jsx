import React from "react";

function Awards() {
  return (
    <div className="">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/media/images/award.png"
              alt="Largest stock broker"
              className="w-full max-w-md"
            />
          </div>
          {/* Content */}
          <div className="mt-5 md:mt-0">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">
              Built for Modern Investors
            </h1>

            <p className="text-sm md:text-base mb-6 leading-relaxed">
              Tradix is designed to bring essential investing and trading tools
              together in one simple, intuitive platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="list-disc pl-5">
                  <li>Stocks & IPOs</li>
                  <li>Mutual Funds</li>
                  <li>ETFs</li>
                  <li>Government Securities</li>
                </ul>
              </div>

              <div>
                <ul className="list-disc pl-5">
                  <li>Bonds </li>
                  <li>Futures & Options</li>
                  <li>Market Insights </li>
                  <li>Portfolio Tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
