import { useEffect, useReducer } from "react";
import { generateDeck } from "../utils/generateDeck";

const initialState = {
  cards: [],
  firstCard: null,
  secondCard: null,
  isBusy: false,
  hasWon: false,
  tries: 0,
  time: 0,
  isTiming: false,
  bestScore: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CARDS":
      return { ...state, cards: action.payload };
    case "SET_FIRST_CARD":
      return { ...state, firstCard: action.payload };
    case "SET_SECOND_CARD":
      return { ...state, secondCard: action.payload };
    case "RESET_TURN":
      return {
        ...state,
        firstCard: null,
        secondCard: null,
        isBusy: false,
      };
    case "SET_IS_BUSY":
      return { ...state, isBusy: action.payload };
    case "SET_HAS_WON":
      return { ...state, hasWon: true, isTiming: false };
    case "INCREMENT_TRIES":
      return { ...state, tries: state.tries + 1 };
    case "INCREMENT_TIME":
      return { ...state, time: state.time + 1 };
    case "START_TIMER":
      return { ...state, isTiming: true };
    case "RESET_GAME":
      return {
        ...initialState,
        cards: action.payload,
        bestScore: state.bestScore,
      };
    case "SET_BEST_SCORE":
      return { ...state, bestScore: action.payload };
    default:
      return state;
  }
}

export function useMemoryGame(difficulty) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    cards,
    firstCard,
    secondCard,
    isBusy,
    hasWon,
    tries,
    time,
    isTiming,
    bestScore,
  } = state;

  const handleCardClick = (clickedCard) => {
    if (!isTiming && !firstCard && !secondCard) {
      dispatch({ type: "START_TIMER" });
    }
    if (isBusy || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    dispatch({ type: "SET_CARDS", payload: updatedCards });

    if (!firstCard) {
      dispatch({ type: "SET_FIRST_CARD", payload: clickedCard });
    } else if (!secondCard) {
      dispatch({ type: "SET_SECOND_CARD", payload: clickedCard });
      dispatch({ type: "SET_IS_BUSY", payload: true });
    }
  };

  const resetTurn = () => {
    dispatch({ type: "RESET_TURN" });
  };

  const resetGame = () => {
    const newDeck = generateDeck(difficulty);
    dispatch({ type: "RESET_GAME", payload: newDeck });
  };

  useEffect(() => {
    let timer;
    if (isTiming) {
      timer = setInterval(() => {
        dispatch({ type: "INCREMENT_TIME" });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    dispatch({ type: "INCREMENT_TRIES" });
    dispatch({ type: "SET_IS_BUSY", payload: true });

    if (firstCard.symbol === secondCard.symbol) {
      const updated = cards.map((card) =>
        card.symbol === firstCard.symbol ? { ...card, isMatched: true } : card
      );
      dispatch({ type: "SET_CARDS", payload: updated });
      resetTurn();
    } else {
      setTimeout(() => {
        const updated = cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: false }
            : card
        );
        dispatch({ type: "SET_CARDS", payload: updated });
        resetTurn();
      }, 1000);
    }
  }, [firstCard, secondCard, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      dispatch({ type: "SET_HAS_WON" });

      const newScore = { tries, time };
      const key = `memory-best-score-${difficulty}`;
      const saved = localStorage.getItem(key);

      if (!saved || shouldUpdateBestScore(JSON.parse(saved), newScore)) {
        localStorage.setItem(key, JSON.stringify(newScore));
        dispatch({ type: "SET_BEST_SCORE", payload: newScore });
      }
    }
  }, [cards, time, tries, difficulty]);

  function shouldUpdateBestScore(prev, next) {
    return (
      next.tries < prev.tries ||
      (next.tries === prev.tries && next.time < prev.time)
    );
  }

  useEffect(() => {
    const key = `memory-best-score-${difficulty}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      dispatch({ type: "SET_BEST_SCORE", payload: JSON.parse(saved) });
    } else {
      dispatch({ type: "SET_BEST_SCORE", payload: null });
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
