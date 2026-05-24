"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Smartphone, Cake, Lock } from "lucide-react";

export default function PersonalInfoPage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="bg-white fixed top-0 w-full z-50 flex items-center justify-between px-4 h-16 border-b border-gray-100 shadow-sm" style={{ maxWidth: "480px" }}>
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center p-2 text-[var(--solvy-primary)] hover:bg-gray-50 rounded-full transition-colors active:scale-95 duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg tracking-tight text-[var(--solvy-text)]">Información Personal</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 pt-20 pb-24 px-6 space-y-8 overflow-y-auto">
        {/* Avatar Section */}
        <section className="flex flex-col items-center gap-4 py-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Laura García" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-[var(--solvy-text)]">Laura García</h2>
            <p className="text-xs font-bold text-[var(--solvy-primary)] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
              Premium Member
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="space-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest ml-1">Nombre Completo</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="Laura García"
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-[var(--solvy-primary)] focus:ring-0 text-[15px] font-bold text-[var(--solvy-text)] transition-all outline-none"
              />
              <User size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest ml-1">Correo Electrónico</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="laura.garcia@gmail.com"
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-[var(--solvy-primary)] focus:ring-0 text-[15px] font-bold text-[var(--solvy-text)] transition-all outline-none"
              />
              <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest ml-1">Número de teléfono</label>
            <div className="relative">
              <input 
                type="tel" 
                defaultValue="+34 612 345 678"
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-[var(--solvy-primary)] focus:ring-0 text-[15px] font-bold text-[var(--solvy-text)] transition-all outline-none"
              />
              <Smartphone size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          </div>

          {/* Age */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest ml-1">Edad</label>
            <div className="relative">
              <input 
                type="number" 
                defaultValue="28"
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-[var(--solvy-primary)] focus:ring-0 text-[15px] font-bold text-[var(--solvy-text)] transition-all outline-none"
              />
              <Cake size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          </div>
        </section>

        {/* Info Card */}
        <section className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex gap-4 items-start">
          <div className="text-[var(--solvy-primary)] mt-1 shrink-0">
            <Lock size={18} fill="currentColor" />
          </div>
          <p className="text-xs font-medium text-emerald-800 leading-relaxed">
            Tus datos están protegidos por encriptación de grado bancario Solvy. No compartimos tu información personal con terceros.
          </p>
        </section>
      </main>

      {/* Save Button */}
      <footer className="fixed bottom-0 w-full max-w-[480px] px-6 py-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50">
        <button 
          onClick={() => router.back()}
          className="w-full h-14 bg-[var(--solvy-primary)] text-white font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center"
        >
          Guardar cambios
        </button>
      </footer>
    </div>
  );
}
