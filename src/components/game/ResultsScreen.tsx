import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Star, RotateCcw, CheckCircle2, XCircle, Percent, Download, Clock, Target, Brain, Award, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";
import { questions } from "@/data/questions";

interface ResultsScreenProps {
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  answers: boolean[];
  totalTime: number;
  onRestart: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} min ${secs} seg`;
};

export function ResultsScreen({
  playerName,
  score,
  correctAnswers,
  totalQuestions,
  answers,
  totalTime,
  onRestart,
}: ResultsScreenProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: "Excelente", color: "text-success" };
    if (percentage >= 80) return { grade: "Muy Bien", color: "text-primary" };
    if (percentage >= 70) return { grade: "Bien", color: "text-accent" };
    if (percentage >= 60) return { grade: "Suficiente", color: "text-muted-foreground" };
    return { grade: "Estudia un poco más :)", color: "text-destructive" };
  };

  const gradeInfo = getGrade();
  const getStars = () => {
    if (percentage >= 100) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 40) return 1;
    return 0;
  };

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Elegant gradient header background
    doc.setFillColor(15, 23, 42); // Dark blue
    doc.rect(0, 0, pageWidth, 45, "F");

    // Title with elegant typography
    doc.setTextColor(56, 189, 248); // Cyan
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICADO DE RESULTADOS", pageWidth / 2, 15, { align: "center" });

    // Subtitle
    doc.setTextColor(250, 204, 21); // Yellow
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Salud Integral - Nueva Escuela Mexicana", pageWidth / 2, 24, { align: "center" });

    // Date inline
    const currentDate = new Date().toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.text(`Juego de Concurso • ${currentDate}`, pageWidth / 2, 32, { align: "center" });

    // Decorative line
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.5);
    doc.line(60, 38, pageWidth - 60, 38);

    // Main content card with border
    const cardY = 50;
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(1);
    doc.roundedRect(15, cardY, pageWidth - 30, 48, 3, 3, "S");

    // Player section
    doc.setTextColor(100, 100, 120);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("PARTICIPANTE", pageWidth / 2, cardY + 8, { align: "center" });

    doc.setTextColor(40, 40, 60);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(playerName.toUpperCase(), pageWidth / 2, cardY + 18, { align: "center" });

    // Grade badge
    doc.setFontSize(18);
    if (percentage >= 70) {
      doc.setTextColor(34, 197, 94); // Green
    } else if (percentage >= 50) {
      doc.setTextColor(250, 204, 21); // Yellow
    } else {
      doc.setTextColor(239, 68, 68); // Red
    }
    doc.text(gradeInfo.grade, pageWidth / 2, cardY + 30, { align: "center" });

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`${percentage}%`, pageWidth / 2, cardY + 42, { align: "center" });

    // Stats boxes with visual design
    const statsY = cardY + 56;
    const boxWidth = 52;
    const boxHeight = 24;
    const spacing = 6;
    const startX = (pageWidth - (boxWidth * 3 + spacing * 2)) / 2;

    // Box 1 - Aciertos
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(startX, statsY, boxWidth, boxHeight, 2, 2, "F");
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.5);
    doc.roundedRect(startX, statsY, boxWidth, boxHeight, 2, 2, "S");

    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("ACIERTOS", startX + boxWidth / 2, statsY + 7, { align: "center" });
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text(`${correctAnswers}/${totalQuestions}`, startX + boxWidth / 2, statsY + 17, { align: "center" });

    // Box 2 - Tiempo
    doc.setFillColor(254, 252, 232);
    doc.roundedRect(startX + boxWidth + spacing, statsY, boxWidth, boxHeight, 2, 2, "F");
    doc.setDrawColor(250, 204, 21);
    doc.roundedRect(startX + boxWidth + spacing, statsY, boxWidth, boxHeight, 2, 2, "S");

    doc.setTextColor(161, 98, 7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("TIEMPO", startX + boxWidth + spacing + boxWidth / 2, statsY + 7, { align: "center" });
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text(formatTime(totalTime), startX + boxWidth + spacing + boxWidth / 2, statsY + 17, { align: "center" });

    // Box 3 - Precisión
    const precision = Math.round((correctAnswers / totalQuestions) * 100);
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(startX + (boxWidth + spacing) * 2, statsY, boxWidth, boxHeight, 2, 2, "F");
    doc.setDrawColor(34, 197, 94);
    doc.roundedRect(startX + (boxWidth + spacing) * 2, statsY, boxWidth, boxHeight, 2, 2, "S");

    doc.setTextColor(34, 197, 94);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("PRECISIÓN", startX + (boxWidth + spacing) * 2 + boxWidth / 2, statsY + 7, { align: "center" });
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text(`${precision}%`, startX + (boxWidth + spacing) * 2 + boxWidth / 2, statsY + 17, { align: "center" });

    // Questions breakdown header
    const questionsY = statsY + 34;
    doc.setFillColor(250, 250, 252);
    doc.rect(15, questionsY, pageWidth - 30, 10, "F");

    doc.setTextColor(80, 80, 100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("DETALLE DE RESPUESTAS", 20, questionsY + 7);

    // Questions list with improved visual design
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    let currentY = questionsY + 16;
    const lineHeight = 11;
    const maxWidth = pageWidth - 50;

    questions.forEach((question, index) => {
      const isCorrect = answers[index];

      // Background alternating colors for better readability
      if (index % 2 === 0) {
        doc.setFillColor(252, 252, 254);
        doc.rect(15, currentY - 6, pageWidth - 30, lineHeight, "F");
      }

      // Status circle with check/cross
      const circleX = 21;
      const circleY = currentY - 1.5;

      if (isCorrect) {
        // Green circle with check
        doc.setFillColor(220, 252, 231); // Light green bg
        doc.circle(circleX, circleY, 3, "F");
        doc.setDrawColor(34, 197, 94);
        doc.setLineWidth(0.8);
        doc.circle(circleX, circleY, 3, "S");

        // Check mark
        doc.setDrawColor(34, 197, 94);
        doc.setLineWidth(1.2);
        doc.line(circleX - 1.5, circleY, circleX - 0.3, circleY + 1.5);
        doc.line(circleX - 0.3, circleY + 1.5, circleX + 1.5, circleY - 1.5);
      } else {
        // Red circle with X
        doc.setFillColor(254, 226, 226); // Light red bg
        doc.circle(circleX, circleY, 3, "F");
        doc.setDrawColor(239, 68, 68);
        doc.setLineWidth(0.8);
        doc.circle(circleX, circleY, 3, "S");

        // X mark
        doc.setDrawColor(239, 68, 68);
        doc.setLineWidth(1.2);
        doc.line(circleX - 1.5, circleY - 1.5, circleX + 1.5, circleY + 1.5);
        doc.line(circleX - 1.5, circleY + 1.5, circleX + 1.5, circleY - 1.5);
      }

      // Question number
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}.`, 28, currentY);

      // Question text with word wrap
      doc.setTextColor(50, 50, 70);
      doc.setFont("helvetica", "normal");
      const textLines = doc.splitTextToSize(question.question, maxWidth - 20);
      doc.text(textLines[0], 33, currentY);

      currentY += lineHeight;

      // Add new page if needed
      if (currentY > pageHeight - 30 && index < questions.length - 1) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Footer with decorative elements
    const footerY = pageHeight - 15;
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.3);
    doc.line(40, footerY - 5, pageWidth - 40, footerY - 5);

    doc.setFillColor(15, 23, 42);
    doc.rect(0, footerY - 2, pageWidth, 20, "F");

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Salud Integral - NEM", pageWidth / 2, footerY + 3, { align: "center" });

    // Save the PDF
    doc.save(`Resultados_${playerName.replace(/\s+/g, "_")}_${Date.now()}.pdf`);
  }, [playerName, correctAnswers, totalQuestions, totalTime, answers, percentage, gradeInfo.grade]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 game-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-success/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
              </div>
              <Award className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 text-primary animate-float" />
            </div>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground glow-text px-4">
            ¡Juego Completado!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base px-4">
            Felicidades, <span className="text-primary font-semibold font-display">{playerName}</span>
          </p>
        </div>

        {/* Main Results Card */}
        <div className="bg-card/70 backdrop-blur-md border-2 border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl mx-2">
          {/* Grade */}
          <div className="text-center space-y-2">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-600 via-primary to-cyan-400 mx-auto rounded-full mb-3" />
            <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider font-display">
              Calificación
            </p>
            <p className={cn("font-display text-2xl sm:text-3xl md:text-4xl font-bold", gradeInfo.color)}>
              {gradeInfo.grade}
            </p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground glow-text">
              {percentage}%
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-border/50 shadow-lg">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                {correctAnswers}/{totalQuestions}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-display">Aciertos</p>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-border/50 shadow-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1 sm:mb-2" />
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                {formatTime(totalTime)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-display">Tiempo</p>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-border/50 shadow-lg">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-success mx-auto mb-1 sm:mb-2" />
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                {totalQuestions}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-display">Preguntas</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  i < getStars()
                    ? "text-warning fill-warning"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Answers breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-1 h-4 bg-primary rounded-full" />
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                Detalle de respuestas
              </p>
            </div>
            <div className="space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg text-xs sm:text-sm backdrop-blur-sm transition-all hover:scale-[1.02]",
                    answers[index]
                      ? "bg-success/15 border-2 border-success/40 shadow-lg"
                      : "bg-destructive/15 border-2 border-destructive/40 shadow-lg"
                  )}
                >
                  {answers[index] ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <span className="text-foreground/90 leading-relaxed">{question.question}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
          <Button
            onClick={generatePDF}
            className="flex-1 h-12 sm:h-14 text-base sm:text-lg font-display font-semibold bg-gradient-to-r from-cyan-600 via-primary to-cyan-500 hover:opacity-90 text-primary-foreground glow-primary shadow-2xl border-2 border-primary/50 transition-all"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Descargar PDF
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 h-12 sm:h-14 text-base sm:text-lg font-display font-semibold border-2 border-primary/50 hover:bg-secondary/80 hover:border-primary transition-all backdrop-blur-sm shadow-xl"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Jugar de Nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}
