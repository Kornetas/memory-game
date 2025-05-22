function StartScreen({ difficulty, setDifficulty, onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">
        🎴 Gra pamięciowa
      </h1>
      <p className="text-gray-600 text-lg mb-4">📌 Wybierz poziom trudności</p>

      <div className="flex gap-4 mb-6">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded font-semibold capitalize ${
              difficulty === level
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {level === "easy" && "🟢 Łatwy"}
            {level === "medium" && "🟡 Średni"}
            {level === "hard" && "🔴 Trudny"}
          </button>
        ))}
      </div>

      <button
        onClick={onStart}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow text-lg"
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
