import { Button } from "@/components/ui/button";
import { Trophy, Star, RotateCcw, CheckCircle2, XCircle, Percent } from "lucide-react";

interface ResultsScreenProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  bonusCorrect: boolean | null;
  onRestart: () => void;
}

export function ResultsScreen({
  score,
  correctAnswers,
  totalQuestions,
  bonusCorrect,
  onRestart,
}: ResultsScreenProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return "¡Excelente! ¡Perfecto!";
    if (percentage >= 80) return "¡Muy bien! Gran conocimiento";
    if (percentage >= 60) return "¡Bien! Sigue aprendiendo";
    if (percentage >= 40) return "Puedes mejorar";
    return "Sigue practicando";
  };

  const getStars = () => {
    if (percentage >= 100) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 40) return 1;
    return 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg text-center animate-scale-in">
        <div className="game-card rounded-3xl p-8 sm:p-10">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning/20 border-2 border-warning mb-4">
              <Trophy className="w-10 h-10 text-warning" />
            </div>
            
            <h1 className="font-game text-2xl sm:text-3xl text-foreground mb-2">
              ¡Juego Terminado!
            </h1>
            <p className="text-muted-foreground">{getMessage()}</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  i < getStars()
                    ? "text-warning fill-warning"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
            <div className="text-5xl sm:text-6xl font-game text-primary text-glow mb-2">
              {score.toLocaleString()}
            </div>
            <div className="text-muted-foreground">Puntos totales</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-game text-2xl text-success">{correctAnswers}</span>
              </div>
              <div className="text-xs text-muted-foreground">Correctas</div>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-primary" />
                <span className="font-game text-2xl text-primary">{percentage}%</span>
              </div>
              <div className="text-xs text-muted-foreground">Precisión</div>
            </div>
          </div>

          {bonusCorrect !== null && (
            <div className={`flex items-center justify-center gap-2 mb-6 p-3 rounded-xl ${
              bonusCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            }`}>
              {bonusCorrect ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                Ronda Bonus: {bonusCorrect ? "¡Correcta! (+200 pts)" : "Incorrecta"}
              </span>
            </div>
          )}

          <Button variant="game" size="lg" onClick={onRestart} className="w-full">
            <RotateCcw className="w-5 h-5 mr-2" />
            Jugar de Nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}
