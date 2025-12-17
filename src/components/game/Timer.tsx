import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
  onTick?: (remaining: number) => void;
}

export function Timer({ duration, onTimeUp, isPaused, onTick }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [initialDuration, setInitialDuration] = useState(duration);
  const percentage = (timeLeft / initialDuration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    setTimeLeft((prev) => prev + (duration - initialDuration));
    setInitialDuration(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick?.(newTime);
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp, onTick]);

  const getTimerColor = () => {
    if (timeLeft <= 10) return "text-destructive";
    if (timeLeft <= 20) return "text-warning";
    return "text-primary";
  };

  const getStrokeColor = () => {
    if (timeLeft <= 10) return "stroke-destructive";
    if (timeLeft <= 20) return "stroke-warning";
    return "stroke-primary";
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="none"
          className="stroke-secondary"
          strokeWidth="6"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="none"
          className={`${getStrokeColor()} transition-all duration-300`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: timeLeft <= 10 ? "drop-shadow(0 0 8px hsl(var(--destructive)))" : "drop-shadow(0 0 8px hsl(var(--primary)))",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <Clock className={`w-4 h-4 ${getTimerColor()} mb-1`} />
        <span
          className={`font-game text-2xl sm:text-3xl ${getTimerColor()} ${
            timeLeft <= 10 ? "timer-pulse" : ""
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
