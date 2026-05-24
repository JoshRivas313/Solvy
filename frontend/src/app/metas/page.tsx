"use client";

import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { PiggyBank, Car, Plus, Home, GraduationCap, Plane, ShoppingCart } from "lucide-react";
import { useGoals } from "@/context/GoalsContext";

const ICON_MAP: Record<string, any> = {
  PiggyBank,
  Car,
  Home,
  GraduationCap,
  Plane,
  ShoppingCart
};

export default function MetasPage() {
  const { goals } = useGoals();
  
  const principalGoal = goals.find(g => g.type === "Principal") || goals[0];
  const otherGoals = goals.filter(g => g.id !== principalGoal?.id);

  const PrincipalIcon = principalGoal ? (ICON_MAP[principalGoal.iconName] || PiggyBank) : PiggyBank;

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar showLogo showNotification />

      <main className="flex-1 pt-20 pb-28 px-5 flex flex-col gap-6">
        {/* Header Section */}
        <section className="flex flex-col gap-1 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[var(--solvy-text)]">Tus Metas</h2>
        </section>

        {/* Goal Card: Principal */}
        {principalGoal && (
          <section className="card flex flex-col gap-6 border border-[var(--solvy-border-light)] animate-fade-in-up delay-1">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="bg-[var(--solvy-blue)]/10 text-[var(--solvy-blue)] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {principalGoal.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--solvy-text)]">{principalGoal.title}</h3>
              </div>
              <div 
                className="p-2 rounded-2xl"
                style={{ backgroundColor: principalGoal.iconBg }}
              >
                <PrincipalIcon size={24} style={{ color: principalGoal.iconColor }} />
              </div>
            </div>

            {/* Card Body: Metrics & Progress */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[var(--solvy-text-secondary)]">
                    Balance actual
                  </span>
                  <span className="text-4xl font-extrabold text-[var(--solvy-text)] tracking-tight">
                    S/ {principalGoal.saved.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-[var(--solvy-text-secondary)]">
                    Meta
                  </span>
                  <span className="text-xl font-bold" style={{ color: principalGoal.iconColor }}>
                    S/ {principalGoal.target.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Ring/Bar Area */}
              <div className="flex items-center gap-4 bg-[var(--solvy-surface)] rounded-2xl p-4 border border-[var(--solvy-border-light)] shadow-sm">
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[var(--solvy-bg)] shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[var(--solvy-border)]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      style={{ color: principalGoal.iconColor }}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${principalGoal.progress}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-[var(--solvy-text)]">{principalGoal.progress}%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[var(--solvy-text)]">
                    {principalGoal.progress > 0 ? "¡Vas por buen camino!" : "Aún no has comenzado"}
                  </span>
                  <span className="text-xs text-[var(--solvy-text-secondary)] leading-tight">
                    {principalGoal.progress > 0 
                      ? "Sigue aportando para alcanzar tu meta más rápido." 
                      : "Registra tu primer aporte para ver el crecimiento de tu meta."}
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-3 border-t border-[var(--solvy-border-light)] flex justify-between items-center">
                <p className="text-[11px] font-semibold text-[var(--solvy-text-secondary)]">
                  Último aporte: <span className="font-bold text-[var(--solvy-text)]">S/ {principalGoal.lastDeposit}</span>
                </p>
                <p className="text-[11px] font-semibold text-[var(--solvy-text-secondary)]">
                  Fecha: <span className="font-bold text-[var(--solvy-text)]">{principalGoal.lastDepositDate}</span>
                </p>
              </div>
            </div>

            {/* Card Action */}
            <Link
              href={`/metas/${principalGoal.id}`}
              className="w-full bg-[var(--solvy-primary)] text-white py-4 rounded-[16px] text-base font-bold hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
            >
              Ver detalles de meta
            </Link>
          </section>
        )}

        {/* Secondary Goals List (Bento-style preview) */}
        <section className="flex flex-col gap-4 animate-fade-in-up delay-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[var(--solvy-text)]">Otras Metas</h3>
            <Link href="/metas/todas" className="text-sm font-semibold text-[var(--solvy-primary)] hover:underline">
              Ver todas
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Dynamic Other Goals */}
            {otherGoals.map((goal) => {
              const GoalIcon = ICON_MAP[goal.iconName] || PiggyBank;
              return (
                <Link 
                  key={goal.id}
                  href={`/metas/${goal.id}`} 
                  className="card !p-4 flex flex-col gap-3 border border-[var(--solvy-border-light)] hover:border-[var(--solvy-primary)] transition-colors"
                >
                  <GoalIcon size={24} style={{ color: goal.iconColor }} />
                  <div className="flex flex-col gap-1 mt-1">
                    <h4 className="text-sm font-bold text-[var(--solvy-text)]">{goal.title}</h4>
                    <div className="w-full bg-[var(--solvy-border-light)] h-1.5 rounded-full mt-1">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${goal.progress}%`, backgroundColor: goal.iconColor }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-[var(--solvy-text-secondary)] font-medium mt-1">
                      {goal.progress}% completado
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Add New Goal */}
            <Link
              href="/metas/nueva"
              className="rounded-2xl p-4 border-2 border-dashed border-[var(--solvy-border)] bg-[var(--solvy-surface)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--solvy-bg)] transition-colors min-h-[140px]"
            >
              <Plus size={28} className="text-[var(--solvy-text-muted)]" />
              <span className="text-sm font-bold text-[var(--solvy-text-muted)]">
                Nueva Meta
              </span>
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
