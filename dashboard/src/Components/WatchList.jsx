import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip } from "@mui/material";
import { watchlist as availableStocks } from "../data/data";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [search, setSearch] = useState("");
  const [userWatchlist, setUserWatchlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserWatchlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: userWatchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: userWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderColor: [
          "rgb(255, 100, 142)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const filteredWatchlist = userWatchlist.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredAvailableStocks = availableStocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddStock = (stock) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8080/watchlist/add",
        {
          name: stock.name,
          price: stock.price,
          isDown: stock.isDown,
          percent: stock.percent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setUserWatchlist((prev) => [...prev, res.data.data]);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveStock = (stockName) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/watchlist/remove/${stockName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUserWatchlist((prev) =>
          prev.filter((stock) => stock.name !== stockName),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full lg:basis-[32%] lg:w-auto lg:h-full box-border overflow-y-auto overflow-x-hidden relative shrink-0">
      {/* Search */}
      <div className="flex items-center justify-evenly relative bg-white my-[15px] mx-[10px] sm:my-[20px] sm:mx-[20px]">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[40px] sm:h-[45px] border border-[rgba(19,19,19,0.318)] rounded-[2px] py-[10px] px-[10px] pr-[55px] text-[0.8rem] font-medium text-[#373737] focus:outline-none focus:border-[#4e008d]"
        />

        <span className="absolute right-[10px] sm:right-[20px] text-[0.8rem] sm:text-[0.9rem] font-normal text-[#373737]">
          {filteredWatchlist.length} / 50
        </span>
      </div>

      {/* Watchlist */}
      <ul className="list-none pb-[20px] m-0">
        {filteredWatchlist.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              key={index}
              onRemove={handleRemoveStock}
            />
          );
        })}

        {search &&
          filteredAvailableStocks
            .filter(
              (stock) =>
                !userWatchlist.some(
                  (userStock) => userStock.name === stock.name,
                ),
            )
            .map((stock) => (
              <li
                key={stock.name}
                className="border-b-[0.8px] border-b-[rgba(98,97,97,0.225)] py-[12px] px-[14px] flex items-center justify-between"
              >
                <div>
                  <p className="text-[#373737] font-bold text-[0.8rem]">
                    {stock.name}
                  </p>

                  <span className="text-[0.75rem] text-[#8d8d8d]">
                    ₹{stock.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddStock(stock)}
                  className="bg-[#4e008d] text-white text-[0.75rem] px-3 py-2 rounded-[4px] cursor-pointer"
                >
                  Add
                </button>
              </li>
            ))}
      </ul>

      {/* Chart */}
      <div className="w-full flex justify-center px-[10px] sm:px-[20px] pb-[20px]">
        <div className="w-full max-w-[400px]">
          <DoughnutChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onRemove }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  const handleClick = () => {
    setShowWatchlistActions((prev) => !prev);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="border-b-[0.8px] border-b-[rgba(98,97,97,0.225)] py-[12px] pr-[10px] pl-[10px] sm:pl-[14px] relative hover:cursor-move hover:bg-white"
    >
      <div className="flex items-center justify-between font-light text-[0.8rem] gap-[10px]">
        <p
          className={
            stock.isDown
              ? "text-[rgb(255,0,0)] font-bold"
              : "text-[rgb(0,183,61)] font-bold"
          }
        >
          {stock.name}
        </p>

        <div className="grid grid-cols-[45px_20px_55px] sm:grid-cols-[50px_15px_50px] gap-x-[8px] sm:gap-x-[20px] items-center text-right [&>*]:m-0 shrink-0">
          <span className="text-right text-[rgb(141,141,141)] text-[0.8rem] sm:text-[0.9rem]">
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="text-[rgb(255,0,0)] font-bold" />
          ) : (
            <KeyboardArrowUp className="text-[rgb(0,183,61)] !font-bold" />
          )}

          <span className="text-right text-[rgb(223,73,73)] text-[0.8rem]">
            {stock.price}
          </span>
        </div>
      </div>

      {showWatchlistActions && (
        <WatchListActions
          uid={stock.name}
          price={stock.price}
          onRemove={onRemove}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, price, onRemove }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = (e) => {
    e.stopPropagation();
    generalContext.openBuyWindow(uid, price);
  };

  const handleSellClick = (e) => {
    e.stopPropagation();
    generalContext.openSellWindow(uid, price, "CNC");
  };

  return (
    <span className="absolute top-0 right-0 left-auto w-auto h-full items-center justify-end flex bg-white">
      <span className="flex items-center">
        <Tooltip title="Buy (B)" placement="top" arrow>
          <button
            className="w-[35px] h-[30px] sm:w-[40px] rounded-[4px] text-center mr-[5px] sm:mr-[8px] cursor-pointer bg-[#4e008d] text-white font-normal text-[0.7rem] sm:text-[0.8rem]"
            onClick={handleBuyClick}
          >
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" arrow>
          <button
            className="w-[35px] h-[30px] sm:w-[40px] rounded-[4px] text-center mr-[5px] sm:mr-[8px] cursor-pointer bg-[#ff5722] text-white font-normal text-[0.7rem] sm:text-[0.8rem]"
            onClick={handleSellClick}
          >
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics (A)" placement="top" arrow>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-[35px] h-[30px] sm:w-[40px] rounded-[4px] text-center mr-[5px] sm:mr-[8px] cursor-pointer bg-white border-[0.7px] border-[#9b9b9b] hover:bg-[rgb(212,212,212)]"
          >
            <BarChartOutlined className="scale-[0.7] text-[rgb(65,65,65)]" />
          </button>
        </Tooltip>

        <Tooltip title="Remove" placement="top" arrow>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(uid);
            }}
            className="w-[35px] h-[30px] sm:w-[40px] rounded-[4px] text-center mr-[5px] sm:mr-[8px] cursor-pointer bg-white border-[0.7px] border-[#9b9b9b] hover:bg-[rgb(212,212,212)]"
            title="Remove from watchlist"
          >
            <Delete className="scale-[0.7] text-[rgb(65,65,65)]" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
