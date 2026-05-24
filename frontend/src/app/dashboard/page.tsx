"use client";

import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { PiggyBank, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { recentActivityData } from "@/data/mockData";

export default function DashboardPage() {
  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar showLogo showNotification />

      <main className="flex-1 pt-20 pb-28 px-5 flex flex-col gap-6">
        {/* Main Goal Card — Glassmorphism */}
        <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md shadow-lg border border-white/40 p-6 flex flex-col gap-4 animate-fade-in-up">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[var(--solvy-primary)] opacity-[0.08] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--solvy-primary)] uppercase tracking-wider">
                Objetivo Principal
              </span>
              <h2 className="text-xl font-bold text-[var(--solvy-text)]">Retiro Temprano</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[var(--solvy-primary-container)] flex items-center justify-center">
              <PiggyBank size={24} className="text-[var(--solvy-primary)]" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-end">
              <span className="text-4xl font-extrabold text-[var(--solvy-text)] tracking-tight">
                $45,000
              </span>
              <span className="text-sm font-semibold text-[var(--solvy-text-muted)] mb-1">
                de $100,000
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: "45%" }} />
            </div>
            <p className="text-sm text-[var(--solvy-text-muted)]">
              Vas por buen camino para alcanzar tu meta en 2035.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-2 gap-4 animate-fade-in-up delay-1">
          <div className="card flex flex-col gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <Wallet size={18} className="text-[var(--solvy-blue)]" />
            </div>
            <div className="flex flex-col gap-1 mt-auto">
              <span className="text-xs font-semibold text-[var(--solvy-text-muted)] uppercase tracking-wide">
                Aporte Mensual
              </span>
              <span className="text-2xl font-bold text-[var(--solvy-text)]">S/50</span>
            </div>
          </div>

          <div className="card flex flex-col gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
              <TrendingUp size={18} className="text-[var(--solvy-indigo)]" />
            </div>
            <div className="flex flex-col gap-1 mt-auto">
              <span className="text-xs font-semibold text-[var(--solvy-text-muted)] uppercase tracking-wide">
                Años al retiro
              </span>
              <span className="text-2xl font-bold text-[var(--solvy-text)]">40</span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="flex flex-col gap-4 animate-fade-in-up delay-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[var(--solvy-text)]">Actividad Reciente</h3>
            <button className="text-sm font-semibold text-[var(--solvy-primary)] flex items-center gap-1">
              Ver todo <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {recentActivityData.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-4 rounded-[16px] shadow-sm border border-[var(--solvy-border-light)] hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: item.iconBg }}
                >
                  <item.icon size={18} style={{ color: item.iconColor }} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold text-[var(--solvy-text)]">
                    {item.title}
                  </span>
                  <span className="text-xs text-[var(--solvy-text-muted)]">{item.time}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: item.amountColor }}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
