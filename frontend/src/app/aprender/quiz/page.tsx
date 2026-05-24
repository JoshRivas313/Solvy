"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { RefreshCw, ArrowRight, Star, XCircle } from "lucide-react";

type QuizState = "question" | "success" | "error";

import { useSearchParams } from "next/navigation";
import { quizzes } from "@/data/aprenderData";

export default function QuizPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<QuizState>("question");
  const searchParams = useSearchParams();
  const router = useRouter();

  const lessonId = Number(searchParams.get("leccion")) || 1;
  const quizData = quizzes[lessonId] || quizzes[1];

  const handleSubmit = () => {
    if (!selected) return;
    const option = quizData.options.find((o) => o.id === selected);
    setState(option?.correct ? "success" : "error");
  };

  const handleRetry = () => {
    setSelected(null);
    setState("question");
  };

  // ---- SUCCESS STATE ----
  if (state === "success") {
    return (
      <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
        <TopBar title="Inversión" showBack />
        <main className="flex-1 pt-20 pb-28 px-6 flex flex-col items-center justify-center text-center">
          {/* Success Icon */}
          <div className="relative w-40 h-40 mb-8 flex items-center justify-center animate-scale-in">
            <div className="absolute inset-0 bg-[var(--solvy-primary)] opacity-10 rounded-full blur-2xl" />
            <div className="w-28 h-28 bg-[var(--solvy-success-container)] rounded-full flex items-center justify-center shadow-lg relative z-10">
              <Star
                size={48}
                className="text-[var(--solvy-primary)]"
                fill="var(--solvy-primary)"
              />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--solvy-primary)] mb-4 animate-fade-in-up delay-1">
            ¡Excelente!
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)] leading-relaxed max-w-[320px] animate-fade-in-up delay-2">
            {quizData.successMessage}
          </p>

          <div className="w-full mt-12 animate-fade-in-up delay-3">
            <button onClick={() => router.push("/aprender")} className="btn-primary">
              Continuar
            </button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ---- ERROR STATE ----
  if (state === "error") {
    return (
      <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
        <TopBar title="Inversión" showBack />
        <main className="flex-1 pt-20 pb-28 px-6 flex flex-col items-center justify-center text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 rounded-full bg-[var(--solvy-error-container)] flex items-center justify-center mb-8 animate-scale-in">
            <XCircle size={40} className="text-[var(--solvy-error)]" />
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--solvy-text)] mb-4 animate-fade-in-up delay-1">
            Casi lo logras
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)] leading-relaxed max-w-[320px] animate-fade-in-up delay-2">
            Tu respuesta no ha sido del todo precisa. Analicemos el concepto para reforzar tu
            aprendizaje financiero.
          </p>

          {/* Key Concept */}
          <div className="w-full mt-8 p-5 rounded-[16px] bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)] text-left animate-fade-in-up delay-3">
            <span className="text-xs font-bold text-[var(--solvy-primary)] uppercase tracking-wider block mb-2">
              El concepto clave
            </span>
            <p className="text-sm text-[var(--solvy-text-secondary)] italic leading-relaxed">
              {quizData.errorMessage}
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 mt-10 animate-fade-in-up delay-4">
            <button onClick={handleRetry} className="btn-primary">
              <RefreshCw size={18} />
              Intentar de nuevo
            </button>
            <button
              onClick={() => router.push("/aprender")}
              className="btn-secondary"
            >
              Revisar lección anterior
            </button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ---- QUESTION STATE ----
  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar title="Inversión" showBack />

      <main className="flex-1 pt-20 pb-28 px-5 flex flex-col">
        {/* Question */}
        <h1 className="text-[1.75rem] font-extrabold text-[var(--solvy-text)] leading-tight mb-8 animate-fade-in-up">
          {quizData.question}
        </h1>

        {/* Options */}
        <div className="flex flex-col gap-3 flex-1 animate-fade-in-up delay-1">
          {quizData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`quiz-option ${selected === option.id ? "selected" : ""}`}
            >
              <div className="radio-dot" />
              <span className="text-base text-[var(--solvy-text-secondary)] leading-snug">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 pb-4 animate-fade-in-up delay-2">
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Ver resultado
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
