import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
const API_URL = import.meta.env.VITE_API_URL;

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
    .get(`${API_URL}/holdings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllHoldings(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [generalContext.refreshData]);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "#4e008d",
      },
    ],
  };

  return (
    <>
      <h3 className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] font-semibold text-[#373737] mb-[5%] sm:mb-[3%] md:mb-[2%]">
        Holdings ({allHoldings.length})
      </h3>

      {allHoldings.length === 0 ? (
        <p className="text-center text-[#434343] text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] font-light mt-[10%] sm:mt-[8%] md:mt-[6%] px-[15px]">
          You don't have any holdings yet
        </p>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block w-full overflow-x-auto">
            <div className="min-w-[900px] [&_table]:w-full [&_table]:border-collapse [&_tr]:border-t [&_tr]:border-b [&_tr]:border-[#373737] [&_th]:py-[10px] [&_th]:px-[8px] [&_th]:text-center [&_th]:text-[1rem] [&_th]:font-medium [&_th]:tracking-[0.04rem] [&_th]:text-[#373737] [&_th]:bg-[rgba(255,255,255,0.434)] [&_td]:py-[10px] [&_td]:px-[10px] [&_td]:text-center [&_td]:text-[0.9rem] [&_td]:font-normal [&_td]:tracking-[0.05rem] [&_td]:text-[#373737] [&_th:first-child]:text-left [&_td:first-child]:text-left [&_th:nth-child(1)]:border-r [&_th:nth-child(1)]:border-[#373737] [&_th:nth-child(4)]:border-r [&_th:nth-child(4)]:border-[#373737] [&_td:nth-child(1)]:border-r [&_td:nth-child(1)]:border-[#373737] [&_td:nth-child(4)]:border-r [&_td:nth-child(4)]:border-[#373737] [&_td:last-child]:text-[0.7rem]">
              <table>
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Avg. cost</th>
                    <th>LTP</th>
                    <th>Cur. val</th>
                    <th>P&L</th>
                    <th>Net chg.</th>
                    <th>Day chg.</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allHoldings.map((stock) => {
                    const curValue = stock.price * stock.qty;
                    const isProfit =
                      curValue - stock.avg * stock.qty >= 0.0;

                    const profClass = isProfit ? "profit" : "loss";
                    const dayClass = stock.isLoss ? "loss" : "profit";

                    return (
                      <tr key={stock._id}>
                        <td>{stock.name}</td>
                        <td>{stock.qty}</td>
                        <td>{stock.avg.toFixed(2)}</td>
                        <td>{stock.price.toFixed(2)}</td>
                        <td>{curValue.toFixed(2)}</td>

                        <td
                          className={
                            profClass === "profit"
                              ? "text-[rgb(0,183,61)]"
                              : "text-[rgb(255,0,0)]"
                          }
                        >
                          {(curValue - stock.avg * stock.qty).toFixed(2)}
                        </td>

                        <td
                          className={
                            profClass === "profit"
                              ? "text-[rgb(0,183,61)]"
                              : "text-[rgb(255,0,0)]"
                          }
                        >
                          {stock.net}
                        </td>

                        <td
                          className={
                            dayClass === "profit"
                              ? "text-[rgb(0,183,61)]"
                              : "text-[rgb(255,0,0)]"
                          }
                        >
                          {stock.day}
                        </td>

                        <td>
                          <button
                            className="bg-[#ff5722] text-white font-normal text-[0.8rem] cursor-pointer p-2 rounded-[2px]"
                            onClick={() =>
                              generalContext.openSellWindow(
                                stock.name,
                                stock.price,
                                "CNC",
                              )
                            }
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="block md:hidden w-full space-y-[15px]">
            {allHoldings.map((stock) => {
              const curValue = stock.price * stock.qty;

              const isProfit =
                curValue - stock.avg * stock.qty >= 0.0;

              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <div
                  key={stock._id}
                  className="w-full border border-[#ddd] rounded-[6px] p-[15px] box-border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                >
                  {/* Stock name + Sell */}
                  <div className="flex items-center justify-between mb-[15px] pb-[10px] border-b border-[#ddd]">
                    <h4 className="text-[1rem] font-semibold text-[#373737]">
                      {stock.name}
                    </h4>

                    <button
                      className="bg-[#ff5722] text-white font-normal text-[0.8rem] cursor-pointer py-[7px] px-[12px] rounded-[2px]"
                      onClick={() =>
                        generalContext.openSellWindow(
                          stock.name,
                          stock.price,
                          "CNC",
                        )
                      }
                    >
                      Sell
                    </button>
                  </div>

                  {/* Holding information */}
                  <div className="grid grid-cols-2 gap-x-[15px] gap-y-[15px]">

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Qty.
                      </p>
                      <p className="text-[0.9rem] text-[#373737] font-medium">
                        {stock.qty}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Avg. cost
                      </p>
                      <p className="text-[0.9rem] text-[#373737] font-medium">
                        ₹{stock.avg.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        LTP
                      </p>
                      <p className="text-[0.9rem] text-[#373737] font-medium">
                        ₹{stock.price.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Current value
                      </p>
                      <p className="text-[0.9rem] text-[#373737] font-medium">
                        ₹{curValue.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        P&L
                      </p>
                      <p
                        className={
                          isProfit
                            ? "text-[0.9rem] text-[rgb(0,183,61)] font-medium"
                            : "text-[0.9rem] text-[rgb(255,0,0)] font-medium"
                        }
                      >
                        {(curValue - stock.avg * stock.qty).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Net chg.
                      </p>
                      <p
                        className={
                          isProfit
                            ? "text-[0.9rem] text-[rgb(0,183,61)] font-medium"
                            : "text-[0.9rem] text-[rgb(255,0,0)] font-medium"
                        }
                      >
                        {stock.net}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Day chg.
                      </p>
                      <p
                        className={
                          dayClass === "profit"
                            ? "text-[0.9rem] text-[rgb(0,183,61)] font-medium"
                            : "text-[0.9rem] text-[rgb(255,0,0)] font-medium"
                        }
                      >
                        {stock.day}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Summary */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-[25px] mt-[10%] sm:mt-[7%] md:mt-[5%]">

        <div>
          <h5 className="text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] text-[#373737] font-light">
            {allHoldings
              .reduce(
                (total, stock) => total + stock.avg * stock.qty,
                0,
              )
              .toFixed(2)}
          </h5>

          <p className="text-[0.8rem] text-[#373737] font-semibold mt-[2%]">
            Total investment
          </p>
        </div>

        <div>
          <h5 className="text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] text-[#373737] font-light">
            {allHoldings
              .reduce(
                (total, stock) => total + stock.price * stock.qty,
                0,
              )
              .toFixed(2)}
          </h5>

          <p className="text-[0.8rem] text-[#373737] font-semibold mt-[2%]">
            Current value
          </p>
        </div>

        <div>
          <h5 className="text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] text-[rgb(72,194,55)] font-light break-words">
            {(() => {
              const investment = allHoldings.reduce(
                (total, stock) => total + stock.avg * stock.qty,
                0,
              );

              const currentValue = allHoldings.reduce(
                (total, stock) => total + stock.price * stock.qty,
                0,
              );

              const pnl = currentValue - investment;

              const pnlPercentage =
                investment > 0 ? (pnl / investment) * 100 : 0;

              return `${pnl.toFixed(2)} (${
                pnlPercentage >= 0 ? "+" : ""
              }${pnlPercentage.toFixed(2)}%)`;
            })()}
          </h5>

          <p className="text-[0.8rem] text-[#373737] font-semibold mt-[2%]">
            P&L
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="w-full mt-[8%] sm:mt-[6%] md:mt-[5%] overflow-hidden">
        <div className="w-full max-w-full">
          <VerticalGraph data={data} />
        </div>
      </div>
    </>
  );
};

export default Holdings;