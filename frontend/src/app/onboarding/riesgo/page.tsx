"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import OnboardingProgress from "@/components/OnboardingProgress";
import { riskOptions } from "@/data/mockData";



export default function RiesgoPage() {
  const [selected, setSelected] = useState("moderado");
  const router = useRouter();

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <OnboardingProgress step={5} total={5} />

      <main className="flex-1 px-6 py-8 flex flex-col">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-[1.75rem] font-extrabold text-[var(--solvy-text)] mb-3 leading-tight">
            ¿Cómo te sientes con el riesgo?
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)]">
            Define el retorno estimado en tus simulaciones.
          </p>
        </div>

        {/* Risk Cards */}
        <div className="flex flex-col gap-4 flex-1 animate-fade-in-up delay-1">
          {riskOptions.map((option) => {
            const isActive = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`selection-card ${isActive ? "active" : ""}`}
              >
                <div
                  className="icon-bubble"
                  style={{
                    background: isActive ? "var(--solvy-primary-container)" : option.iconBg,
                  }}
                >
                  <option.icon
                    size={22}
                    color={isActive ? "var(--solvy-primary)" : option.iconColor}
                    fill={isActive ? "var(--solvy-primary)" : "none"}
                  />
                </div>
                <div className="flex-1 text-left pt-1">
                  <h3 className="text-lg font-bold text-[var(--solvy-text)] mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-[var(--solvy-text-secondary)] leading-relaxed">
                    {option.description}
                  </p>
                </div>
                {isActive && (
                  <CheckCircle2
                    size={22}
                    className="text-[var(--solvy-primary)] shrink-0 mt-2"
                    fill="var(--solvy-primary)"
                    stroke="white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 pb-8 animate-fade-in-up delay-2">
          <button onClick={handleFinish} className="btn-primary">
            Finalizar
          </button>
        </div>
      </main>
    </div>
  );
}
