import { useState, useCallback, useEffect } from "react";
import { GameHeader } from "./GameHeader";
import { Timer } from "./Timer";
import { Wildcards, WildcardsState } from "./Wildcards";
import { QuestionCard } from "./QuestionCard";
import { questions, bonusQuestion, shuffleArray } from "@/data/questions";
import { toast } from "sonner";

interface GameScreenProps {
  onGameEnd: (score: number, correct: number, bonusCorrect: boolean | null) => void;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [isBonus, setIsBonus] = useState(false);
  const [wildcards, setWildcards] = useState<WildcardsState>({
    fiftyFifty: true,
    skip: true,
    extraTime: true,
  });

  const currentQuestion = isBonus ? bonusQuestion : questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const resetTimer = useCallback((duration: number = 45) => {
    setTimerDuration(duration);
    setTimerKey((prev) => prev + 1);
    setIsPaused(false);
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      setIsPaused(true);

      if (isCorrect) {
        const points = isBonus ? 200 : 100;
        setScore((prev) => prev + points);
        if (!isBonus) setCorrectAnswers((prev) => prev + 1);
        toast.success(isBonus ? "¡Bonus correcto! +200 pts" : "¡Correcto! +100 pts", {
          duration: 1500,
        });
      } else {
        toast.error("Respuesta incorrecta", { duration: 1500 });
      }

      setTimeout(() => {
        if (isBonus) {
          onGameEnd(score + (isCorrect ? 200 : 0), correctAnswers, isCorrect);
        } else if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setEliminatedOptions([]);
          resetTimer();
        } else {
          setIsBonus(true);
          setEliminatedOptions([]);
          resetTimer();
          toast.info("¡Ronda Bonus! ¡Puntos dobles!", { duration: 2000 });
        }
      }, 1500);
    },
    [currentQuestionIndex, totalQuestions, isBonus, score, correctAnswers, onGameEnd, resetTimer]
  );

  const handleTimeUp = useCallback(() => {
    toast.error("¡Se acabó el tiempo!", { duration: 1500 });
    
    setTimeout(() => {
      if (isBonus) {
        onGameEnd(score, correctAnswers, false);
      } else if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setEliminatedOptions([]);
        resetTimer();
      } else {
        setIsBonus(true);
        setEliminatedOptions([]);
        resetTimer();
        toast.info("¡Ronda Bonus! ¡Puntos dobles!", { duration: 2000 });
      }
    }, 1500);
  }, [currentQuestionIndex, totalQuestions, isBonus, score, correctAnswers, onGameEnd, resetTimer]);

  const handleFiftyFifty = useCallback(() => {
    if (!wildcards.fiftyFifty || isPaused) return;

    const incorrectOptions = currentQuestion.options.filter(
      (opt) => opt !== currentQuestion.correctAnswer && !eliminatedOptions.includes(opt)
    );
    
    const toEliminate = shuffleArray(incorrectOptions).slice(0, 2);
    setEliminatedOptions((prev) => [...prev, ...toEliminate]);
    setWildcards((prev) => ({ ...prev, fiftyFifty: false }));
    toast.success("50/50 activado - 2 opciones eliminadas", { duration: 2000 });
  }, [wildcards.fiftyFifty, isPaused, currentQuestion, eliminatedOptions]);

  const handleSkip = useCallback(() => {
    if (!wildcards.skip || isPaused) return;

    setWildcards((prev) => ({ ...prev, skip: false }));
    toast.success("Pregunta saltada", { duration: 1500 });

    if (isBonus) {
      onGameEnd(score, correctAnswers, null);
    } else if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setEliminatedOptions([]);
      resetTimer();
    } else {
      setIsBonus(true);
      setEliminatedOptions([]);
      resetTimer();
      toast.info("¡Ronda Bonus! ¡Puntos dobles!", { duration: 2000 });
    }
  }, [wildcards.skip, isPaused, isBonus, currentQuestionIndex, totalQuestions, score, correctAnswers, onGameEnd, resetTimer]);

  const handleExtraTime = useCallback(() => {
    if (!wildcards.extraTime || isPaused) return;

    setWildcards((prev) => ({ ...prev, extraTime: false }));
    setTimerDuration((prev) => prev + 15);
    setTimerKey((prev) => prev + 1);
    toast.success("+15 segundos añadidos", { duration: 2000 });
  }, [wildcards.extraTime, isPaused]);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        <GameHeader
          score={score}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          isBonus={isBonus}
        />

        <div className="flex flex-col items-center mb-6">
          <Timer
            key={timerKey}
            duration={timerDuration}
            onTimeUp={handleTimeUp}
            isPaused={isPaused}
          />
        </div>

        <Wildcards
          wildcards={wildcards}
          onUseFiftyFifty={handleFiftyFifty}
          onUseSkip={handleSkip}
          onUseExtraTime={handleExtraTime}
          disabled={isPaused}
        />

        <div className="flex-1 flex items-center justify-center pb-8">
          <QuestionCard
            key={isBonus ? "bonus" : currentQuestionIndex}
            question={currentQuestion}
            onAnswer={handleAnswer}
            eliminatedOptions={eliminatedOptions}
            disabled={isPaused}
          />
        </div>
      </div>
    </div>
  );
}
