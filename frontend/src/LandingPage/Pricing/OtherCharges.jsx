import React from "react";

function OtherCharges() {
  const charges = [
    {
      title: "DP Charges",
      description:
        "A charge may apply when securities are debited from your demat account.",
    },
    {
      title: "Call & Trade",
      description:
        "Orders placed through dealer assistance may carry an additional charge.",
    },
    {
      title: "Pledge / Unpledge",
      description:
        "Charges may apply when securities are pledged for margin.",
    },
    {
      title: "MTF Interest",
      description:
        "Interest applies when you use Margin Trading Facility.",
    },
    {
      title: "Payment Gateway",
      description:
        "Applicable charges may apply to certain payment methods.",
    },
    {
      title: "Delayed Payment",
      description:
        "Interest may apply on overdue debit balances.",
    },
  ];

  return (
    <section className="container mx-auto px-5">
      <div>
        <h2 className="custom-heading">
          Other charges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {charges.map((charge, index) => (
            <div
              key={index}
              className="custom-card"
            >
              <h3 className="text-xl font-semibold text-[#2e0063] mb-3">
                {charge.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {charge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OtherCharges;