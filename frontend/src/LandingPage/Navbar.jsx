import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-gradient-to-r from-white via-[#af68ff] via-30% to-[#8cffb6]">
      <div className="container mx-auto px-5 py-5">
        {/* Navbar top */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/media/images/logoName.png" className="w-40" alt="Logo" />
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black text-2xl"
          >
            ☰
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            <Link
              to="/signup"
              className="text-black font-bold text-xl no-underline hover:text-gray-600"
            >
              Signup
            </Link>

            <Link
              to="/about"
              className="text-black font-bold text-xl no-underline hover:text-gray-600"
            >
              About
            </Link>

            <Link
              to="/product"
              className="text-black font-bold text-xl no-underline hover:text-gray-600"
            >
              Product
            </Link>

            <Link
              to="/pricing"
              className="text-black font-bold text-xl no-underline hover:text-gray-600"
            >
              Pricing
            </Link>

            <Link
              to="/support"
              className="text-black font-bold text-xl no-underline hover:text-gray-600"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-5 pb-3">
            <Link to="/signup" className="text-black font-semibold text-lg no-underline">
              Signup
            </Link>

            <Link to="/about" className="text-black font-semibold text-lg no-underline">
              About
            </Link>

            <Link to="/product" className="text-black font-semibold text-lg no-underline">
              Product
            </Link>

            <Link to="/pricing" className="text-black font-semibold text-lg no-underline">
              Pricing
            </Link>

            <Link to="/support" className="text-black font-semibold text-lg no-underline">
              Support
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
