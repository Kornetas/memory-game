import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import { generateDeck } from "./utils/generateDeck";
import { formatTime } from "./utils/formatTime";
import StartScreen from "./components/StartScreen";

function App() {
  const [cards, setCards] = useState(generateDeck);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [tries, setTries] = useState(0);
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [screen, setScreen] = useState("start"); // "start" | "game"
  const [difficulty, setDifficulty] = useState("medium"); // domyślnie średni

  const handleCardClick = (clickedCard) => {
    if (!isTiming && !firstCard && !secondCard) {
      setIsTiming(true); // startujemy zegar przy 1 kliknięciu
    }

    if (isBusy || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else if (!secondCard) {
      setSecondCard(clickedCard);
      setIsBusy(true);
    }
  };

  useEffect(() => {
    let timer;

    if (isTiming) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    setTries((prev) => prev + 1);
    setIsBusy(true);

    if (firstCard.symbol === secondCard.symbol) {
      const updated = cards.map((card) =>
        card.symbol === firstCard.symbol ? { ...card, isMatched: true } : card
      );
      setCards(updated);
      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        resetTurn();
      }, 1000);
    }
  }, [firstCard, secondCard, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setHasWon(true);
      setIsTiming(false);

      const newScore = { tries, time };
      const key = `memory-best-score-${difficulty}`;
      const saved = localStorage.getItem(key);

      if (!saved) {
        localStorage.setItem(key, JSON.stringify(newScore));
        setBestScore(newScore);
      } else {
        const best = JSON.parse(saved);
        const isBetter =
          newScore.tries < best.tries ||
          (newScore.tries === best.tries && newScore.time < best.time);

        if (isBetter) {
          localStorage.setItem(key, JSON.stringify(newScore));
          setBestScore(newScore);
        }
      }
    }
  }, [cards, time, tries, difficulty]);

  useEffect(() => {
    const key = `memory-best-score-${difficulty}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setBestScore(JSON.parse(saved));
    } else {
      setBestScore(null);
    }
  }, [difficulty]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsBusy(false);
  };

  const resetGame = () => {
    setCards(generateDeck(difficulty));
    setFirstCard(null);
    setSecondCard(null);
    setIsBusy(false);
    setHasWon(false);
    setTries(0);
    setTime(0);
    setIsTiming(false);
  };

  return (
    <>
      {screen === "start" ? (
        <StartScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={() => {
            setCards(generateDeck(difficulty));
            resetGame();
            setScreen("game");
          }}
        />
      ) : (
        <div className="min-h-screen bg bg-gray-100 text-center py-10 px-4">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            🎴 Gra pamięciowa
          </h1>

          <p className="text-lg text-gray-700 mb-2">
            🔁 Próby: <span className="font-semibold">{tries}</span>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            ⏱️ Czas: <span className="font-semibold">{formatTime(time)}</span>
          </p>
          {bestScore && (
            <p className="text-sm text-gray-500 mb-4">
              🏆 Najlepszy wynik:{" "}
              <span className="font-semibold">{bestScore.tries}</span> prób,
              <span className="font-semibold ml-1">
                {formatTime(bestScore.time)}
              </span>
            </p>
          )}

          {hasWon && (
            <div className="mb-4 p-4 bg-green-100 text-gray-700 rounded shadow">
              🎉 Brawo! Wygrałeś!{" "}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center max-w-md mx-auto">
            {cards.map((card) => (
              <Card key={card.id} card={card} onClick={handleCardClick} />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8 ">
            <button
              onClick={() => {
                setCards(generateDeck(difficulty));
                resetGame();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              🔁 Zagraj ponownie
            </button>

            <button
              onClick={() => {
                setScreen("start");
              }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded shadow"
            >
              🔙 Powrót do menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
