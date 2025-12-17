import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Sparkles, Play } from "lucide-react";

interface StartScreenProps {
  onStart: (name: string) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 game-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-primary/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-xl w-full text-center space-y-6 sm:space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center animate-pulse-glow shadow-2xl">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 text-accent animate-float" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 sm:space-y-3 px-2">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground glow-text leading-tight">
            Inteligencia Emocional y Aprendizaje Significativo
          </h1>
        </div>

        {/* Description */}
        <div className="bg-card/70 backdrop-blur-md border-2 border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl mx-2">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-600 via-primary to-cyan-400 mx-auto rounded-full" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Responde las preguntas correctamente. ¡Buena suerte!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Ingresa tu nombre para comenzar..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg bg-card/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary focus:ring-primary/30 text-center font-medium placeholder:text-muted-foreground/60 shadow-xl"
            />
          </div>
          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-display font-semibold bg-gradient-to-r from-primary via-cyan-500 to-primary hover:opacity-90 text-primary-foreground glow-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-2xl border-2 border-primary/50"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
            Iniciar Juego
          </Button>
        </form>

        {/* Session info */}
        <p className="text-xs sm:text-sm text-muted-foreground/70 font-display tracking-wider">
          6 Preguntas • Desafío Educativo
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
