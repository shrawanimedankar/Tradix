import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [generalContext.refreshData]);

  return (
    <div className="w-full min-h-[90vh]">

      {allOrders.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center text-center">
          <p className="mt-[10%] sm:mt-[8%] md:mt-[6%] px-[15px] text-[0.9rem] sm:text-[1rem] text-[rgb(173,173,173)] font-light">
            You haven't placed any orders yet
          </p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block w-full overflow-x-auto">
            <div className="[&_table]:w-full [&_table]:border-collapse [&_tr]:border-t [&_tr]:border-b [&_tr]:border-[#373737] [&_th]:py-[10px] [&_th]:px-[8px] [&_th]:text-center [&_th]:text-[1rem] [&_th]:font-medium [&_th]:tracking-[0.04rem] [&_th]:text-[#373737] [&_th]:bg-[rgba(255,255,255,0.434)] [&_td]:py-[10px] [&_td]:px-[10px] [&_td]:text-center [&_td]:text-[0.9rem] [&_td]:font-normal [&_td]:tracking-[0.05rem] [&_td]:text-[#373737] [&_th:first-child]:text-left [&_td:first-child]:text-left [&_th:nth-child(1)]:border-r [&_th:nth-child(1)]:border-[#373737] [&_th:nth-child(4)]:border-r [&_th:nth-child(4)]:border-[#373737] [&_td:nth-child(1)]:border-r [&_td:nth-child(1)]:border-[#373737] [&_td:nth-child(4)]:border-r [&_td:nth-child(4)]:border-[#373737] [&_td:last-child]:text-[0.7rem]">

              <table>
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Price</th>
                    <th>Mode</th>
                    <th>Product</th>
                  </tr>
                </thead>

                <tbody>
                  {allOrders.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>{order.name}</td>
                        <td>{order.qty}</td>
                        <td>₹{Number(order.price).toFixed(2)}</td>
                        <td>{order.mode}</td>
                        <td>{order.product}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="block md:hidden w-full space-y-[12px]">

            {allOrders.map((order) => {
              return (
                <div
                  key={order._id}
                  className="w-full border border-[#ddd] rounded-[6px] bg-white p-[15px] box-border shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                >
                  {/* Instrument */}
                  <div className="flex items-center justify-between pb-[10px] mb-[12px] border-b border-[#ddd]">
                    <p className="text-[1rem] font-semibold text-[#373737]">
                      {order.name}
                    </p>

                    <p
                      className={
                        order.mode === "BUY"
                          ? "text-[0.75rem] font-semibold text-[rgb(0,183,61)]"
                          : "text-[0.75rem] font-semibold text-[rgb(255,0,0)]"
                      }
                    >
                      {order.mode}
                    </p>
                  </div>

                  {/* Order details */}
                  <div className="grid grid-cols-2 gap-x-[15px] gap-y-[14px]">

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Qty.
                      </p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        {order.qty}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Price
                      </p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        ₹{Number(order.price).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Mode
                      </p>
                      <p
                        className={
                          order.mode === "BUY"
                            ? "text-[0.9rem] font-medium text-[rgb(0,183,61)]"
                            : "text-[0.9rem] font-medium text-[rgb(255,0,0)]"
                        }
                      >
                        {order.mode}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.7rem] text-[#999]">
                        Product
                      </p>
                      <p className="text-[0.9rem] font-medium text-[#373737]">
                        {order.product}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </>
      )}
    </div>
  );
};

export default Orders;