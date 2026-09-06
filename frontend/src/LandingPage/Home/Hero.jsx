import React from "react";

function Hero() {
  return (
    <div className="w-full">
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="/media/images/homeHero.png"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1 sm:top-4 sm:left-2 md:top-6 md:left-4 lg:top-8 lg:left-6">
          <h1 className="text-xs sm:text-base md:text-2xl font-bold bg-white/80 px-2 w-fit text-black">
            Your world of trading & investing
          </h1>

          <p className="text-[9px] sm:text-xs md:text-sm  bg-white/80 px-1 mt-1 text-black">
            Invest and trade in stocks, mutual funds, ETFs, bonds, derivatives,
            and more with Tradix.
          </p>

          <button className="cutom-button mt-2">Sign up for free</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
