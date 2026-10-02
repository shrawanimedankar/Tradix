function Invest() {
  return (
    <section className="bg-[#6100d011] px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-4">
          <h2 className="mb-4 text-3xl font-normal leading-tight text-[#2e0063] md:text-4xl">
            Choose from <br />
            a Wide Range of <br />
            Investment Options
          </h2>

          <p className="max-w-sm text-base leading-relaxed text-gray-600">
            Everything you need to explore, invest, and manage your money — all
            in one simple platform.
          </p>
        </div>

        {/* Right */}
        <div className="lg:col-span-8">
          {/* First Row */}
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl text-[#1E3A5F]">Stocks</h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Buy and sell stocks with an intuitive trading experience and
                real-time market information.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl text-[#1E3A5F]">Mutual Funds</h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Explore mutual funds and build your portfolio with SIP or
                lump-sum investments.
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl text-[#1E3A5F]">IPOs</h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Discover upcoming IPOs and track new investment opportunities
                from one place.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl text-[#1E3A5F]">Bonds</h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Explore bonds and fixed-income opportunities to add stability
                and diversification to your portfolio.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl text-[#1E3A5F]">NPS</h3>

              <p className="text-sm leading-relaxed text-gray-600">
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
