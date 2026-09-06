import React, { useState } from "react";
import { categories } from "./Data/SupportData";

function Hero() {
  const [search, setSearch] = useState("");
  const filteredQuestions = categories.flatMap((category) =>
    category.questions.filter((question) =>
      question.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div className="container mx-auto ">
      <div className="text-center mb-12">
        <h1 className="custom-heading ">Tradix Support</h1>
        <p className="text-gray-500 text-lg mb-6">How can we help you?</p>

        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full border border-gray-300 rounded-lg px-5 py-3 outline-none focus:border-[#6100d0]"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <div className="max-w-2xl mx-auto mt-4 border border-gray-200 rounded-lg bg-white">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question, index) => (
                  <p
                    key={index}
                    className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  >
                    {question}
                  </p>
                ))
              ) : (
                <p className="p-4 text-gray-500">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
