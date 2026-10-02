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
        imageURL="/media/images/Trade.jpeg"
        productName="Tradix Trade"
        productDescription1="Your trading platform"
        productDescription2="Buy and sell stocks with a smooth, intuitive trading experience. Track live market movements, explore detailed charts, monitor watchlists, and manage your trades from one convenient platform."
        features="Stocks • F&O • Market Watch • Charts"
      />
      <RightSection
        imageURL="/media/images/Invest.jpeg"
        productName="Tradix Invest"
        productDescription1="Invest for your future"
        productDescription2=" Discover a variety of investment opportunities designed for different financial goals. Explore mutual funds, ETFs, IPOs, and bonds while keeping your investments organized in one place."
        features="Mutual Funds • ETFs • IPOs • Bonds"
      />
      <LeftSection
        imageURL="/media/images/Portfolio.jpeg"
        productName="Tradix Portfolio"
        productDescription1="Know where your money stands"
        productDescription2="Get a clear view of your investments with an easy-to-understand portfolio dashboard. Track your holdings, portfolio value, profit and loss, asset allocation, and overall investment performance."
        features="Holdings • P&L • Analytics • Allocation"
      />
      <RightSection
        imageURL="/media/images/Learn.jpeg"
        productName="Tradix Learn"
        productDescription1="Learn before you invest"
        productDescription2="Build your financial knowledge with simple and accessible educational content. Learn about stocks, investing, trading, markets, and important financial concepts at your own pace."
        features="Market Basics • Investing • Trading • Finance"
      />
      <LeftSection
        imageURL="/media/images/Watch.jpeg"
        productName="Tradix Watch"
        productDescription1="Stay ahead of the market"
        productDescription2="Keep track of the stocks and investments that matter to you. Create personalized watchlists, monitor price movements, follow market trends, and stay informed about important changes."
        features="Watchlists • Market Data • Alerts • Trends"
      />
      <Dashboard />
      <OpenAccount />
    </>
  );
}

export default HomePage;
