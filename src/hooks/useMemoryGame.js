import { useEffect, useState } from "react";
import { generateDeck } from "../utils/generateDeck";

export function useMemoryGame(difficulty) {
  const [cards, setCards] = useState(generateDeck(difficulty));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [tries, setTries] = useState(0);
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  const handleCardClick = (clickedCard) => {
    if (!isTiming && !firstCard && !secondCard) setIsTiming(true);
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

  return {
    cards,
    handleCardClick,
    tries,
    time,
    bestScore,
    hasWon,
    resetGame,
  };
}
