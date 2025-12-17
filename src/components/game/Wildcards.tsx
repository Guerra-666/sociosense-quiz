import { Button } from "@/components/ui/button";
import { Percent, SkipForward, Clock } from "lucide-react";

export interface WildcardsState {
  fiftyFifty: boolean;
  skip: boolean;
  extraTime: boolean;
}

interface WildcardsProps {
  wildcards: WildcardsState;
  onUseFiftyFifty: () => void;
  onUseSkip: () => void;
  onUseExtraTime: () => void;
  disabled: boolean;
}

export function Wildcards({
  wildcards,
  onUseFiftyFifty,
  onUseSkip,
  onUseExtraTime,
  disabled,
}: WildcardsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      <Button
        variant={wildcards.fiftyFifty ? "wildcard" : "wildcardUsed"}
        size="sm"
        onClick={onUseFiftyFifty}
        disabled={!wildcards.fiftyFifty || disabled}
        className="flex items-center gap-2"
      >
        <Percent className="w-4 h-4" />
        <span className="hidden sm:inline">50/50</span>
      </Button>

      <Button
        variant={wildcards.skip ? "wildcard" : "wildcardUsed"}
        size="sm"
        onClick={onUseSkip}
        disabled={!wildcards.skip || disabled}
        className="flex items-center gap-2"
      >
        <SkipForward className="w-4 h-4" />
        <span className="hidden sm:inline">Saltar</span>
      </Button>

      <Button
        variant={wildcards.extraTime ? "wildcard" : "wildcardUsed"}
        size="sm"
        onClick={onUseExtraTime}
        disabled={!wildcards.extraTime || disabled}
        className="flex items-center gap-2"
      >
        <Clock className="w-4 h-4" />
        <span className="hidden sm:inline">+15s</span>
      </Button>
    </div>
  );
}
