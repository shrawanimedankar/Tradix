import React, { useContext, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [product, setProduct] = useState("CNC");

  const handleBuyClick = async () => {
    try {
      await axios.post("http://localhost:8080/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: context.stockPrice,
        mode: "BUY",
        product: product,
      });

      context.closeBuyWindow();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">

          <fieldset>
            <legend>Product</legend>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="CNC">CNC</option>
              <option value="MIS">MIS</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              value={context.stockPrice}
              readOnly
            />
          </fieldset>

        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>

        <div>
          <button className="btn btnPurple" onClick={handleBuyClick}>
            Buy
          </button>

          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;