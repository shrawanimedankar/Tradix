import { Link } from "react-router-dom";

function Education() {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="/media/images/education.svg"
            className="w-full max-w-md md:w-[70%]"
            alt="Market education"
          />
        </div>

        <div>
          <h1 className="mb-3 text-xl font-semibold md:text-2xl">
            Free and open market education
          </h1>

          <p className="mb-3">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>

          <Link to="/varsity" className="custom-link">
            Varsity
            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>
          </Link>

          <p className="mb-3 mt-8">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <Link to="/trading-qa" className="custom-link">
            TradingQ&A
            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </div>

      <img
        src="/media/images/a.png"
        alt="Tradix ecosystem"
        className="mx-auto mb-2 mt-10 w-3/4"
      />
    </div>
  );
}

export default Education;