import Card from "./components/Card/Card";

function App() {
  const mockCards = ["🐱", "🐶", "🐱", "🐶"];
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎴 Memory Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 100px)",
          gap: "1rem",
        }}
      >
        {mockCards.map((symbol, index) => (
          <Card key={index} value={symbol} />
        ))}
      </div>
    </div>
  );
}

export default App;
