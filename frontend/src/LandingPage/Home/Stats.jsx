import React from "react";

function Stats() {
  return (
    <div className="container mx-auto px-5 py-5">
      {/* Heading */}
      <h1 className="text-xl md:text-2xl mb-5 font-semibold text-center">
        Trust with confidence
      </h1>

      {/* Horizontal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1 */}
        <div className="border border-[#7700ff4a] rounded-lg p-3 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-1">Customer-first always</h2>

          <p className="text-gray-500 text-xs leading-relaxed">
            Tradix is designed around a simple idea: investing should feel
            clear, accessible, and easy to navigate. From discovering
            investments to tracking your portfolio, every experience is built
            with the investor in mind.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-[#7700ff4a] rounded-lg p-3 hover:shadow-lg transition">
          <h2 className="text-lg font-semiboldmb-1">No spam or gimmicks</h2>

          <p className="text-gray-500 text-sm leading-relaxed">
            No unnecessary distractions or complicated interfaces. Tradix
            focuses on clean design, useful information, and a straightforward
            experience that lets you explore the markets at your own pace.{" "}
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-[#7700ff4a] rounded-lg p-3 hover:shadow-lg transition">
          <h2 className="text-lg font-semiboldmb-1">The Tradix ecosystem</h2>

          <p className="text-gray-500 text-sm leading-relaxed">
            More than just a trading interface, Tradix brings investing and
            portfolio tools together in one place. Explore stocks, mutual funds,
            ETFs, IPOs, bonds, and more through a unified platform.{" "}
          </p>
        </div>

        {/* Card 4 */}
        <div className="border border-[#7700ff4a] rounded-lg p-3 hover:shadow-lg transition">
          <h2 className="text-lg font-semiboldmb-1">Make informed decisions</h2>

          <p className="text-gray-500 text-sm leading-relaxed">
            Tradix gives you the tools to understand your investments better.
            Track your portfolio, follow market movements, analyze performance,
            and access relevant information — so you can make decisions based on
            your own research and goals.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center">
        <img
          src="/media/images/ecosystem.png"
          alt="Tradix ecosystem"
          className="w-full mb-8"
        />

        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-center">
          <a
            href="#"
            className="custom-link"
          >
            Explore our products
            <i className="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
          </a>

          <a
            href="#"
            className="custom-link"
          >
            Try Kite demo
            <i className="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Stats;
