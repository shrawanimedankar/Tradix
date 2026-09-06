import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto px-5 py-12 mb-12">
      <div className="text-center">
        <img src="/media/images/notFound.png" alt="404"  className="mx-auto w-54"/>
        <h1 className="font-bold text-2xl text-gray-900 mt-2">NOT FOUND</h1>
        <p className="mt-0 mb-5 text-gray-800">
          Sorry, the page you are trying to access has been moved or no longer
          exists.
        </p>
        <Link
          to="/"
          className="bg-[#6100d0] text-white font-semibold px-6 py-2 rounded w-fit mt-5 hover:bg-[#16A34A] hover:text-black transition"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
