function Card({ card, onClick }) {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      console.log("Kliknięto kartę ID:", card.id, "Symbol:", card.symbol);
      onClick(card);
    }
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        cursor: "pointer",
        borderRadius: "0.5rem",
      }}
    >
      {/* pokazuj symbol tylko jesli karta jest odkryta */}
      {card.isFlipped || card.isMatched ? card.symbol : "?"}
    </div>
  );
}

export default Card;
