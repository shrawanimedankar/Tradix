import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full">
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/media/images/homeHero.jpeg"
          alt="Tradix trading and investing"
          className="h-full w-full object-cover"
        />

        <div className="absolute left-1 top-1 sm:left-2 sm:top-4 md:left-4 md:top-6 lg:left-6 lg:top-8">
          <h1 className="w-fit bg-white/80 px-2 text-xs font-bold text-black sm:text-sm md:text-xl">
            Your world of trading & investing
          </h1>

          <p className="mt-1 bg-white/80 px-1 text-[7px] text-black sm:text-xs md:text-sm">
            Invest and trade in stocks, mutual funds, ETFs, bonds, derivatives,
            and more with Tradix.
          </p>

          <Link to="/signup" className="custom-button mt-2 inline-block">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;