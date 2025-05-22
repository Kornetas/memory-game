function Card({ card, onClick }) {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      console.log("Kliknięto kartę ID:", card.id, "Symbol:", card.symbol);
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-24 h-24 flex items-center justify-center text-3xl rounded-lg shadow-md cursor-pointer select-none transition-transform duration-200 ${
        card.isFlipped || card.isMatched
          ? "bg-white text-black scale-100"
          : "bg-gray-400 text-gray-400 hover:scale-105"
      }`}
    >
      {/* pokazuj symbol tylko jesli karta jest odkryta */}
      {card.isFlipped || card.isMatched ? card.symbol : "❓"}
    </div>
  );
}

export default Card;
