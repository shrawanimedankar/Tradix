import React from "react";

function Education() {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/media/images/education.svg"
            className="w-full max-w-md md:w-[70%]"
            alt="Education"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="mb-3 text-xl md:text-2xl font-semibold">
            Free and open market education
          </h1>

          <p className="mb-3">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>

          <a
            href="#"
            className="custom-link"
          >
            Varsity
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>

          <p className="mt-8 mb-3">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <a
            href="#"
            className="custom-link"
          >
            TradingQ&A
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <img
        src="/media/images/a.png"
        alt="Tradix ecosystem"
        className="w-3/4 mx-auto mb-2 mt-10"
      />
    </div>
  );
}

export default Education;
