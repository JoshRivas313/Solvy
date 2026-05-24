"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
import OnboardingProgress from "@/components/OnboardingProgress";

import { savingsOptions } from "@/data/mockData";

export default function AhorroPage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/conocimiento");
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <OnboardingProgress step={3} total={5} />

      <main className="flex-1 px-6 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-10 text-center animate-fade-in-up">
          <h1 className="text-[1.75rem] font-extrabold text-[var(--solvy-text)] mb-2 leading-tight">
            ¿Cuánto podrías ahorrar?
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)]">
            No tiene que ser mucho. Lo importante es empezar.
          </p>
        </div>

        {/* Amount Display */}
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up delay-1">
          <div className="text-center mb-6">
            <span className="text-[3.5rem] font-extrabold text-[var(--solvy-text)] tracking-tight">
              S/ {selectedAmount}
            </span>
          </div>

          {/* Tip Card */}
          <div className="card w-full mb-8 flex items-start gap-3 animate-fade-in-up delay-2">
            <Lightbulb
              size={20}
              className="text-[var(--solvy-primary)] shrink-0 mt-0.5"
              fill="var(--solvy-primary)"
            />
            <p className="text-sm text-[var(--solvy-text-secondary)] leading-relaxed">
              {selectedAmount <= 100
                ? `Eso es un buen comienzo. Incluso montos pequeños generan resultados con el tiempo.`
                : selectedAmount <= 200
                ? `Excelente elección. Con constancia, esto puede crecer significativamente.`
                : `¡Impresionante! Estás por encima del promedio de ahorro. Tu futuro yo te lo agradecerá.`}
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-3 w-full mb-8 animate-fade-in-up delay-3">
            {savingsOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedAmount(option.value)}
                className={`chip ${selectedAmount === option.value ? "active" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pb-8 animate-fade-in-up delay-4">
          <button onClick={handleContinue} className="btn-primary">
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
