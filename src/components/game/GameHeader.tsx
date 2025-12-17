import { Trophy, Zap } from "lucide-react";

interface GameHeaderProps {
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  isBonus?: boolean;
}

export function GameHeader({ score, currentQuestion, totalQuestions, isBonus }: GameHeaderProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 game-card px-4 py-2 rounded-xl">
        <Trophy className="w-5 h-5 text-warning" />
        <span className="font-game text-lg text-foreground">
          {score.toLocaleString()}
        </span>
        <span className="text-muted-foreground text-sm">pts</span>
      </div>

      <div className="flex items-center gap-2">
        {isBonus ? (
          <div className="flex items-center gap-2 bg-warning/20 border border-warning/50 px-4 py-2 rounded-xl">
            <Zap className="w-5 h-5 text-warning" />
            <span className="font-game text-warning text-sm">RONDA BONUS</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 game-card px-4 py-2 rounded-xl">
            <span className="text-muted-foreground text-sm">Pregunta</span>
            <span className="font-game text-primary text-lg">{currentQuestion}</span>
            <span className="text-muted-foreground text-sm">de</span>
            <span className="font-game text-foreground text-lg">{totalQuestions}</span>
          </div>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < currentQuestion - 1
                ? "bg-success"
                : i === currentQuestion - 1
                ? "bg-primary pulse-glow"
                : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
