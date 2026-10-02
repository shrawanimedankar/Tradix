const cards = [
  {
    title: "Easy to Access",
    description:
      "Bring investing within everyone’s reach with a seamless platform that works across devices, wherever you are.",
  },
  {
    title: "Cost-Effective",
    description:
      "Keep investing affordable with clear, competitive pricing and minimal charges, so more of your money stays invested.",
  },
  {
    title: "Easy to Understand",
    description:
      "Simplify the investing journey with intuitive tools, useful insights, and experiences designed around different financial goals.",
  },
  {
    title: "Powerful",
    description:
      "Give investors the tools and technology they need to make informed decisions and manage their investments with confidence.",
  },
  {
    title: "Transparent",
    description:
      "Keep every step clear and straightforward, from pricing and information to the way investments are managed.",
  },
  {
    title: "Empowering",
    description:
      "Provide the knowledge, tools, and resources people need to take greater control of their financial future.",
  },
];

function Cards() {
  return (
    <div className="container mx-auto pb-20">
      <div className="mt-5 px-6 py-3">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#2e0063]">
          How do we make this possible?
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="custom-card">
              <h3 className="mb-2 text-lg font-semibold text-[#2e0063]">
                {card.title}
              </h3>
              <p className="text-base text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
