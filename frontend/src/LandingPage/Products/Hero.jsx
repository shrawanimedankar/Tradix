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
      </div>
    </div>
  );
}

export default Hero;
