import { useState } from "react";
import { StartScreen } from "@/components/game/StartScreen";
import { GameScreen } from "@/components/game/GameScreen";
import { ResultsScreen } from "@/components/game/ResultsScreen";

type GameState = "start" | "playing" | "results";

interface GameResults {
  score: number;
  correctAnswers: number;
  bonusCorrect: boolean | null;
  answers: boolean[];
  totalTime: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [playerName, setPlayerName] = useState("");
  const [results, setResults] = useState<GameResults>({
    score: 0,
    correctAnswers: 0,
    bonusCorrect: null,
    answers: [],
    totalTime: 0,
  });

  const handleStart = (name: string) => {
    setPlayerName(name);
    setGameState("playing");
  };

  const handleGameEnd = (
    score: number,
    correctAnswers: number,
    bonusCorrect: boolean | null,
    answers: boolean[],
    totalTime: number
  ) => {
    setResults({ score, correctAnswers, bonusCorrect, answers, totalTime });
    setGameState("results");
  };

  const handleRestart = () => {
    setPlayerName("");
    setResults({ score: 0, correctAnswers: 0, bonusCorrect: null, answers: [], totalTime: 0 });
    setGameState("start");
  };

  return (
    <main className="min-h-screen">
      {gameState === "start" && <StartScreen onStart={handleStart} />}
      {gameState === "playing" && <GameScreen onGameEnd={handleGameEnd} />}
      {gameState === "results" && (
        <ResultsScreen
          playerName={playerName}
          score={results.score}
          correctAnswers={results.correctAnswers}
          totalQuestions={6}
          bonusCorrect={results.bonusCorrect}
          answers={results.answers}
          totalTime={results.totalTime}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};

export default Index;
