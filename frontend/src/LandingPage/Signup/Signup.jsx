import React from "react";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your Tradix account
          </h1>
          <p className="text-gray-500 mt-2">
            Start your investing journey with Tradix
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1" />
            <p>
              I agree to the{" "}
              <span className="text-purple-600 cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-purple-600 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Signup Button */}
          <button type="submit" className="w-full cutom-button transition">
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-purple-600 font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
