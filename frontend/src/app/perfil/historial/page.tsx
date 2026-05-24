"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Filter, TrendingUp, ArrowUpCircle, ChevronRight } from "lucide-react";

const transactions = [
  { id: 1, title: "Aporte 01", date: "12 Oct 2023", amount: "+ S/ 100", status: "Completado" },
  { id: 2, title: "Aporte 02", date: "05 Oct 2023", amount: "+ S/ 250", status: "Completado" },
  { id: 3, title: "Aporte 03", date: "28 Sep 2023", amount: "+ S/ 1,200", status: "Completado" },
  { id: 4, title: "Aporte 04", date: "15 Sep 2023", amount: "+ S/ 50", status: "Completado" },
];

export default function HistorialAportesPage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-50 flex items-center justify-between px-4 h-16 border-b border-slate-100" style={{ maxWidth: "480px" }}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center p-2 text-[var(--solvy-primary)] hover:bg-slate-50 rounded-full transition-colors active:scale-95 duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg tracking-tight text-[var(--solvy-text)]">Historial de Aportes</h1>
        </div>
        <button className="flex items-center justify-center p-2 text-[var(--solvy-primary)] hover:bg-slate-50 rounded-full transition-colors">
          <Filter size={24} />
        </button>
      </header>

      <main className="flex-1 px-6 pt-6 pb-28 space-y-8">
        {/* Summary Card */}
        <section>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total aportado</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--solvy-text)]">S/</span>
              <span className="text-5xl font-black text-[var(--solvy-text)] tracking-tighter">6,500</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[var(--solvy-primary)] font-bold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
              <TrendingUp size={16} />
              <span>+12% este mes</span>
            </div>
          </div>
        </section>

        {/* Transaction List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-extrabold text-[var(--solvy-text)]">Transacciones</h2>
            <button className="text-sm font-bold text-[var(--solvy-primary)] hover:underline">Filtrar</button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="group bg-white rounded-2xl p-4 flex items-center gap-4 border border-transparent hover:border-slate-100 transition-all active:scale-[0.98] shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[var(--solvy-primary)] shrink-0">
                  <ArrowUpCircle size={24} fill="currentColor" className="text-emerald-500/20" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--solvy-text)]">{tx.title}</h3>
                  <p className="text-xs font-medium text-slate-400">{tx.date}</p>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-black text-[var(--solvy-primary)]">{tx.amount}</p>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-[var(--solvy-primary)] border border-emerald-100">
                    {tx.status}
                  </span>
                </div>
                
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
