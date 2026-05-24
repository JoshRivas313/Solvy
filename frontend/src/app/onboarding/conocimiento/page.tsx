"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import OnboardingProgress from "@/components/OnboardingProgress";
import { knowledgeOptions } from "@/data/mockData";



export default function ConocimientoPage() {
  const [selected, setSelected] = useState("intermedio");
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/riesgo");
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <OnboardingProgress step={4} total={5} />

      <main className="flex-1 px-6 pt-12 pb-8 flex flex-col">
        {/* Header */}
        <header className="mb-10 animate-fade-in-up">
          <h1 className="text-[2rem] leading-[1.15] font-extrabold tracking-tight text-[var(--solvy-text)] mb-4">
            ¿Cuánto sabes de
            <br />
            inversiones?
          </h1>
          <p className="text-lg text-[var(--solvy-text-secondary)] font-medium leading-relaxed">
            Sé honesto. Aquí no hay respuestas
            <br />
            incorrectas.
          </p>
        </header>

        {/* Selection Cards */}
        <div className="flex flex-col gap-4 mb-12 animate-fade-in-up delay-1">
          {knowledgeOptions.map((option) => {
            const isActive = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`flex items-center p-6 rounded-[2rem] cursor-pointer transition-all duration-300 relative ${
                  isActive
                    ? "bg-[var(--solvy-primary-container)] border border-[var(--solvy-primary)]"
                    : "bg-[var(--solvy-surface)] border border-transparent hover:bg-[var(--solvy-bg)]"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mr-5 shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--solvy-primary)] text-white"
                      : "bg-[var(--solvy-bg)] text-[var(--solvy-text-secondary)]"
                  }`}
                >
                  <option.icon size={26} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-[var(--solvy-text)] text-[1.125rem] mb-1">
                    {option.title}
                  </h3>
                  <p
                    className={`text-[0.9375rem] leading-snug ${
                      isActive
                        ? "text-[var(--solvy-primary-dark)]"
                        : "text-[var(--solvy-text-secondary)]"
                    }`}
                  >
                    {option.description}
                  </p>
                </div>
                {isActive && (
                  <CheckCircle2
                    size={24}
                    className="text-[var(--solvy-primary)] shrink-0 ml-2"
                    fill="var(--solvy-primary)"
                    stroke="white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-8 pb-10 w-full animate-fade-in-up delay-2">
          <button onClick={handleContinue} className="btn-primary">
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
