import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
const API_URL = import.meta.env.VITE_API_URL;

const Summary = ({ user }) => {
  const [funds, setFunds] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/funds`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setFunds(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [generalContext.refreshData]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/holdings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setHoldings(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [generalContext.refreshData]);

  return (
    <div className="w-full">
      {/* Username */}
      <div className="w-full">
        <h1 className="text-[1.6rem] sm:text-[2rem] font-bold text-[#2e0063] break-words">
          Hi, {user?.fullName || "User"}!
        </h1>

        <hr className="border-none bg-[#d1d1d1] h-px my-[20px] mb-[8%] sm:mb-[5%]" />
      </div>

      {/* Equity */}
      <div className="w-full pb-[2%]">
        <span className="flex items-center mb-[5%] sm:mb-[2%]">
          <p className="text-[1.1rem] sm:text-[1.2rem] font-light">Equity</p>
        </span>

        <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-[25px] sm:gap-0">
          {/* Margin Available */}
          <div className="w-full sm:w-auto">
            <h3 className="text-[2rem] sm:text-[2.5rem] font-light text-[rgb(71,71,71)] break-words">
              ₹{funds ? funds.availableFunds.toLocaleString("en-IN") : "0"}
            </h3>

            <p className="text-[0.8rem] text-[rgb(136,136,136)]">
              Margin available
            </p>
          </div>

          <hr className="hidden sm:block border-l-[0.6px] border-l-[rgb(243,242,242)] h-[70px]" />

          {/* Used / Opening */}
          <div className="w-full sm:w-auto">
            <p className="text-[0.8rem] text-[rgb(136,136,136)] mb-[10px] whitespace-nowrap">
              Margins used{" "}
              <span className="inline ml-[5%] text-[0.9rem] text-[rgb(100,100,100)]">
                ₹{funds ? funds.usedFunds.toLocaleString("en-IN") : "0"}
              </span>
            </p>

            <p className="text-[0.8rem] text-[rgb(136,136,136)] mb-[10px] whitespace-nowrap">
              Opening balance{" "}
              <span className="inline ml-[5%] text-[0.9rem] text-[rgb(100,100,100)]">
                ₹{funds ? funds.openingBalance.toLocaleString("en-IN") : "0"}
              </span>
            </p>
          </div>
        </div>

        <hr className="border-none bg-[#d1d1d1] h-px my-[20px] mb-[8%] sm:mb-[5%]" />
      </div>

      {/* Holdings */}
      <div className="w-full pb-[2%]">
        <span className="flex items-center mb-[5%] sm:mb-[2%]">
          <p className="text-[1.1rem] sm:text-[1.2rem] font-light">
            Holdings ({holdings.length})
          </p>
        </span>

        <div className="w-full sm:w-1/2 flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-[25px] sm:gap-0">
          {/* P&L */}
          <div className="w-full sm:w-auto">
            <h3 className="text-[2rem] sm:text-[2.5rem] font-light text-[rgb(0,183,61)] break-words">
              ₹
              {holdings
                .reduce(
                  (total, holding) =>
                    total + (holding.price - holding.avg) * holding.qty,
                  0,
                )
                .toLocaleString("en-IN")}
              <small className="text-[0.9rem] sm:text-[1rem] text-[rgb(0,183,61)] ml-[5px]">
                {(() => {
                  const investment = holdings.reduce(
                    (total, holding) => total + holding.qty * holding.avg,
                    0,
                  );

                  const currentValue = holdings.reduce(
                    (total, holding) => total + holding.qty * holding.price,
                    0,
                  );

                  const pnlPercentage =
                    investment > 0
                      ? ((currentValue - investment) / investment) * 100
                      : 0;

                  return ` ${pnlPercentage >= 0 ? "+" : ""}${pnlPercentage.toFixed(2)}%`;
                })()}
              </small>
            </h3>

            <p className="text-[0.8rem] text-[rgb(136,136,136)]">P&L</p>
          </div>

          <hr className="hidden sm:block border-l-[0.6px] border-l-[rgb(243,242,242)] h-[70px]" />

          {/* Current Value / Investment */}
          <div className="w-full sm:w-auto">
            <p className="text-[0.8rem] text-[rgb(136,136,136)] mb-[10px] whitespace-nowrap">
              Current Value{" "}
              <span className="inline ml-[5%] text-[0.9rem] text-[rgb(100,100,100)]">
                ₹
                {holdings
                  .reduce(
                    (total, holding) => total + holding.qty * holding.price,
                    0,
                  )
                  .toLocaleString("en-IN")}
              </span>
            </p>

            <p className="text-[0.8rem] text-[rgb(136,136,136)] mb-[10px] whitespace-nowrap">
              Investment{" "}
              <span className="inline ml-[5%] text-[0.9rem] text-[rgb(100,100,100)]">
                ₹
                {holdings
                  .reduce(
                    (total, holding) => total + holding.qty * holding.avg,
                    0,
                  )
                  .toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        </div>

        <hr className="border-none bg-[#d1d1d1] h-px my-[20px] mb-[5%]" />
      </div>
    </div>
  );
};

export default Summary;
