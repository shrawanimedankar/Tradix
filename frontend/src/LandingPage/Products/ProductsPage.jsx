import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Dashboard from "./Dashboard";
import OpenAccount from "../OpenAccount";

function HomePage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/Trade.png"
        productName="Tradix Trade"
        productDesription1="Your trading platform"
        productDesription2="Buy and sell stocks with a smooth, intuitive trading experience. Track live market movements, explore detailed charts, monitor watchlists, and manage your trades from one convenient platform."
        features="Stocks • F&O • Market Watch • Charts"
      />
      <RightSection
        imageURL="media/images/Invest.png"
        productName="Tradix Invest"
        productDesription1="Invest for your future"
        productDesription2=" Discover a variety of investment opportunities designed for different financial goals. Explore mutual funds, ETFs, IPOs, and bonds while keeping your investments organized in one place."
        features="Mutual Funds • ETFs • IPOs • Bonds"
      />
      <LeftSection
        imageURL="media/images/Portfolio.png"
        productName="Tradix Portfolio"
        productDesription1="Know where your money stands"
        productDesription2="Get a clear view of your investments with an easy-to-understand portfolio dashboard. Track your holdings, portfolio value, profit and loss, asset allocation, and overall investment performance."
        features="Holdings • P&L • Analytics • Allocation"
      />
      <RightSection
        imageURL="media/images/Learn.png"
        productName="Tradix Learn"
        productDesription1="Learn before you invest"
        productDesription2="Build your financial knowledge with simple and accessible educational content. Learn about stocks, investing, trading, markets, and important financial concepts at your own pace."
        features="Market Basics • Investing • Trading • Finance"
      />
      <LeftSection
        imageURL="media/images/Watch.png"
        productName="Tradix Watch"
        productDesription1="Stay ahead of the market"
        productDesription2="Keep track of the stocks and investments that matter to you. Create personalized watchlists, monitor price movements, follow market trends, and stay informed about important changes."
        features="Watchlists • Market Data • Alerts • Trends"
      />
      <Dashboard />
            <OpenAccount />
    </>
  );
}

export default HomePage;
