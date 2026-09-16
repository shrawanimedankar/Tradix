import React from "react";
import Menu from "./Menu";

const TopBar = ({ user }) => {
  return (
    <div className="w-full min-h-[10vh] flex flex-col md:flex-row items-stretch md:items-center shadow-[0px_0px_4px_2px_#13002b] box-border z-[9]">

      {/* Indices */}
      <div className="w-full md:basis-[32%] md:w-auto min-h-[50px] md:h-full py-[8px] px-[10px] sm:px-[20px] border-b md:border-b-0 md:border-r border-b-[rgb(224,224,224)] md:border-r-[rgb(224,224,224)] box-border flex items-center justify-around gap-[5px]">

        {/* NIFTY */}
        <div className="basis-[50%] md:basis-[40%] min-w-0 flex items-center justify-center md:justify-evenly [&>*]:mr-[5px] md:[&>*]:mr-[8px]">
          <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[1rem] font-medium uppercase text-black whitespace-nowrap hover:cursor-pointer">
            NIFTY 50
          </p>

          <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[1rem] font-medium text-[rgb(225,0,0)] whitespace-nowrap">
            {100.2}
          </p>

          <p className="hidden sm:block text-[0.75rem] md:text-[1rem] font-normal text-[rgb(146,146,146)]"></p>
        </div>

        {/* SENSEX */}
        <div className="basis-[50%] md:basis-[40%] min-w-0 flex items-center justify-center md:justify-evenly [&>*]:mr-[5px] md:[&>*]:mr-[8px]">
          <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[1rem] font-medium uppercase text-black whitespace-nowrap hover:cursor-pointer">
            SENSEX
          </p>

          <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[1rem] font-medium text-[rgb(225,0,0)] whitespace-nowrap">
            {100.2}
          </p>

          <p className="hidden sm:block text-[0.75rem] md:text-[1rem] font-normal text-[rgb(146,146,146)]"></p>
        </div>

      </div>

      {/* Menu */}
      <Menu user={user} />
    </div>
  );
};

export default TopBar;