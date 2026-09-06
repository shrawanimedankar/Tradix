import React from "react";

function RightSection({
  imageURL,
  productName,
  productDesription1,
  productDesription2,
  features,
}) {
  return (
    <div className="container mx-auto mt-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Content */}
        <div className="order-1 p-5 md:mt-2">
          <h1 className="text-3xl font-semibold text-[#2e0063] mb-1">
            {productName}
          </h1>

          <h2 className="text-gray-500 text-lg mb-2">{productDesription1}</h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {productDesription2}
          </p>

          <div className="text-[#41008b] text-sm font-medium">{features}</div>
        </div>

        {/* Image */}
        <div className="order-2">
          <img src={imageURL} alt={productName} className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
