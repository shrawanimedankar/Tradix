import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [search, setSearch] = useState("");
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
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

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          return <WatchListItem stock={stock} key={index} />;
        })}
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

const WatchListItem = ({ stock }) => {
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
        <WatchListActions uid={stock.name} price={stock.price} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, price }) => {
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

        <Tooltip title="More" placement="top" arrow>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-[35px] h-[30px] sm:w-[40px] rounded-[4px] text-center mr-[5px] sm:mr-[8px] cursor-pointer bg-white border-[0.7px] border-[#9b9b9b] hover:bg-[rgb(212,212,212)]"
          >
            <MoreHoriz className="scale-[0.7] text-[rgb(65,65,65)]" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
