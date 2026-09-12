import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "./signupSchema";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white px-8 py-5 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your Tradix account
          </h1>
          <p className="text-gray-500 mt-2">
            Start your investing journey with Tradix
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName")}
              className="w-full px-4 py-2 border text-lg border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
            {errors.fullName && (
              <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 border text-lg border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
            {errors.email && (
              <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full px-4 py-2 border text-lg border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
            {errors.password && (
              <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border text-lg border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />
            {errors.confirmPassword && (
              <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              {...register("termsAccepted")}
              className="mt-1"
            />
            <p>
              I agree to the
              <span className="text-purple-600 cursor-pointer">
                Terms & Conditions
              </span>
              and
              <span className="text-purple-600 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
              {errors.termsAccepted.message}
            </p>
          )}
          <button type="submit" className="w-full cutom-button transition">
            Create Account
          </button>
        </form>
        <p className="text-center text-lg text-gray-600 mt-6">
          Already have an account?
          <span className="text-purple-600 font-bold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
