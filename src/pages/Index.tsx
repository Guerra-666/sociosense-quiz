import { useState } from "react";
import { StartScreen } from "@/components/game/StartScreen";
import { GameScreen } from "@/components/game/GameScreen";
import { ResultsScreen } from "@/components/game/ResultsScreen";

type GameState = "start" | "playing" | "results";

interface GameResults {
  score: number;
  correctAnswers: number;
  bonusCorrect: boolean | null;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [results, setResults] = useState<GameResults>({
    score: 0,
    correctAnswers: 0,
    bonusCorrect: null,
  });

  const handleStart = () => {
    setGameState("playing");
  };

  const handleGameEnd = (score: number, correctAnswers: number, bonusCorrect: boolean | null) => {
    setResults({ score, correctAnswers, bonusCorrect });
    setGameState("results");
  };

  const handleRestart = () => {
    setResults({ score: 0, correctAnswers: 0, bonusCorrect: null });
    setGameState("start");
  };

  return (
    <main className="min-h-screen">
      {gameState === "start" && <StartScreen onStart={handleStart} />}
      {gameState === "playing" && <GameScreen onGameEnd={handleGameEnd} />}
      {gameState === "results" && (
        <ResultsScreen
          score={results.score}
          correctAnswers={results.correctAnswers}
          totalQuestions={6}
          bonusCorrect={results.bonusCorrect}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};

export default Index;
