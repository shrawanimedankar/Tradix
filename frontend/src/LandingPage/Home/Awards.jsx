function Awards() {
  return (
    <div>
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/media/images/award.png"
              alt="Tradix investment features"
              className="w-full max-w-md"
            />
          </div>

          {/* Content */}
          <div className="mt-5 md:mt-0">
            <h1 className="mb-4 text-xl font-semibold md:text-2xl">
              Built for Modern Investors
            </h1>

            <p className="mb-6 text-sm leading-relaxed md:text-base">
              Tradix is designed to bring essential investing and trading tools
              together in one simple, intuitive platform.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ul className="list-disc pl-5">
                <li>Stocks & IPOs</li>
                <li>Mutual Funds</li>
                <li>ETFs</li>
                <li>Government Securities</li>
              </ul>

              <ul className="list-disc pl-5">
                <li>Bonds</li>
                <li>Futures & Options</li>
                <li>Market Insights</li>
                <li>Portfolio Tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
