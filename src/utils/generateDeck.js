//funkcja generująca talię
export function generateDeck() {
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
