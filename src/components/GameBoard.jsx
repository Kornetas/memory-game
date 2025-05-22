import Card from "./Card";
import { formatTime } from "../utils/formatTime";

function GameBoard({
  cards,
  bestScore,
  time,
  tries,
  hasWon,
  onCardClick,
  onReset,
  onBackToMenu,
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-center py-10 px-4">
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
          🎉 Brawo! Wygrałeś!
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center max-w-md mx-auto">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
      </div>

      <div className="flex justify-between w-full max-w-md mt-8 mx-auto">
        <button
          onClick={() => onBackToMenu()}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded shadow"
        >
          🔙 Powrót do menu
        </button>
        <button
          onClick={() => onReset()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          🔁 Zagraj ponownie
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
