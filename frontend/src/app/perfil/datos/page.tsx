"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, Wallet, PiggyBank, BarChart3, GraduationCap, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

export default function FinancialDataPage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)] relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm" style={{ maxWidth: "480px" }}>
        <div className="flex justify-between items-center px-6 py-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-[var(--solvy-primary)] active:scale-95 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-[19px] text-[var(--solvy-text)]">Datos Financieros</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 active:scale-95 transition-transform">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 pt-24 pb-32 space-y-8">
        {/* Section: Your Profile */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-extrabold text-[var(--solvy-text)]">Tu perfil actual</h2>
            <div className="bg-emerald-100/50 p-2 rounded-xl text-[var(--solvy-primary)]">
              <BarChart3 size={24} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Monthly Income Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <Wallet size={24} className="text-[var(--solvy-primary)]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Ingreso mensual</p>
                  <p className="text-3xl font-extrabold text-[var(--solvy-text)]">S/ 1,500</p>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[var(--solvy-primary)] h-full rounded-full w-[100%] shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--solvy-primary)] font-bold text-sm">
                  <TrendingUp size={16} />
                  <span>Perfil Estable</span>
                </div>
              </div>
            </div>

            {/* Monthly Savings Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                  <PiggyBank size={24} className="text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Ahorro mensual</p>
                  <p className="text-3xl font-extrabold text-[var(--solvy-text)]">S/ 200</p>
                </div>
                <div className="flex w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[85%]"></div>
                  <div className="bg-blue-500 h-full w-[15%]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>13.3% de tus ingresos</span>
                </div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Riesgo</p>
                  <p className="text-sm font-bold text-[var(--solvy-text)]">Moderado</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Nivel</p>
                  <p className="text-sm font-bold text-[var(--solvy-text)]">Principiante</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Card */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Seguridad bancaria</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tus datos están protegidos con encriptación de 256 bits para tu total tranquilidad.
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <ShieldCheck size={140} />
          </div>
        </section>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 w-full max-w-[480px] p-6 bg-gradient-to-t from-[var(--solvy-bg)] via-[var(--solvy-bg)] to-transparent z-50 pb-8">
        <button className="w-full bg-[var(--solvy-primary)] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          Actualizar datos
        </button>
      </footer>
    </div>
  );
}
