"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, PiggyBank, Car, Home, GraduationCap, Plane, ShoppingCart } from "lucide-react";
import { useGoals } from "@/context/GoalsContext";

const ICON_MAP: Record<string, any> = {
  PiggyBank,
  Car,
  Home,
  GraduationCap,
  Plane,
  ShoppingCart
};

function AporteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { goals, addDeposit } = useGoals();
  
  const goalId = searchParams.get("id");
  const goal = goals.find(g => g.id === goalId) || goals[0]; // fallback to first goal

  const [amount, setAmount] = useState("100");

  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) return;
    addDeposit(goal.id, Number(amount));
    router.push(`/metas/${goal.id}`);
  };

  const quickAmounts = [50, 100, 200, 500];
  const IconComponent = ICON_MAP[goal.iconName] || PiggyBank;

  return (
    <main className="flex-1 pt-24 px-5 flex flex-col gap-8">
      {/* Target Progress Card */}
      <section className="card flex flex-col gap-4 border border-[var(--solvy-border-light)] animate-fade-in-up">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <span 
              className="inline-flex items-center px-3 py-1 font-bold text-xs rounded-full w-fit"
              style={{ backgroundColor: goal.iconBg, color: goal.iconColor }}
            >
              {goal.type}
            </span>
            <h2 className="text-2xl font-bold text-[var(--solvy-text)]">{goal.title}</h2>
          </div>
          <div 
            className="w-12 h-12 flex items-center justify-center rounded-full"
            style={{ backgroundColor: goal.iconBg }}
          >
            <IconComponent size={28} style={{ color: goal.iconColor }} />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between items-end mb-1">
            <p className="text-[11px] font-bold text-[var(--solvy-text-secondary)] uppercase tracking-wider">Progreso</p>
            <span className="font-extrabold text-xl" style={{ color: goal.iconColor }}>{goal.progress}%</span>
          </div>
          <div className="w-full bg-[var(--solvy-border-light)] h-3 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${goal.progress}%`, backgroundColor: goal.iconColor }}
            ></div>
          </div>
        </div>

        <div className="border-t border-[var(--solvy-border-light)] mt-4 pt-4 flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-[var(--solvy-text-secondary)] uppercase tracking-wider mb-1">Guardados</p>
            <p className="text-xl font-bold text-[var(--solvy-text)]">S/ {goal.saved.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[11px] font-bold text-[var(--solvy-text-secondary)] uppercase tracking-wider mb-1">Meta</p>
            <p className="text-xl font-bold text-[var(--solvy-text)]">S/ {goal.target.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Amount Input Area */}
      <section className="flex flex-col items-center justify-center py-4 animate-fade-in-up delay-1">
        <p className="text-sm font-bold text-[var(--solvy-text-secondary)] mb-4">Valor del Aporte</p>
        <div className="relative w-full max-w-xs flex items-center justify-center group">
          <span className="absolute left-6 text-4xl font-extrabold text-[var(--solvy-text)]">S/</span>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent border-0 border-b-2 border-[var(--solvy-border)] focus:border-[var(--solvy-primary)] focus:ring-0 text-center text-4xl font-extrabold text-[var(--solvy-text)] py-4 pl-12 placeholder:text-[var(--solvy-text-muted)] transition-colors outline-none"
          />
        </div>
      </section>

      {/* Quick Select Chips */}
      <section className="animate-fade-in-up delay-2">
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.toString())}
              className={`py-3 rounded-xl text-sm font-bold transition-colors border ${
                amount === val.toString() 
                  ? 'bg-[var(--solvy-primary-container)] text-[var(--solvy-primary)] border-[var(--solvy-primary)]' 
                  : 'bg-[var(--solvy-surface)] text-[var(--solvy-text)] border-transparent hover:bg-[var(--solvy-border-light)]'
              }`}
            >
              S/ {val}
            </button>
          ))}
        </div>
      </section>

      {/* Action Button */}
      <section className="mt-auto pt-6 animate-fade-in-up delay-3">
        <button 
          onClick={handleConfirm}
          className="btn-primary"
        >
          Confirmar aporte
        </button>
      </section>
    </main>
  );
}

export default function RegistrarAportePage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)] pb-10">
      {/* Header */}
      <header className="fixed top-0 w-full max-w-[480px] z-50 bg-[var(--solvy-surface)]/90 backdrop-blur-md border-b border-[var(--solvy-border-light)]">
        <div className="flex items-center justify-between px-4 h-16 w-full">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--solvy-bg)] transition-colors active:scale-95 duration-200"
          >
            <ArrowLeft size={24} className="text-[var(--solvy-primary)]" />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--solvy-text)] flex-1 text-center pr-10">
            Registrar aporte
          </h1>
        </div>
      </header>

      <Suspense fallback={<div className="pt-24 text-center">Cargando...</div>}>
        <AporteForm />
      </Suspense>
    </div>
  );
}
