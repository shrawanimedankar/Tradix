import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [refreshData, setRefreshData] = useState(0);
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [stockPrice, setStockPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("CNC");

  const location = useLocation();

  useEffect(() => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
  }, [location.pathname]);

  const handleOpenBuyWindow = (uid, price) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setStockPrice(price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid, price, product) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    setStockPrice(price);
    setSelectedProduct(product);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectedProduct("CNC");
  };

  const handleRefreshData = () => {
    setRefreshData((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        stockPrice: stockPrice,
        refreshData: refreshData,
        triggerRefresh: handleRefreshData,
        selectedProduct: selectedProduct,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} product={selectedProduct} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
