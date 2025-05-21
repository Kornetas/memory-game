import { useState } from "react";
import Card from "./components/Card/Card";

//funkcja generująca talię
function generateDeck() {
  const symbols = ["🐱", "🐶", "🐸", "🦊", "🐼", "🐵", "🦁", "🐷"];
  const deck = [...symbols, ...symbols] // duplikujemy, żeby mieć pary
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return deck;
}

function App() {
  const [cards, setCards] = useState(generateDeck);
  console.log("Aktualny stan kart:", cards);

  const handleClick = (clickedCard) => {
    console.log("handleCardClick:", clickedCard);

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Memory Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 100px)",
          gap: "1rem",
        }}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
