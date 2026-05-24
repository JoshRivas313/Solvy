"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { PiggyBank, Car, Plus, Home, GraduationCap, Plane, ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";
import { useGoals } from "@/context/GoalsContext";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
  PiggyBank,
  Car,
  Home,
  GraduationCap,
  Plane,
  ShoppingCart
};

export default function TodasLasMetasPage() {
  const router = useRouter();
  const { goals } = useGoals();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[var(--solvy-border-light)] shadow-sm" style={{ maxWidth: "480px" }}>
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={() => router.push("/metas")} className="hover:bg-[var(--solvy-surface)] rounded-full transition-colors p-2 text-[var(--solvy-primary)]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg tracking-tight text-[var(--solvy-text)]">Todas mis metas</h1>
          <button onClick={() => router.push("/metas/nueva")} className="hover:bg-[var(--solvy-surface)] rounded-full transition-colors p-2 text-[var(--solvy-primary)]">
            <Plus size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-32 px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {goals.map((goal) => {
            const GoalIcon = ICON_MAP[goal.iconName] || PiggyBank;
            const isCompleted = goal.progress >= 100;

            return (
              <Link 
                key={goal.id} 
                href={`/metas/${goal.id}`}
                className="bg-white rounded-[24px] p-4 flex items-center gap-4 border border-[var(--solvy-border-light)] shadow-sm hover:border-[var(--solvy-primary)] transition-all active:scale-[0.98]"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: isCompleted ? "var(--solvy-success-container)" : goal.iconBg }}
                >
                  <GoalIcon size={28} style={{ color: isCompleted ? "var(--solvy-primary)" : goal.iconColor }} />
                </div>
                
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="font-bold text-[var(--solvy-text)] truncate">{goal.title}</h3>
                    <span className="text-[13px] font-black" style={{ color: isCompleted ? "var(--solvy-primary)" : goal.iconColor }}>
                      {goal.progress}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-[var(--solvy-border-light)] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${goal.progress}%`, 
                        backgroundColor: isCompleted ? "var(--solvy-primary)" : goal.iconColor 
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-[11px] font-bold text-[var(--solvy-text-secondary)]">
                      S/ {goal.saved.toLocaleString()} de S/ {goal.target.toLocaleString()}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--solvy-primary)]">
                        ¡Completada!
                      </span>
                    )}
                  </div>
                </div>
                
                <ChevronRight size={20} className="text-[var(--solvy-text-muted)]" />
              </Link>
            );
          })}
        </div>

        {goals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[var(--solvy-surface)] flex items-center justify-center">
              <PiggyBank size={40} className="text-[var(--solvy-text-muted)]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[var(--solvy-text)]">No tienes metas aún</p>
              <p className="text-sm text-[var(--solvy-text-secondary)] px-10">Comienza a ahorrar para tus sueños creando tu primera meta.</p>
            </div>
            <button onClick={() => router.push("/metas/nueva")} className="btn-primary mt-4">
              Crear mi primera meta
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
