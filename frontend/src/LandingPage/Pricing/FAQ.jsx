import React, { useState } from "react";

function FAQ() {
  const faqs = [
    [
      "What is brokerage?",
      "Brokerage is the fee charged for executing a trade through a stockbroker.",
    ],
    [
      "Is equity delivery free?",
      "Tradix charges ₹0 brokerage on equity delivery trades.",
    ],
    [
      "Are there any additional charges?",
      "Statutory charges such as STT, GST, exchange charges, SEBI charges and stamp duty may apply.",
    ],
    ["Is account opening free?", "Yes, Tradix account opening is free."],
    [
      "What are DP charges?",
      "DP charges may apply when securities are debited from your demat account.",
    ],
    [
      "Does Tradix charge AMC?",
      "AMC depends on the type of demat account and applicable holdings.",
    ],
    [
      "Does F&O have brokerage?",
      "Yes. Tradix charges a flat ₹20 per executed F&O order in this sample pricing structure.",
    ],
  ];

  const [open, setOpen] = useState(null);
  return (
    <section className="container mx-auto px-5 mb-20">
      <h2 className="custom-heading">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto ">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#7700ff2c] hover:bg-[#7700ff0b] px-5"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex justify-between items-center py-5 text-left font-semibold text-[#2e0063]"
            >
              {faq[0]}
              <span className="text-xl ">{open === index ? "−" : "+"}</span>
            </button>

            {open === index && (
              <p className="pb-5 text-gray-500 text-sm leading-relaxed">
                {faq[1]}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
