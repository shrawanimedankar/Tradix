import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const SellActionWindow = ({ uid, product: selectedProduct }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [product, setProduct] = useState(selectedProduct || "CNC");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setProduct(selectedProduct || "CNC");
  }, [selectedProduct]);

  const handleSellClick = () => {
    setError("");
    if (stockQuantity <= 0 || !Number.isInteger(stockQuantity)) {
      setError("Quantity must be a whole number greater than 0");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSell = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/orders/new`,
        {
          name: uid,
          qty: stockQuantity,
          price: context.stockPrice,
          mode: "SELL",
          product: product,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowConfirmation(false);
      context.closeSellWindow();
      context.triggerRefresh();
    } catch (error) {
      setShowConfirmation(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancelClick = () => {
    context.closeSellWindow();
  };

  return (
    <div
      className="w-[82%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-auto min-h-[40%] max-h-[60vh] bg-[rgb(153,152,152)] absolute bottom-0 left-1/2 -translate-x-1/2 cursor-move box-border z-[100] rounded-[4px] border border-[rgb(238,238,238)] mb-[2rem] sm:mb-[3rem] lg:mb-[5rem] text-white pb-[2rem] sm:pb-[3rem] overflow-y-auto"
      id="sell-window"
    >
      <div className="p-[20px] sm:p-[25px] md:p-[30px_26px] bg-black pb-[20px] sm:pb-[30px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] sm:gap-0 mt-[16px] mb-[16px]">
          {/* Product */}
          <fieldset className="w-full sm:w-auto max-w-none sm:max-w-[120px] box-border border-[0.7px] border-[#ddd]">
            <legend className="ml-[10px] text-[0.8rem] px-[4px]">
              Product
            </legend>

            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full sm:w-auto min-h-[35px]  px-1 mx-2 box-border"
            >
              <option value="CNC">CNC</option>
              <option value="MIS">MIS</option>
            </select>
          </fieldset>

          {/* Quantity */}
          <fieldset className="w-full sm:w-auto max-w-none sm:max-w-[120px] box-border border-[0.7px] border-[#ddd]">
            <legend className="ml-[10px] text-[0.8rem] px-[4px]">Qty.</legend>
            <input
              type="number"
              name="qty"
              value={stockQuantity}
              id="qty"
              min="1"
              step="1"
              onChange={(e) => {
                const value = e.target.value;

                if (value === "" || /^\d+$/.test(value)) {
                  setStockQuantity(value === "" ? "" : Number(value));
                }
              }}
              className="w-full border-none min-h-[35px] max-w-[60px] py-0 px-[12px] box-border text-[1.1rem] text-white bg-black focus:outline-none"
            />
          </fieldset>

          {/* Price */}
          <fieldset className="w-full sm:w-auto max-w-none sm:max-w-[120px] box-border border-[0.7px] border-[#ddd]">
            <legend className="ml-[10px] text-[0.8rem] px-[4px] text-[#ddd]">
              Price
            </legend>

            <input
              type="number"
              value={context.stockPrice}
              readOnly
              className="w-full border-none min-h-[35px] py-0 px-[12px] box-border text-[1.1rem] text-white bg-black focus:outline-none"
            />
          </fieldset>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-700 bg-red-100 text-sm mt-1 p-2 break-words">
          {error}
        </p>
      )}

      {/* Bottom Section */}
      <div className=" mt-4 w-full box-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px] relative top-[5%] sm:top-[10%] py-0 px-[15px] sm:px-[20px]">
        <span className="text-[0.85rem] sm:text-[0.9rem] text-[#090909]">
          Margin required ₹
          {stockQuantity
            ? (context.stockPrice * stockQuantity).toFixed(2)
            : "0.00"}
        </span>

        <div className="flex flex-wrap gap-5">
          <button
            className="text-decoration-none p-2  text-white bg-[#fb4f1b] hover:bg-[#ff3c00]"
            onClick={handleSellClick}
          >
            Sell
          </button>

          <button
            className="text-decoration-none p-2 bg-[#f2f0f0] text-[#090909] hover:bg-white"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white text-black w-[90%] sm:w-[350px]  p-3">
            <h3 className="text-lg font-semibold mb-1">Confirm Sell</h3>
            <hr className="mb-2" />

            <p className="text-xs mb-1">
              Stock: <span className="font-medium">{uid}</span>
            </p>

            <p className="text-xs mb-1">
              Product: <span className="font-medium">{product}</span>
            </p>

            <p className="text-xs mb-1">
              Quantity: <span className="font-medium">{stockQuantity}</span>
            </p>

            <p className="text-xs mb-1">
              Price:{" "}
              <span className="font-medium">
                ₹{context.stockPrice.toFixed(2)}
              </span>
            </p>

            <p className="text-xs font-semibold mb-2">
              Total: ₹{(context.stockPrice * stockQuantity).toFixed(2)}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="p-2 text-xs bg-gray-200 text-black"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSell}
                className="p-2 text-xs bg-[#fb4f1b] text-white"
              >
                Confirm Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellActionWindow;
