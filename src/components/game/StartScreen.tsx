import { Button } from "@/components/ui/button";
import { Brain, Clock, Percent, SkipForward, Zap, Trophy } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl text-center animate-fade-in">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 border-2 border-primary mb-6 float box-glow">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          
          <h1 className="font-game text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 text-glow">
            Salud Integral
          </h1>
          <p className="text-primary font-game text-sm sm:text-base tracking-widest uppercase">
            Juego de Concurso
          </p>
        </div>

        <div className="game-card rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="font-semibold text-lg sm:text-xl text-foreground mb-4">
            Objetivo del Juego
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
            Reconocer los procesos y características que deben orientar la intervención 
            educativa socioemocional según la Nueva Escuela Mexicana (NEM).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground text-center">45s por pregunta</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Trophy className="w-6 h-6 text-warning" />
              <span className="text-xs text-muted-foreground text-center">6 preguntas</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Zap className="w-6 h-6 text-warning" />
              <span className="text-xs text-muted-foreground text-center">Ronda bonus</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Percent className="w-6 h-6 text-success" />
              <span className="text-xs text-muted-foreground text-center">3 comodines</span>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-foreground mb-3">Comodines disponibles:</h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                <Percent className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">50/50</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                <SkipForward className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Saltar</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+15 segundos</span>
              </div>
            </div>
          </div>
        </div>

        <Button variant="game" size="xl" onClick={onStart} className="px-12">
          Comenzar Juego
        </Button>
      </div>
    </div>
  );
}
