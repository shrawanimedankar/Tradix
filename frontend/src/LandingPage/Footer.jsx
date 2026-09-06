import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f001e]">
      <div className="container mx-auto px-5 py-10  mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img
                src="/media/images/logoName.png"
                className="w-35"
                alt="Logo"
              />
            </Link>
            <p className="text-sm text-gray-300">
              &copy; 2026
              <br />
              All rights reserved.
            </p>
          </div>
          {/* Company */}
          <div>
            <p className="font-semibold mb-4 text-white">Company</p>
            <div className="flex flex-col gap-2">
              <Link
                to="/about"
                className="text-gray-300 no-underline hover:text-[#16A34A]"
              >
                About
              </Link>

              <Link
                to="/product"
                className="text-gray-300 no-underline hover:text-[#16A34A]"
              >
                Products
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 no-underline hover:text-[#16A34A]"
              >
                Pricing
              </Link>
              <Link
                to="/support"
                className="text-gray-300 no-underline hover:text-[#16A34A]"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-gray-300 text-xs leading-relaxed">
          <p>
            Tradix is a personal project created for educational and
            demonstration purposes. It is not a registered stockbroker,
            investment adviser, or financial institution. No real investments,
            trades, or financial transactions are processed through this
            website.
          </p>
          <p>
            Investing and trading in financial markets involves risk. The
            information presented on this website is for educational purposes
            only and should not be considered financial, investment, or trading
            advice. Always conduct your own research before making financial
            decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
