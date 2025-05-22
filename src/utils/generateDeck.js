//funkcja generująca talię
export function generateDeck(mode = "medium") {
  const allSymbols = [
    "🐱",
    "🐶",
    "🐸",
    "🦊",
    "🐼",
    "🐵",
    "🦁",
    "🐷",
    "🐰",
    "🐔",
    "🐙",
    "🦄",
    "🐍",
    "🐞",
    "🐢",
    "🐳",
  ];

  let numberOfPairs = 8;
  if (mode === "easy") numberOfPairs = 6;
  if (mode === "medium") numberOfPairs = 8;
  if (mode === "hard") numberOfPairs = 12;

  const symbols = allSymbols.slice(0, numberOfPairs);

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
