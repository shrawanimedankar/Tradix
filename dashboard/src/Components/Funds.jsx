import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
const API_URL = import.meta.env.VITE_API_URL;

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [addFundsError, setAddFundsError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const generalContext = useContext(GeneralContext);


  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/funds`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFunds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [generalContext.refreshData]);

  const handleAddFunds = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/funds/add`,
        {
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFunds(res.data.data);
      setAmount("");
      setAddFundsError("");
      setShowAddFunds(false);
    } catch (error) {
      setAddFundsError(
        error.response?.data?.message || "Something went wrong",
      );
    }
  };

  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/funds/add`,
        {
          amount: Number(withdrawAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFunds(res.data.data);
      setWithdrawAmount("");
      setShowWithdraw(false);
    } catch (error) {
      setWithdrawError(
        error.response?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="w-full px-[15px] sm:px-[20px] md:px-[25px] lg:px-[30px] box-border">

      {/* Header */}
      <div className="flex flex-col gap-[20px] sm:flex-row sm:items-center sm:justify-between mb-[25px]">

        <div>
          <p className="mt-[6px] text-[#424242] text-[0.95rem] sm:text-[1rem]">
            Manage your trading account balance
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[12px] w-full sm:w-auto">

          <button
            className="border-none py-[10px] px-[20px] rounded-[6px] cursor-pointer text-[1rem] sm:text-[1.1rem] md:text-[1rem] text-white bg-[#18871c] hover:bg-[#37ac3b] w-full sm:w-auto"
            onClick={() => setShowAddFunds(true)}
          >
            + Add Funds
          </button>

          <button
            className="border-none py-[10px] px-[20px] rounded-[6px] cursor-pointer text-[1rem] sm:text-[1.1rem] md:text-[1rem] text-white bg-[#2d67c3] hover:bg-[#3980f4] w-full sm:w-auto"
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw
          </button>

        </div>
      </div>

      {/* Available Funds Card */}
      <div className="w-full bg-white border border-[#eee] rounded-[10px] p-[18px] sm:p-[22px] md:p-[25px] mb-[30px] box-border">

        <p className="m-0 text-[#777] text-[0.95rem]">
          Available Funds
        </p>

        <h1 className="my-[10px] text-[26px] sm:text-[30px] md:text-[32px] font-bold">
          ₹{funds ? funds.availableFunds.toLocaleString("en-IN") : "0"}
        </h1>

        <span className="text-[#999] text-[13px]">
          Amount available for trading
        </span>

      </div>

      {/* Equity Section */}
      <div className="w-full mt-[30px]">

        <h3 className="mb-[15px] text-[1.2rem] sm:text-[1.3rem] font-semibold">
          Equity
        </h3>

        <div className="w-full lg:w-[70%] bg-white border border-[#eee] rounded-[8px] px-[15px] sm:px-[20px] py-[10px] box-border">

          {/* Available Funds */}
          <div className="flex justify-between items-center gap-[15px] py-[18px] px-[5px] border-b border-[#eee]">

            <p className="m-0 text-[#777]">
              Available funds
            </p>

            <p className="m-0 font-medium text-right text-[#4caf50]">
              ₹
              {funds
                ? funds.availableFunds.toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

          {/* Used Funds */}
          <div className="flex justify-between items-center gap-[15px] py-[18px] px-[5px] border-b border-[#eee]">

            <p className="m-0 text-[#777]">
              Used funds
            </p>

            <p className="m-0 font-medium text-right">
              ₹
              {funds
                ? funds.usedFunds.toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

          {/* Available Cash */}
          <div className="flex justify-between items-center gap-[15px] py-[18px] px-[5px] border-b border-[#eee]">

            <p className="m-0 text-[#777]">
              Available cash
            </p>

            <p className="m-0 font-medium text-right">
              ₹
              {funds
                ? funds.availableFunds.toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

          {/* Opening Balance */}
          <div className="flex justify-between items-center gap-[15px] py-[18px] px-[5px] border-b border-[#eee]">

            <p className="m-0 text-[#777]">
              Opening balance
            </p>

            <p className="m-0 text-right">
              ₹
              {funds
                ? funds.openingBalance.toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

          {/* Payin */}
          <div className="flex justify-between items-center gap-[15px] py-[18px] px-[5px]">

            <p className="m-0 text-[#777]">
              Payin
            </p>

            <p className="m-0 text-right">
              ₹
              {funds
                ? funds.payin.toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

        </div>

        {/* Add Funds Box */}
        {showAddFunds && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[20px] sm:p-[25px] w-[calc(100%-30px)] sm:w-[400px] max-w-[400px] rounded-[10px] shadow-[0_5px_25px_rgba(0,0,0,0.2)] z-[1000] box-border">

            <h3 className="mb-[20px] text-[1.2rem] font-semibold">
              Add Funds
            </h3>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-[10px] px-[10px] mb-[20px] box-border border border-gray-300 rounded-[4px] outline-none focus:border-blue-500"
            />

            {addFundsError && (
              <p className="text-red-600 text-[1rem] sm:text-[1.1rem] font-medium my-[-10px] mb-[15px] bg-[rgb(245,198,198)] p-[5px] break-words">
                {addFundsError}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-[10px]">

              <button
                className="border-none py-[10px] px-[20px] rounded-[2px] cursor-pointer text-white bg-[#4caf50] hover:bg-[#7bdd7f] w-full sm:w-auto"
                onClick={handleAddFunds}
              >
                Add
              </button>

              <button
                className="border-none py-[10px] px-[20px] rounded-[2px] cursor-pointer text-white bg-gray-500 hover:bg-gray-600 w-full sm:w-auto"
                onClick={() => {
                  setShowAddFunds(false);
                  setAddFundsError("");
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* Withdraw Box */}
        {showWithdraw && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[20px] sm:p-[25px] w-[calc(100%-30px)] sm:w-[400px] max-w-[400px] rounded-[10px] shadow-[0_5px_25px_rgba(0,0,0,0.2)] z-[1000] box-border">

            <h3 className="mb-[20px] text-[1.2rem] font-semibold">
              Withdraw Funds
            </h3>

            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full py-[10px] px-[10px] mb-[20px] box-border border border-gray-300 rounded-[4px] outline-none focus:border-blue-500"
            />

            {withdrawError && (
              <p className="text-red-600 text-[1rem] sm:text-[1.1rem] font-medium my-[-10px] mb-[15px] bg-[rgb(245,198,198)] p-[5px] break-words">
                {withdrawError}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-[10px]">

              <button
                className="border-none py-[10px] px-[20px] rounded-[2px] cursor-pointer text-white bg-[#4184f3] hover:bg-[#74a7fa] w-full sm:w-auto"
                onClick={handleWithdraw}
              >
                Withdraw
              </button>

              <button
                className="border-none py-[10px] px-[20px] rounded-[2px] cursor-pointer text-white bg-gray-500 hover:bg-gray-600 w-full sm:w-auto"
                onClick={() => {
                  setShowWithdraw(false);
                  setWithdrawError("");
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Funds;