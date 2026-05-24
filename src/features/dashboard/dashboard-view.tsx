"use client";

import Link from "next/link";
import { TrendingUp, BookOpen, Target, ChevronRight, Zap, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Btn } from "@/components/ui/btn";
import { fmtCompact, fmt } from "@/lib/utils/format";
import { compoundGrowth, RISK_RETURNS } from "@/lib/utils/finance";
import type { RiskLevel } from "@/types";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["financial_profiles"]["Row"] | null;

const TIPS = [
  { icon: Shield,    text: "Tener un fondo de emergencia es el primer paso antes de invertir." },
  { icon: Zap,       text: "El interés compuesto funciona mejor cuanto antes empieces." },
  { icon: TrendingUp, text: "Diversificar reduce el riesgo sin sacrificar mucho rendimiento." },
  { icon: Clock,     text: "Invertir S/200 mensuales desde los 25 puede valer más de S/500k a los 65." },
];

const QUICK_ACTIONS = [
  { href: "/simulator", icon: TrendingUp, label: "Simular",  color: "bg-brand-100 text-brand-700"   },
  { href: "/education", icon: BookOpen,   label: "Aprender", color: "bg-accent-100 text-accent-600" },
  { href: "/goals",     icon: Target,     label: "Metas",    color: "bg-primary-100 text-primary-700" },
];

interface DashboardViewProps {
  user: User;
  profile: Profile;
}

export function DashboardView({ user, profile }: DashboardViewProps) {
  const name = (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "Inversor";

  const projection = profile
    ? compoundGrowth(
        (profile.monthly_income - profile.monthly_expenses - profile.monthly_debt) * 0.2,
        profile.current_savings,
        RISK_RETURNS[profile.risk_tolerance as RiskLevel],
        65 - profile.age
      )
    : null;

  const tip = TIPS[new Date().getDay() % TIPS.length];
  const TipIcon = tip.icon;

  const monthlySavable = profile
    ? profile.monthly_income - profile.monthly_expenses - profile.monthly_debt
    : null;

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      {/* Saludo */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">Buenos días,</p>
          <h1 className="text-2xl font-bold text-neutral-900">{name} 👋</h1>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-card">
          <span className="text-white font-bold">{name[0]}</span>
        </div>
      </div>

      {/* Proyección de jubilación */}
      {profile && projection ? (
        <Card className="bg-linear-to-br from-brand-900 to-brand-700 text-white border-0">
          <p className="text-xs text-white/70 font-medium uppercase tracking-wide">Proyección a los 65 años</p>
          <p className="text-3xl font-bold font-mono-nums mt-1">{fmtCompact(projection)}</p>
          <p className="text-xs text-white/60 mt-1">
            Ahorrando ~{fmt(monthlySavable! * 0.2)}/mes · {RISK_RETURNS[profile.risk_tolerance as RiskLevel]}% anual
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>{profile.age} años</span>
              <span>65 años</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-pill overflow-hidden">
              <div
                className="h-full bg-primary-400 rounded-pill"
                style={{ width: `${Math.min(100, ((profile.age - 18) / (65 - 18)) * 100)}%` }}
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-neutral-200 text-center flex flex-col items-center gap-3 py-6">
          <span className="text-3xl">📋</span>
          <div>
            <p className="font-semibold text-neutral-700">Completa tu perfil</p>
            <p className="text-xs text-neutral-500 mt-1">Para ver tu proyección financiera personalizada</p>
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center font-semibold rounded-pill transition-all active:scale-95 px-4 py-2 text-sm bg-primary-100 hover:bg-primary-200 text-primary-700"
          >
            Completar ahora
          </Link>
        </Card>
      )}

      {/* Acciones rápidas */}
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Acciones rápidas</p>
        <div className="grid grid-cols-3 gap-3">
          {QUICK_ACTIONS.map(({ href, icon: Icon, label, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 bg-surface rounded-card shadow-card border border-neutral-100 hover:shadow-card-md transition-all active:scale-95"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-semibold text-neutral-700">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Distribución sugerida */}
      {profile && monthlySavable && monthlySavable > 0 && (
        <Card>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Distribución sugerida del mes
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Fondo de emergencia", pct: 20, color: "rgb(var(--color-primary-500))" },
              { label: "Inversión",            pct: 15, color: "rgb(var(--color-brand-500))"   },
              { label: "Gastos variables",     pct: 65, color: "rgb(var(--color-neutral-300))" },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-neutral-600">{label}</span>
                  <span className="text-xs font-mono-nums font-medium text-neutral-700">
                    {fmt(monthlySavable * (pct / 100))}
                  </span>
                </div>
                <ProgressBar value={pct} color={color} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Consejo del día */}
      <Card padding="md" className="flex gap-3 items-start">
        <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
          <TipIcon size={16} className="text-accent-500" />
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Dato del día</p>
          <p className="text-sm text-neutral-700">{tip.text}</p>
        </div>
      </Card>

      {/* Ir a aprender */}
      <Link
        href="/education"
        className="flex items-center justify-between p-4 bg-primary-500 rounded-card text-white shadow-card-md active:scale-95 transition-all"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={20} />
          <div>
            <p className="font-semibold text-sm">Continúa aprendiendo</p>
            <p className="text-xs text-white/70">5 lecciones disponibles</p>
          </div>
        </div>
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}
