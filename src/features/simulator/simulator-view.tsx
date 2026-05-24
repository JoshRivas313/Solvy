"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { TopBar } from "@/components/layout/top-bar";
import { Card } from "@/components/ui/card";
import { fmtCompact, fmt } from "@/lib/utils/format";
import { buildChartData, RISK_RETURNS } from "@/lib/utils/finance";
import type { RiskLevel } from "@/types";

const RISK_LABELS: Record<RiskLevel, string> = {
  low:    "Conservador (5%)",
  medium: "Moderado (7%)",
  high:   "Agresivo (9%)",
};

interface SimulatorViewProps {
  initialContribution?: number;
  initialSavings?: number;
  initialAge?: number;
  initialRisk?: RiskLevel;
}

export function SimulatorView({
  initialContribution = 300,
  initialSavings = 1000,
  initialAge = 25,
  initialRisk = "medium",
}: SimulatorViewProps) {
  const [contribution, setContribution] = useState(initialContribution);
  const [savings,      setSavings]      = useState(initialSavings);
  const [age,          setAge]          = useState(initialAge);
  const [retireAge,    setRetireAge]    = useState(65);
  const [risk,         setRisk]         = useState<RiskLevel>(initialRisk);

  const data = buildChartData(contribution, savings, RISK_RETURNS[risk], age, retireAge);
  const final = data[data.length - 1]?.value ?? 0;
  const years = retireAge - age;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number }[] }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-surface border border-neutral-200 rounded-xl px-3 py-2 shadow-card-md">
        <p className="text-xs font-semibold text-neutral-700">{fmtCompact(payload[0].value)}</p>
      </div>
    );
  };

  return (
    <>
      <TopBar title="Simulador" subtitle="Proyecta tu crecimiento" />

      <div className="flex flex-col gap-5 px-5 pt-4">
        {/* Resultado principal */}
        <Card className="bg-linear-to-br from-brand-900 to-brand-700 text-white border-0">
          <p className="text-xs text-white/70">Proyección a los {retireAge} años</p>
          <p className="text-4xl font-bold font-mono-nums mt-1">{fmtCompact(final)}</p>
          <p className="text-xs text-white/60 mt-1">
            En {years} años · {RISK_LABELS[risk]}
          </p>
        </Card>

        {/* Gráfico */}
        <Card padding="sm">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="rgb(var(--color-primary-500))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="rgb(var(--color-primary-500))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgb(var(--color-neutral-100))" strokeDasharray="3 3" />
              <XAxis dataKey="age" tick={{ fontSize: 10, fill: "rgb(var(--color-neutral-400))" }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v: number) => fmtCompact(v)}
                tick={{ fontSize: 10, fill: "rgb(var(--color-neutral-400))" }}
                tickLine={false}
                axisLine={false}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(var(--color-primary-500))"
                strokeWidth={2}
                fill="url(#grad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Controles */}
        <Card>
          <div className="flex flex-col gap-5">
            {/* Aporte mensual */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Aporte mensual</span>
                <span className="text-sm font-semibold font-mono-nums text-primary-600">{fmt(contribution)}</span>
              </div>
              <input type="range" min={50} max={5000} step={50} value={contribution}
                onChange={(e) => setContribution(Number(e.target.value))}
                className="w-full accent-primary-500" />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-neutral-400">S/50</span>
                <span className="text-[10px] text-neutral-400">S/5,000</span>
              </div>
            </div>

            {/* Ahorros actuales */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Ahorros actuales</span>
                <span className="text-sm font-semibold font-mono-nums text-primary-600">{fmt(savings)}</span>
              </div>
              <input type="range" min={0} max={50000} step={500} value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="w-full accent-primary-500" />
            </div>

            {/* Edad actual */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Edad actual</span>
                <span className="text-sm font-semibold font-mono-nums text-primary-600">{age} años</span>
              </div>
              <input type="range" min={16} max={60} step={1} value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-primary-500" />
            </div>

            {/* Edad de retiro */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Edad de retiro</span>
                <span className="text-sm font-semibold font-mono-nums text-primary-600">{retireAge} años</span>
              </div>
              <input type="range" min={Math.max(age + 5, 40)} max={80} step={1} value={retireAge}
                onChange={(e) => setRetireAge(Number(e.target.value))}
                className="w-full accent-primary-500" />
            </div>

            {/* Perfil de riesgo */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">Perfil de riesgo</p>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "high"] as RiskLevel[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRisk(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      risk === r
                        ? "bg-primary-500 text-white shadow-card"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {r === "low" ? "Conservador" : r === "medium" ? "Moderado" : "Agresivo"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Alerta anti-pánico */}
        <div className="bg-accent-50 border border-accent-200 rounded-card p-4 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="text-xs font-semibold text-accent-600 mb-1">Recuerda siempre</p>
            <p className="text-xs text-neutral-600">
              Las inversiones tienen variaciones temporales. Lo importante es mantener el plan a largo plazo
              y no tomar decisiones por pánico. El tiempo es tu mayor aliado.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
