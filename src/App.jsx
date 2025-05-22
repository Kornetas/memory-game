import { useState } from "react";
import { useMemoryGame } from "./hooks/useMemoryGame";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";

function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState("medium");

  const { cards, handleCardClick, tries, time, bestScore, hasWon, resetGame } =
    useMemoryGame(difficulty);

  return (
    <>
      {screen === "start" ? (
        <StartScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={() => {
            resetGame();
            setScreen("game");
          }}
        />
      ) : (
        <GameBoard
          cards={cards}
          bestScore={bestScore}
          time={time}
          tries={tries}
          hasWon={hasWon}
          difficulty={difficulty}
          onCardClick={handleCardClick}
          onReset={() => {
            resetGame();
          }}
          onBackToMenu={() => setScreen("start")}
        />
      )}
    </>
  );
}
export default App;
