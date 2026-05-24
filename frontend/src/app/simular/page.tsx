"use client";

import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { RefreshCw, Info } from "lucide-react";

export default function SimuladorPage() {
  const [aporte, setAporte] = useState(200);
  const [edadActual, setEdadActual] = useState(25);
  const [edadRetiro, setEdadRetiro] = useState(65);

  const tasa = 0.07; // 7% anual

  const resultado = useMemo(() => {
    const años = edadRetiro - edadActual;
    if (años <= 0) return { total: 0, aportado: 0, ganancia: 0 };

    const meses = años * 12;
    const tasaMensual = tasa / 12;

    // Fórmula de anualidad de valor futuro
    const total = aporte * ((Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual);
    const aportado = aporte * meses;
    const ganancia = total - aportado;

    return { total, aportado, ganancia };
  }, [aporte, edadActual, edadRetiro]);

  const formatMoney = (n: number) => {
    if (n >= 1_000_000) return `S/ ${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `S/ ${Math.round(n / 1_000)}k`;
    return `S/ ${Math.round(n)}`;
  };

  const años = edadRetiro - edadActual;

  // Points for the chart
  const chartPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const totalYears = edadRetiro - edadActual;
    if (totalYears <= 0) return pts;

    const tasaMensual = tasa / 12;
    let maxVal = 0;

    for (let year = 0; year <= totalYears; year += Math.max(1, Math.floor(totalYears / 20))) {
      const meses = year * 12;
      const val = aporte * ((Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual);
      if (val > maxVal) maxVal = val;
      pts.push({ x: year / totalYears, y: val });
    }

    // Normalize y values
    return pts.map((p) => ({
      x: p.x * 100,
      y: maxVal > 0 ? 100 - (p.y / maxVal) * 85 : 100,
    }));
  }, [aporte, edadActual, edadRetiro]);

  const pathD = chartPoints.length > 1
    ? `M${chartPoints.map((p) => `${p.x},${p.y}`).join(" L")}`
    : "";

  const areaD = pathD
    ? `${pathD} L${chartPoints[chartPoints.length - 1].x},100 L${chartPoints[0].x},100 Z`
    : "";

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar showLogo showNotification />

      <main className="flex-1 pt-20 pb-28 px-5 flex flex-col gap-5">
        {/* Results Card */}
        <section className="card flex flex-col items-center text-center animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--solvy-primary-container)] text-[var(--solvy-primary)] text-xs font-bold mb-4">
            Proyección a {años} años
          </span>

          <p className="text-base text-[var(--solvy-text-secondary)] mb-3">
            Con S/{aporte}/mes llegarías a {formatMoney(resultado.total)}.{" "}
            {resultado.total > 100000 ? "¡Impresionante!" : "¡Un gran comienzo!"}
          </p>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-[var(--solvy-text)] tracking-tight">
              {formatMoney(resultado.total)}
            </span>
            <span className="text-sm text-[var(--solvy-text-muted)] mt-1">
              a los {edadRetiro} años
            </span>
          </div>

          {/* Chart */}
          {chartPoints.length > 1 && (
            <div className="w-full h-40 mt-6 relative">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--solvy-primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--solvy-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#chartGrad)" />
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--solvy-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="flex justify-between text-xs font-semibold text-[var(--solvy-text-muted)] mt-2">
                <span>{edadActual}a</span>
                <span>{Math.round((edadActual + edadRetiro) / 2)}a</span>
                <span>{edadRetiro}a</span>
              </div>
            </div>
          )}
        </section>

        {/* Sliders */}
        <section className="card flex flex-col gap-5 animate-fade-in-up delay-1">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[var(--solvy-text)]">
                Aporte mensual
              </label>
              <span className="text-sm font-bold text-[var(--solvy-primary)]">S/ {aporte}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={aporte}
              onChange={(e) => setAporte(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[var(--solvy-text)]">Edad actual</label>
              <span className="text-sm font-bold text-[var(--solvy-primary)]">
                {edadActual} años
              </span>
            </div>
            <input
              type="range"
              min={18}
              max={60}
              value={edadActual}
              onChange={(e) => setEdadActual(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[var(--solvy-text)]">
                Edad de retiro
              </label>
              <span className="text-sm font-bold text-[var(--solvy-primary)]">
                {edadRetiro} años
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={80}
              value={edadRetiro}
              onChange={(e) => setEdadRetiro(Number(e.target.value))}
            />
          </div>
        </section>

        {/* Disclaimer */}
        <div className="flex gap-3 items-start p-4 rounded-[16px] bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)] animate-fade-in-up delay-2">
          <Info size={18} className="text-[var(--solvy-blue)] shrink-0 mt-0.5" />
          <p className="text-[13px] leading-relaxed text-[var(--solvy-text-secondary)]">
            Simulación educativa. Los retornos reales varían y no están garantizados. Tasa según tu
            perfil de riesgo: 7% anual.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
