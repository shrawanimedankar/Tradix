import React, { useState } from "react";
import { categories } from "./Data/SupportData";

function Support() {
  const [open, setOpen] = useState(null);

  const quickLinks = [
    "Open a Tradix account",
    "Track account opening",
    "Account verification / KYC",
    "Add money",
    "Withdraw money",
    "Place an order",
    "Cancel an order",
    "Brokerage & charges",
    "Funds & payments",
    "Portfolio",
    "IPO",
    "Contact support",
  ];

  return (
    <div className="container mx-auto px-5 py-10">
      {/* Quick Links */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-[#2e0063] mb-6">
          Quick Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="border border-[#7700ff2c] rounded-lg p-4 hover:shadow-md hover:border-[#6100d0] transition cursor-pointer"
            >
              <p className="text-gray-700">{link}</p>

              <span className="text-[#6100d0] text-sm">Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-[#2e0063] mb-6">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-[#7700ff2c] rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-[#2e0063] mb-4">
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <p
                    key={qIndex}
                    className="text-gray-600 hover:text-[#6100d0] cursor-pointer"
                  >
                    {question}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto mb-14">
        <h2 className="text-2xl font-semibold text-[#2e0063] text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {[
            [
              "How can I open a Tradix account?",
              "You can open a Tradix account online by completing the registration process and submitting the required KYC documents.",
            ],
            [
              "How do I add money to my Tradix account?",
              "You can add funds using the supported payment methods available in your Tradix account.",
            ],
            [
              "How can I buy or sell stocks?",
              "Search for the stock you want to trade, select Buy or Sell, enter your order details, and place the order.",
            ],
            [
              "What is brokerage?",
              "Brokerage is the fee charged for executing a trade through a stockbroker.",
            ],
            [
              "Is equity delivery brokerage-free?",
              "Yes. Tradix charges ₹0 brokerage on equity delivery trades in this sample pricing structure.",
            ],
            [
              "What are statutory charges?",
              "Statutory charges may include STT, GST, exchange transaction charges, SEBI charges and stamp duty.",
            ],
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center text-left p-4 font-medium text-gray-800"
              >
                {faq[0]}

                <span className="text-[#6100d0] text-xl">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="px-4 pb-4 text-gray-500">{faq[1]}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-[#5500ff14] rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#2e0063] mb-3">
          Still need help?
        </h2>

        <p className="text-gray-600 mb-6">Our support team is here to help.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-gray-700">
          <div>
            <h3 className="font-semibold text-[#2e0063]">Email</h3>
            <p>support@tradix.in</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2e0063]">Phone</h3>
            <p>+91 XXXXX XXXXX</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2e0063]">Support Hours</h3>
            <p>Monday–Friday, 8:30 AM–5:30 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
