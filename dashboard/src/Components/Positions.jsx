import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
const API_URL = import.meta.env.VITE_API_URL;

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllPositions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [generalContext.refreshData]);

  return (
    <>
      <h3 className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] font-semibold text-[#373737] mb-[5%] sm:mb-[3%] md:mb-[2%]">
        Positions ({allPositions.length})
      </h3>

      {allPositions.length === 0 ? (
        <p className="text-center text-[#434343] text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] font-light mt-[10%] sm:mt-[8%] md:mt-[6%] px-[15px]">
          You don't have any positions yet
        </p>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block w-full overflow-x-auto">
            <div className="[&_table]:w-full [&_table]:border-collapse [&_tr]:border-t [&_tr]:border-b [&_tr]:border-[#373737] [&_th]:text-center [&_th]:py-[15px] [&_th]:px-[6px] [&_th]:text-[#373737] [&_th]:font-medium [&_th]:text-[1rem] [&_th]:tracking-[0.05rem] [&_th]:bg-[rgba(255,255,255,0.434)] [&_td]:py-[10px] [&_td]:px-[7px] [&_td]:text-center [&_td]:font-normal [&_td]:text-[0.9rem] [&_td]:text-[#373737] [&_td]:tracking-[0.05rem] [&_th:first-child]:text-left [&_td:first-child]:text-left [&_td:last-child]:text-[0.8rem]">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Avg.</th>
                    <th>LTP</th>
                    <th>P&L</th>
                    <th>Chg.</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allPositions.map((stock) => {
                    const curValue = stock.price * stock.qty;
                    const isProfit = curValue - stock.avg * stock.qty >= 0.0;

                    const profClass = isProfit ? "profit" : "loss";
                    const dayClass = stock.isLoss ? "loss" : "profit";

                    return (
                      <tr key={stock._id}>
                        <td>{stock.product}</td>
                        <td>{stock.name}</td>
                        <td>{stock.qty}</td>
                        <td>{stock.avg.toFixed(2)}</td>
                        <td>{stock.price.toFixed(2)}</td>

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
                            dayClass === "profit"
                              ? "text-[rgb(0,183,61)]"
                              : "text-[rgb(255,0,0)]"
                          }
                        >
                          {stock.day}
                        </td>

                        <td>
                          <button
                            className="bg-[#ff5722] text-white font-normal text-[0.8rem] cursor-pointer py-[7px] px-[10px] rounded-[2px]"
                            onClick={() =>
                              generalContext.openSellWindow(
                                stock.name,
                                stock.price,
                                "MIS",
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
            {allPositions.map((stock) => {
              const curValue = stock.price * stock.qty;

              const isProfit = curValue - stock.avg * stock.qty >= 0.0;

              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <div
                  key={stock._id}
                  className="w-full border border-[#ddd] rounded-[6px] bg-white p-[15px] box-border shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                >
                  {/* Product + Instrument + Sell */}
                  <div className="flex items-center justify-between gap-[10px] pb-[10px] mb-[12px] border-b border-[#ddd]">
                    <div className="min-w-0">
                      <p className="text-[0.7rem] text-[#999]">
                        {stock.product}
                      </p>

                      <h4 className="text-[1rem] font-semibold text-[#373737] truncate">
                        {stock.name}
                      </h4>
                    </div>

                    <button
                      className="shrink-0 bg-[#ff5722] text-white font-normal text-[0.8rem] cursor-pointer py-[7px] px-[12px] rounded-[2px]"
                      onClick={() =>
                        generalContext.openSellWindow(
                          stock.name,
                          stock.price,
                          "MIS",
                        )
                      }
                    >
                      Sell
                    </button>
                  </div>

                  {/* Position Details */}
                  <div className="grid grid-cols-2 gap-x-[15px] gap-y-[15px]">
                    <div>
                      <p className="text-[0.7rem] text-[#999]">Qty.</p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        {stock.qty}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">Avg.</p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        ₹{stock.avg.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">LTP</p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        ₹{stock.price.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">Current value</p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        ₹{curValue.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">P&L</p>

                      <p
                        className={
                          isProfit
                            ? "text-[0.9rem] font-medium text-[rgb(0,183,61)]"
                            : "text-[0.9rem] font-medium text-[rgb(255,0,0)]"
                        }
                      >
                        {(curValue - stock.avg * stock.qty).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">Chg.</p>

                      <p
                        className={
                          dayClass === "profit"
                            ? "text-[0.9rem] font-medium text-[rgb(0,183,61)]"
                            : "text-[0.9rem] font-medium text-[rgb(255,0,0)]"
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
    </>
  );
};

export default Positions;
