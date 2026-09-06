import React from "react";

function Cards() {
  return (
    <div className="container mx-auto pb-20">
      <div className="px-6 py-3 mt-5">
        <h2 className="text-2xl font-bold text-[#2e0063] text-center mb-10">
          How do we make this possible?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">
              Easy to Access
            </h3>
            <p className="text-gray-500 text-base">
              Bring investing within everyone’s reach with a seamless platform
              that works across devices, wherever you are.
            </p>
          </div>

          {/* Cost-Effective */}
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">
              Cost-Effective
            </h3>
            <p className="text-gray-500 text-base">
              Keep investing affordable with clear, competitive pricing and
              minimal charges, so more of your money stays invested.
            </p>
          </div>

          {/* Easy to Understand */}
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">
              Easy to Understand
            </h3>
            <p className="text-gray-500 text-base">
              Simplify the investing journey with intuitive tools, useful
              insights, and experiences designed around different financial
              goals.
            </p>
          </div>

          {/* Powerful */}
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">Powerful</h3>
            <p className="text-gray-500 text-base">
              Give investors the tools and technology they need to make informed
              decisions and manage their investments with confidence.
            </p>
          </div>

          {/* Transparent */}
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">
              Transparent
            </h3>
            <p className="text-gray-500 text-base">
              Keep every step clear and straightforward, from pricing and
              information to the way investments are managed.
            </p>
          </div>

          {/* Empowering */}
          <div className="custom-card">
            <h3 className="text-lg font-semibold text-[#2e0063] mb-2">
              Empowering
            </h3>
            <p className="text-gray-500 text-base">
              Provide the knowledge, tools, and resources people need to take
              greater control of their financial future.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards;
