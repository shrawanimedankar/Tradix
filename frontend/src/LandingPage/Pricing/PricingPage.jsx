import React from "react";
import Charges from "./Charges";
import Brokerage from "./Brokerage";
import FAQ from "./FAQ";
import OtherCharges from "./OtherCharges";

function HomePage() {
  return (
    <>
      <Charges />
      <Brokerage />
      <OtherCharges />
      <FAQ />
    </>
  );
}

export default HomePage;
