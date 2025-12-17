import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Question, shuffleArray } from "@/data/questions";
import { CheckCircle2, XCircle, Zap } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  eliminatedOptions: string[];
  disabled: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  eliminatedOptions,
  disabled,
}: QuestionCardProps) {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShuffledOptions(shuffleArray(question.options));
    setSelectedAnswer(null);
    setShowResult(false);
  }, [question]);

  const handleSelect = (option: string) => {
    if (disabled || showResult || eliminatedOptions.includes(option)) return;

    setSelectedAnswer(option);
    setShowResult(true);

    const isCorrect = option === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const getOptionVariant = (option: string) => {
    if (eliminatedOptions.includes(option)) return "optionDisabled";
    if (!showResult) return "option";
    if (option === question.correctAnswer) return "optionCorrect";
    if (option === selectedAnswer && option !== question.correctAnswer)
      return "optionIncorrect";
    return "optionDisabled";
  };

  const getOptionIcon = (option: string) => {
    if (!showResult) return null;
    if (option === question.correctAnswer) {
      return <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />;
    }
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />;
    }
    return null;
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="game-card rounded-2xl p-6 sm:p-8 mb-6">
        {question.isBonus && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-warning" />
            <span className="font-game text-warning text-lg">¡PUNTOS DOBLES!</span>
            <Zap className="w-6 h-6 text-warning" />
          </div>
        )}
        <h2 className="text-lg sm:text-xl md:text-2xl text-foreground font-medium leading-relaxed text-center">
          {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {shuffledOptions.map((option, index) => (
          <Button
            key={index}
            variant={getOptionVariant(option)}
            size="option"
            onClick={() => handleSelect(option)}
            disabled={disabled || showResult || eliminatedOptions.includes(option)}
            className={`w-full rounded-xl ${
              showResult && option === question.correctAnswer ? "celebrate" : ""
            }`}
          >
            <span className="flex items-start gap-3 w-full">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-game text-sm ${
                  eliminatedOptions.includes(option)
                    ? "bg-muted text-muted-foreground"
                    : showResult && option === question.correctAnswer
                    ? "bg-success text-success-foreground"
                    : showResult && option === selectedAnswer
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {optionLabels[index]}
              </span>
              <span className="flex-1 text-left leading-relaxed text-sm sm:text-base">
                {option}
              </span>
              {getOptionIcon(option)}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
