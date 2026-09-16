import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Profile from "./Profile";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = ({ user }) => {
  useEffect(() => {
    return () => {
      // Close any open Buy/Sell window when leaving the dashboard
    };
  }, []);

  return (
    <div className="w-full min-h-[90vh] flex flex-col lg:flex-row items-stretch box-border">
      <GeneralContextProvider>
        <div className="w-full lg:basis-[32%] lg:w-auto border-r-0 lg:border-r lg:border-r-[#3e004b] shadow-[4px_0px_4px_-2px_#13002b]">
          <WatchList />
        </div>

        <div className="w-full lg:basis-[68%] lg:w-auto min-h-[60vh] lg:h-full box-border overflow-y-auto py-[5%] px-[4%] sm:py-[4%] sm:px-[3%] lg:py-[3%] lg:px-[2%]">
          <Routes>
            <Route exact path="/" element={<Summary user={user} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;
