import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "./loginSchema";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (!result.success) {
        setLoginError(result.message);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("fullName", result.data.fullName);
        window.location.href = `http://localhost:5174/?token=${result.data.token}`;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white px-8 py-5 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back to Tradix
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue your investing journey
          </p>
        </div>

        {loginError && (
          <p className="text-red-700 bg-red-100 text-sm mt-1 px-2 py-2 rounded">
            {loginError}
          </p>
        )}
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-2 border text-lg border-gray-300 rounded-lg outline-none focus:border-purple-600"
            />

            {errors.password && (
              <p className="text-red-700 bg-red-100 text-sm mt-1 px-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cutom-button transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-lg text-gray-600 mt-6">
          Don't have an account? &nbsp;
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 font-bold cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
