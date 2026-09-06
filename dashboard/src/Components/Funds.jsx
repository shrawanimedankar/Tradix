import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Funds.css";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [addFundsError, setAddFundsError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/funds")
      .then((res) => {
        setFunds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddFunds = async () => {
    try {
      const res = await axios.post("http://localhost:8080/addFunds", {
        amount: Number(amount),
      });

      setFunds(res.data.data);
      setAmount("");
      setAddFundsError("");
      setShowAddFunds(false);
    } catch (error) {
      setAddFundsError(error.response?.data?.message || "Something went wrong");
    }
  };
  const handleWithdraw = async () => {
    try {
      const res = await axios.post("http://localhost:8080/withdrawFunds", {
        amount: Number(withdrawAmount),
      });

      setFunds(res.data.data);
      setWithdrawAmount("");
      setShowWithdraw(false);
    } catch (error) {
      setWithdrawError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="funds-page">
      <div className="funds-header">
        <div>
          <p>Manage your trading account balance</p>
        </div>

        <div className="fund-buttons">
          <button className="btn-green" onClick={() => setShowAddFunds(true)}>
            + Add Funds
          </button>

          <button
            className="btn btn-blue"
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Available Funds Card */}
      <div className="fund-card">
        <p>Available Funds</p>

        <h1>₹{funds ? funds.availableFunds.toLocaleString("en-IN") : "0"}</h1>

        <span>Amount available for trading</span>
      </div>

      {/* Equity Section */}
      <div className="equity-section">
        <h3>Equity</h3>

        <div className="table">
          <div className="data">
            <p>Available funds</p>
            <p className="imp colored">
              ₹{funds ? funds.availableFunds.toLocaleString("en-IN") : "0"}
            </p>
          </div>

          <div className="data">
            <p>Used funds</p>
            <p className="imp">
              ₹{funds ? funds.usedFunds.toLocaleString("en-IN") : "0"}
            </p>
          </div>

          <div className="data">
            <p>Available cash</p>
            <p className="imp">
              ₹{funds ? funds.availableFunds.toLocaleString("en-IN") : "0"}
            </p>
          </div>

          <div className="data">
            <p>Opening balance</p>
            <p>₹{funds ? funds.openingBalance.toLocaleString("en-IN") : "0"}</p>
          </div>

          <div className="data">
            <p>Payin</p>
            <p>₹{funds ? funds.payin.toLocaleString("en-IN") : "0"}</p>
          </div>
        </div>

        {/* Add Funds Box */}
        {showAddFunds && (
          <div className="add-funds-box">
            <h3>Add Funds</h3>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {addFundsError && <p className="fund-error">{addFundsError}</p>}

            <div>
              <button className="btn btn-green" onClick={handleAddFunds}>
                Add
              </button>

              <button
                className="btn btn-grey"
                onClick={() => setShowAddFunds(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Withdraw Box */}
        {showWithdraw && (
          <div className="add-funds-box">
            <h3>Withdraw Funds</h3>

            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            {withdrawError && <p className="fund-error">{withdrawError}</p>}

            <div>
              <button className="btn btn-blue" onClick={handleWithdraw}>
                Withdraw
              </button>

              <button
                className="btn btn-grey"
                onClick={() => setShowWithdraw(false)}
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
