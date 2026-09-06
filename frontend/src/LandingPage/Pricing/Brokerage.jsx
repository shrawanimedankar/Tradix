import React from "react";

function Brokerage() {
  const data = [
    ["Equity Delivery", "✓", "✓", "₹0"],
    ["Equity Intraday", "✓", "✓", "₹20 or 0.03%"],
    ["Futures", "✓", "✓", "₹20 or 0.03%"],
    ["Options", "✓", "✓", "₹20 / order"],
  ];

  return (
    <section className="container mx-auto px-5 py-6 text-center">
      <h2 className="custom-heading">Brokerage at a glance</h2>
      <p className="text-gray-500 text-center mb-5">
        Simple pricing across all major trading segments.
      </p>

      <div className="overflow-x-auto ">
        <table className="w-full border-collapse text-sm md:text-base ">
          <thead>
            <tr className="bg-[#7f51c929] text-[#2e0063]">
              <th className="p-3  text-center">Segment</th>
              <th className="p-3 text-center">Buy</th>
              <th className="p-3">Sell</th>
              <th className="p-3 text-center">Brokerage</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#7700ff22] transition hover:bg-[#7700ff0b]"
              >
                <td className="p-4 font-medium ">{row[0]}</td>
                <td className="p-4 text-center font-bold text-green-600">
                  {row[1]}
                </td>
                <td className="p-4 text-center font-bold text-green-600">
                  {row[2]}
                </td>
                <td className="p-4 font-semibold ">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Brokerage;
