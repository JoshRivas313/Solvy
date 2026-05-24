"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { PiggyBank, Car, Plus, Wallet, Edit2, ArrowLeft, Home, GraduationCap, Plane, ShoppingCart, Check, X, Trash2, Trophy } from "lucide-react";
import { useGoals } from "@/context/GoalsContext";

const ICON_MAP: Record<string, any> = {
  PiggyBank,
  Car,
  Home,
  GraduationCap,
  Plane,
  ShoppingCart
};

export default function MetaDetallePage() {
  const params = useParams();
  const router = useRouter();
  const { goals, updateGoal, deleteGoal } = useGoals();
  const id = params.id as string;
  
  const goal = goals.find(g => g.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  if (!goal) {
    return (
      <div className="mobile-container flex flex-col items-center justify-center min-h-dvh bg-[var(--solvy-bg)] p-10 text-center">
        <p className="text-[var(--solvy-text-secondary)] mb-4">No se encontró la meta solicitada.</p>
        <button onClick={() => router.push("/metas")} className="btn-primary">Volver a Metas</button>
      </div>
    );
  }

  const handleEditClick = () => {
    setEditedTitle(goal.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateGoal(goal.id, { title: editedTitle });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta meta?")) {
      deleteGoal(goal.id);
      router.push("/metas");
    }
  };

  const IconComponent = ICON_MAP[goal.iconName] || PiggyBank;
  const isCompleted = goal.progress >= 100;

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (goal.progress / 100) * circumference;

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[var(--solvy-border-light)] shadow-sm" style={{ maxWidth: "480px" }}>
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={() => router.push("/metas")} className="hover:bg-[var(--solvy-surface)] rounded-full transition-colors active:scale-95 duration-200 p-2 text-[var(--solvy-primary)]">
            <ArrowLeft size={24} />
          </button>
          
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 mx-2 px-3 py-1 bg-[var(--solvy-surface)] border border-[var(--solvy-primary)] rounded-lg font-bold text-lg outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          ) : (
            <h1 className="font-bold text-lg tracking-tight text-[var(--solvy-text)]">{goal.title}</h1>
          )}

          <div className="flex gap-1">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="hover:bg-emerald-50 rounded-full transition-colors p-2 text-[var(--solvy-primary)]">
                  <Check size={24} />
                </button>
                <button onClick={handleDelete} className="hover:bg-rose-50 rounded-full transition-colors p-2 text-rose-500">
                  <Trash2 size={24} />
                </button>
                <button onClick={handleCancel} className="hover:bg-slate-100 rounded-full transition-colors p-2 text-slate-500">
                  <X size={24} />
                </button>
              </>
            ) : (
              <button onClick={handleEditClick} className="hover:bg-[var(--solvy-surface)] rounded-full transition-colors active:scale-95 duration-200 p-2 text-[var(--solvy-primary)]">
                <Edit2 size={24} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-32 px-5 flex flex-col gap-6">
        {/* Hero Icon Section */}
        <section className="flex flex-col items-center justify-center relative">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-500" 
            style={{ 
              backgroundColor: isCompleted ? "var(--solvy-success-container)" : goal.iconBg,
              transform: isCompleted ? "scale(1.1)" : "scale(1)"
            }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            {isCompleted ? (
              <Trophy size={64} className="text-[var(--solvy-primary)] animate-bounce" />
            ) : (
              <IconComponent size={64} style={{ color: goal.iconColor }} />
            )}
          </div>
          {isCompleted && (
            <div className="absolute -top-2 bg-[var(--solvy-primary)] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg tracking-widest animate-pulse">
              ¡Meta Lograda!
            </div>
          )}
        </section>

        {/* Progress Premium Card */}
        <section className="bg-white rounded-[24px] p-6 shadow-md border border-[var(--solvy-border-light)]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-[var(--solvy-border-light)]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="10"></circle>
                <circle 
                  style={{ color: isCompleted ? "var(--solvy-primary)" : goal.iconColor }} 
                  cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" strokeWidth="12"
                  className="transition-all duration-1000 ease-out"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tight" style={{ color: isCompleted ? "var(--solvy-primary)" : goal.iconColor }}>
                  {goal.progress}%
                </span>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 divide-x divide-[var(--solvy-border-light)]">
              <div className="text-center flex flex-col gap-1">
                <p className="text-sm font-semibold text-[var(--solvy-text-secondary)] uppercase">Ahorrado</p>
                <p className="text-xl font-bold text-[var(--solvy-text)]">S/ {goal.saved.toLocaleString()}</p>
              </div>
              <div className="text-center flex flex-col gap-1">
                <p className="text-sm font-semibold text-[var(--solvy-text-secondary)] uppercase">Meta total</p>
                <p className="text-xl font-bold text-[var(--solvy-text)]">S/ {goal.target.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Info Chips */}
        <section className="flex flex-col gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between border border-[var(--solvy-border-light)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--solvy-text-secondary)]">Último aporte</p>
                <p className="text-lg font-bold text-[var(--solvy-primary)]">S/ {goal.lastDeposit}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--solvy-text-secondary)]">Fecha</p>
              <p className="text-sm font-bold text-[var(--solvy-text)]">{goal.lastDepositDate}</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--solvy-text)]">Actividad reciente</h3>
            <button className="text-[var(--solvy-primary)] text-sm font-semibold hover:underline">Ver todo</button>
          </div>
          <div className="flex flex-col gap-3">
            {goal.recentActivity.length > 0 ? (
              goal.recentActivity.map((activity, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between border-l-4 shadow-sm" style={{ borderLeftColor: isCompleted ? "var(--solvy-primary)" : goal.iconColor }}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-[var(--solvy-text)]">{activity.title}</p>
                      <p className="text-xs text-[var(--solvy-text-secondary)]">{activity.date}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold" style={{ color: isCompleted ? "var(--solvy-primary)" : goal.iconColor }}>{activity.amount}</p>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-sm text-[var(--solvy-text-secondary)] italic">Aún no hay actividad registrada.</p>
            )}
          </div>
        </section>

        {/* Action Button */}
        <section className="pt-2">
          {isCompleted ? (
            <div className="w-full bg-[var(--solvy-success-container)] text-[var(--solvy-primary)] py-4 rounded-[16px] text-lg font-bold flex items-center justify-center gap-2 border border-[var(--solvy-primary)]/20 shadow-sm">
              <Check size={24} />
              Meta finalizada
            </div>
          ) : (
            <button 
              onClick={() => router.push(`/metas/aporte?id=${goal.id}`)} 
              className="w-full bg-[var(--solvy-primary)] text-white py-4 rounded-[16px] text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform"
            >
              <Plus size={24} />
              Registrar aporte
            </button>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
