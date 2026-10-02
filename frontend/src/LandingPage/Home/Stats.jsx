function Stats() {
  return (
    <div className="container mx-auto px-5 py-5">
      {/* Heading */}
      <h1 className="mb-5 text-center text-xl font-semibold md:text-2xl">
        Trust with confidence
      </h1>

      {/* Horizontal Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[#7700ff4a] p-3 transition hover:shadow-lg">
          <h2 className="mb-1 text-lg font-semibold">
            Customer-first always
          </h2>

          <p className="text-xs leading-relaxed text-gray-500">
            Tradix is designed around a simple idea: investing should feel
            clear, accessible, and easy to navigate. From discovering
            investments to tracking your portfolio, every experience is built
            with the investor in mind.
          </p>
        </div>

        <div className="rounded-lg border border-[#7700ff4a] p-3 transition hover:shadow-lg">
          <h2 className="mb-1 text-lg font-semibold">
            No spam or gimmicks
          </h2>

          <p className="text-sm leading-relaxed text-gray-500">
            No unnecessary distractions or complicated interfaces. Tradix
            focuses on clean design, useful information, and a straightforward
            experience that lets you explore the markets at your own pace.
          </p>
        </div>

        <div className="rounded-lg border border-[#7700ff4a] p-3 transition hover:shadow-lg">
          <h2 className="mb-1 text-lg font-semibold">
            The Tradix ecosystem
          </h2>

          <p className="text-sm leading-relaxed text-gray-500">
            More than just a trading interface, Tradix brings investing and
            portfolio tools together in one place. Explore stocks, mutual funds,
            ETFs, IPOs, bonds, and more through a unified platform.
          </p>
        </div>

        <div className="rounded-lg border border-[#7700ff4a] p-3 transition hover:shadow-lg">
          <h2 className="mb-1 text-lg font-semibold">
            Make informed decisions
          </h2>

          <p className="text-sm leading-relaxed text-gray-500">
            Tradix gives you the tools to understand your investments better.
            Track your portfolio, follow market movements, analyze performance,
            and access relevant information — so you can make decisions based
            on your own research and goals.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center">
        <img
          src="/media/images/ecosystem.png"
          alt="Tradix ecosystem"
          className="mb-8 w-full"
        />
      </div>
    </div>
  );
}

export default Stats;