import { useState, useCallback } from "react";
import { GameHeader } from "./GameHeader";
import { Timer } from "./Timer";
import { Wildcards, WildcardsState } from "./Wildcards";
import { QuestionCard } from "./QuestionCard";
import { questions, shuffleArray } from "@/data/questions";
import { toast } from "sonner";

interface GameScreenProps {
  onGameEnd: (score: number, correct: number, answers: boolean[], totalTime: number) => void;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime] = useState(Date.now());
  const [wildcards, setWildcards] = useState<WildcardsState>({
    fiftyFifty: true,
    skip: true,
    extraTime: true,
  });

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const resetTimer = useCallback((duration: number = 30) => {
    setTimerDuration(duration);
    setTimerKey((prev) => prev + 1);
    setIsPaused(false);
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      setIsPaused(true);

      // Track answer
      setAnswers((prev) => [...prev, isCorrect]);

      if (isCorrect) {
        setScore((prev) => prev + 100);
        setCorrectAnswers((prev) => prev + 1);
        toast.success("¡Correcto! +100 pts", {
          duration: 1500,
        });
      } else {
        toast.error("Respuesta incorrecta", { duration: 1500 });
      }

      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setEliminatedOptions([]);
          resetTimer();
        } else {
          const totalTime = Math.floor((Date.now() - startTime) / 1000);
          const finalAnswers = [...answers, isCorrect];
          onGameEnd(score + (isCorrect ? 100 : 0), correctAnswers + (isCorrect ? 1 : 0), finalAnswers, totalTime);
        }
      }, 1500);
    },
    [currentQuestionIndex, totalQuestions, score, correctAnswers, answers, startTime, onGameEnd, resetTimer]
  );

  const handleTimeUp = useCallback(() => {
    toast.error("¡Se acabó el tiempo!", { duration: 1500 });

    // Track as incorrect answer
    setAnswers((prev) => [...prev, false]);

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setEliminatedOptions([]);
        resetTimer();
      } else {
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        const finalAnswers = [...answers, false];
        onGameEnd(score, correctAnswers, finalAnswers, totalTime);
      }
    }, 1500);
  }, [currentQuestionIndex, totalQuestions, score, correctAnswers, answers, startTime, onGameEnd, resetTimer]);

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

    // Track as incorrect answer when skipping
    setAnswers((prev) => [...prev, false]);

    setWildcards((prev) => ({ ...prev, skip: false }));
    toast.success("Pregunta saltada", { duration: 1500 });

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setEliminatedOptions([]);
      resetTimer();
    } else {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      const finalAnswers = [...answers, false];
      onGameEnd(score, correctAnswers, finalAnswers, totalTime);
    }
  }, [wildcards.skip, isPaused, currentQuestionIndex, totalQuestions, score, correctAnswers, answers, startTime, onGameEnd, resetTimer]);

  const handleExtraTime = useCallback(() => {
    if (!wildcards.extraTime || isPaused) return;

    setWildcards((prev) => ({ ...prev, extraTime: false }));
    setTimerDuration((prev) => prev + 5);
    toast.success("+5 segundos añadidos", { duration: 2000 });
  }, [wildcards.extraTime, isPaused]);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        <GameHeader
          score={score}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          isBonus={false}
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
            key={currentQuestionIndex}
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
