import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="bg-[#6100d011]">
      <div className="container mx-auto mb-0 px-5 py-10">
        <div className="text-center">
          <h1 className="mb-2 mt-5 text-xl font-semibold md:text-2xl">
            Open a Tradix account
          </h1>

          <p className="mb-5 text-sm md:text-base">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday
            and F&O trades.
          </p>

          <Link to="/signup" className="custom-button inline-block">
            Sign up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;