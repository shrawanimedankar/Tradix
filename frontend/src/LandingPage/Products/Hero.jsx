import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container mx-auto  mb-0">
      <div className="text-center mt-10 p-6">
        <h1 className="text-3xl font-semibold text-[#2e0063]">
          Tradix Products
        </h1>

        <h3 className="text-gray-700 text-xl mt-3">
          Simple, powerful tools for modern investors
        </h3>

        <p className="mt-4 mb-10">
          Explore our&nbsp;
          <Link to="" className="text-[#6100d0] hover:text-[#16A34A] hover:underline ">
            
            investment offerings
            <i className="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Hero;
