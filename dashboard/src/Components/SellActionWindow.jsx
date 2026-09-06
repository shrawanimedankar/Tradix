import React, { useContext, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";
const SellActionWindow = ({ uid }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [product, setProduct] = useState("CNC");
  const handleSellClick = async () => {
    try {
      await axios.post("http://localhost:8080/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: context.stockPrice,
        mode: "SELL",
        product: product,
      });
      context.closeSellWindow();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = () => {
    context.closeSellWindow();
  };
  return (
    <div className="container" id="sell-window">
      {" "}
      <div className="regular-order">
        {" "}
        <div className="inputs">
          {" "}
          <fieldset>
            {" "}
            <legend>Product</legend>{" "}
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {" "}
              <option value="CNC">CNC</option>{" "}
              <option value="MIS">MIS</option>{" "}
            </select>{" "}
          </fieldset>{" "}
          <fieldset>
            {" "}
            <legend>Qty.</legend>{" "}
            <input
              type="number"
              name="qty"
              value={stockQuantity}
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />{" "}
          </fieldset>{" "}
          <fieldset>
            {" "}
            <legend>Price</legend>{" "}
            <input type="number" value={context.stockPrice} readOnly />{" "}
          </fieldset>{" "}
        </div>{" "}
      </div>{" "}
      <div className="buttons">
        {" "}
        <span>Margin required ₹140.65</span>{" "}
        <div>
          {" "}
          <button className="btn btnOrange" onClick={handleSellClick}>
            {" "}
            Sell{" "}
          </button>{" "}
          <button className="btn btn-grey" onClick={handleCancelClick}>
            {" "}
            Cancel{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default SellActionWindow;
