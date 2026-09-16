import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fullName = user?.fullName || "User";

  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    window.location.href = "http://localhost:5173/";
  };

  const menuClass =
    "text-[0.9rem] md:text-[1rem] font-medium text-black hover:text-[rgb(225,0,0)]";

  const activeMenuClass =
    "text-[0.9rem] md:text-[1rem] font-medium text-[rgb(225,0,0)]";

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="basis-[68%] h-full min-w-0 py-[10px] px-[15px] md:px-[20px] box-border flex items-center justify-between">

      {/* Logo */}
      <img
        src="/media/images/logo.png"
        className="h-[32px] sm:h-[36px] md:h-[40px] shrink-0"
        alt="Logo"
      />

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-evenly">
        <ul className="list-none m-0 p-0 flex items-center">

          <li className="inline-block mr-[20px] xl:mr-[30px]">
            <Link className="no-underline" to="/">
              <p
                className={
                  location.pathname === "/" ? activeMenuClass : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>

          <li className="inline-block mr-[20px] xl:mr-[30px]">
            <Link className="no-underline" to="/orders">
              <p
                className={
                  location.pathname === "/orders"
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          <li className="inline-block mr-[20px] xl:mr-[30px]">
            <Link className="no-underline" to="/holdings">
              <p
                className={
                  location.pathname === "/holdings"
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          <li className="inline-block mr-[20px] xl:mr-[30px]">
            <Link className="no-underline" to="/positions">
              <p
                className={
                  location.pathname === "/positions"
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          <li className="inline-block mr-[20px] xl:mr-[30px]">
            <Link className="no-underline" to="/funds">
              <p
                className={
                  location.pathname === "/funds"
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>
        </ul>

        <hr className="border-l-[0.8px] border-l-[rgb(9,9,9)] h-[30px] mx-[5px]" />

        {/* Desktop Profile */}
        <div ref={profileRef} className="relative ml-[15px]">
          <div
            className="flex items-center justify-evenly hover:cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="text-center relative text-[0.9rem] font-normal text-[rgb(255,0,0)] justify-center items-center rounded-full flex bg-white mr-[8px] border border-black p-[5px]">
              {initials}
            </div>

            <p className="text-[0.8rem] font-medium hover:text-[rgb(255,0,0)]">
              {fullName}
            </p>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+5px)] w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-[100] overflow-hidden">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate("/profile");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden relative flex items-center">

        {/* Profile */}
        <div ref={profileRef} className="relative mr-[10px] sm:mr-[15px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="text-center text-[0.8rem] font-normal text-red-500 flex justify-center items-center rounded-full bg-white mr-[5px] border border-black p-[4px]">
              {initials}
            </div>

            <p className="hidden sm:block text-[0.75rem] font-medium">
              {fullName}
            </p>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+5px)] w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-[100] overflow-hidden">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate("/profile");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[1.5rem] leading-none px-[8px] py-[4px] border border-gray-300 rounded-md bg-white"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+5px)] w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-[8px]">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-[15px] py-[10px] no-underline ${
                location.pathname === "/" ? "text-red-600" : "text-black"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className={`block px-[15px] py-[10px] no-underline ${
                location.pathname === "/orders"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              Orders
            </Link>

            <Link
              to="/holdings"
              onClick={closeMobileMenu}
              className={`block px-[15px] py-[10px] no-underline ${
                location.pathname === "/holdings"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              Holdings
            </Link>

            <Link
              to="/positions"
              onClick={closeMobileMenu}
              className={`block px-[15px] py-[10px] no-underline ${
                location.pathname === "/positions"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              Positions
            </Link>

            <Link
              to="/funds"
              onClick={closeMobileMenu}
              className={`block px-[15px] py-[10px] no-underline ${
                location.pathname === "/funds"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              Funds
            </Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;