"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingProgress from "@/components/OnboardingProgress";

export default function EdadPage() {
  const [age, setAge] = useState(25);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/ingreso");
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <OnboardingProgress step={1} total={5} />

      <main className="flex-1 px-6 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-[var(--solvy-text)] mb-3 leading-tight">
            ¿Cuántos años tienes?
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)] leading-relaxed">
            Tu edad define cuánto tiempo tienes para construir tu futuro.
          </p>
        </div>

        {/* Central Display */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto mb-16 animate-fade-in-up delay-1">
          <div className="text-center mb-16 flex flex-col items-center justify-center w-48 h-48 rounded-full shadow-lg bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)]">
            <span className="text-7xl font-extrabold text-[var(--solvy-primary)] mb-1">
              {age}
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--solvy-text-secondary)] font-bold">
              AÑOS
            </span>
          </div>

          {/* Slider */}
          <div className="w-full px-2">
            <input
              type="range"
              min={18}
              max={65}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full"
              id="ageSlider"
            />
            <div className="flex justify-between mt-4">
              <span className="text-sm font-semibold text-[var(--solvy-text-secondary)]">18</span>
              <span className="text-sm font-semibold text-[var(--solvy-text-secondary)]">65+</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pb-8 animate-fade-in-up delay-2">
          <button onClick={handleContinue} className="btn-primary">
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
