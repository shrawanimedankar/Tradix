import React from "react";

function Hero() {
  return (
    <>
    <div className="container mx-auto">
      <div className="px-2 py-2 mt-10">
        <h1 className="text-center text-2xl font-bold text-[#2e0063]">
          We're here to make investing simple and accessible,
          <br />
          helping everyone build wealth with confidence.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-1 text-gray-500 text-base">
        {/* Left Column */}
        <div className="p-6">
          <p className="mb-6">
            Tradix is a modern investment platform that makes investing and
            trading simple, accessible, and easy to understand. It brings
            financial tools, market information, and investment opportunities
            together in one easy-to-use platform, helping users explore the
            financial markets with confidence.
          </p>

          <p className="mb-6">
            Built for every type of investor, from beginners to experienced
            users. It offers a simple platform to explore stocks, mutual funds,
            ETFs, IPOs, bonds, derivatives, and more, while making it easy to
            discover opportunities and track market movements in one place.
          </p>

          <p className="mb-6">
            At Tradix, technology makes investing faster, simpler, and more
            convenient. Our platform is fast, responsive, and easy to use across
            devices, helping users explore investments and monitor their
            portfolios with ease.
          </p>

          <p className="mb-6">
            Our goal is to create a single, convenient environment where users
            can explore different possibilities and build an investment
            experience that works for them.
          </p>
        </div>

        {/* Right Column */}
        <div className="p-6">
          <p className="mb-6">
            Financial markets can feel complicated, especially for beginners.
            Tradix makes investing simple, clear, and easy to navigate, helping
            users understand market information and make informed decisions
            based on their goals and research.
          </p>

          <p className="mb-6">
            Tradix is built with that vision in mind — bringing technology and
            investing together to create a better way to experience the
            financial markets.
          </p>

          <p className="mb-6">
            Our vision is to create a world where investing is not limited by
            complexity. We want to make financial markets easier to explore for
            people at every stage of their investing journey. By combining
            technology, simplicity, and accessibility, Tradix aims to create an
            experience where users can approach investing with greater clarity
            and confidence. Tradix is built to continuously improve the way
            people interact with financial markets by creating tools and
            experiences that are simple, transparent, and designed around the
            user.
          </p>
        </div>
      </div>
      </div>

      <div className="relative">
        <img
          src="/media/images/about.png"
          alt="Hero Image"
          className="w-full h-auto block"
        />
      </div>
    </>
  );
}

export default Hero;
