"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingProgress from "@/components/OnboardingProgress";

import { incomeOptions } from "@/data/mockData";

export default function IngresoPage() {
  const [selectedIncome, setSelectedIncome] = useState(1500);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/ahorro");
  };

  const formatIncome = (value: number) => {
    return `S/ ${value.toLocaleString("es-PE")}`;
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <OnboardingProgress step={2} total={5} />

      <main className="flex-1 px-6 flex flex-col justify-center py-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <h1 className="text-[1.75rem] leading-tight text-[var(--solvy-text)] font-bold mb-4">
            ¿Cuánto ganas al mes?
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)] max-w-sm">
            Aproximado. Nos ayuda a sugerirte un aporte realista.
          </p>
        </div>

        {/* Large Display Amount */}
        <div className="flex justify-center items-center w-full mb-16 animate-fade-in-up delay-1">
          <span className="text-[3.5rem] md:text-[4.5rem] tracking-tight font-extrabold text-[var(--solvy-text)]">
            {formatIncome(selectedIncome)}
          </span>
        </div>

        {/* Quick Selection Chips */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg mx-auto animate-fade-in-up delay-2">
          {incomeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedIncome(option.value)}
              className={`chip text-lg !px-6 !py-4 ${
                selectedIncome === option.value ? "active" : ""
              }`}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Action */}
      <div className="w-full px-6 pb-12 pt-4 animate-fade-in-up delay-3">
        <button onClick={handleContinue} className="btn-primary">
          Continuar
        </button>
      </div>
    </div>
  );
}
