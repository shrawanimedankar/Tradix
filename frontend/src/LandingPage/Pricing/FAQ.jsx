import { useState } from "react";

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
    <section className="container mx-auto mb-20 px-5">
      <h2 className="custom-heading">Frequently Asked Questions</h2>

      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#7700ff2c] px-5 hover:bg-[#7700ff0b]"
          >
            <button
              type="button"
              onClick={() => setOpen(open === index ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left font-semibold text-[#2e0063]"
            >
              {faq[0]}

              <span className="text-xl">
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <p className="pb-5 text-sm leading-relaxed text-gray-500">
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