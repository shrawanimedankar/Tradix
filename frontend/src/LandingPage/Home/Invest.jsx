import React from "react";

function Invest() {
  return (
    <section className="bg-[#6100d011] py-10 px-6 md:px-12 lg:px-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* Left */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-4xl font-normal leading-tight text-[#2e0063] mb-4">
            Choose from <br />
            a Wide Range of <br />
            Investment Options
          </h2>

          <p className="text-gray-600 text-base leading-relaxed max-w-sm">
            Everything you need to explore, invest, and manage your money — all in one simple platform.
          </p>
        </div>

        {/* Right */}
        <div className="lg:col-span-8">

          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

            {/* Stocks */}
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="text-xl text-[#1E3A5F] mb-2">
                Stocks
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Buy and sell stocks with an intuitive trading experience and real-time market information. </p>
            </div>

            {/* Mutual Funds */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl text-[#1E3A5F] mb-2">
                Mutual Funds
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore mutual funds and build your portfolio with SIP or lump-sum investments.   </p>
            </div>

          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* IPOs */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl text-[#1E3A5F] mb-2">
                IPOs
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover upcoming IPOs and track new investment opportunities from one place.    </p>
            </div>

            {/* Bonds & FDs */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl text-[#1E3A5F] mb-2">
                Bonds
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore bonds and fixed-income opportunities to add stability and diversification to your portfolio. </p>
            </div>

            {/* NPS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl text-[#1E3A5F] mb-2">
                NPS
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Diversify your portfolio with long-term growth options.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Invest;