"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import {
  User,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  FileText,
  CreditCard,
  History,
  CheckCircle2,
  Edit2
} from "lucide-react";

export default function PerfilPage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar showLogo showNotification />

      <main className="flex-1 pt-24 pb-28 px-6 flex flex-col gap-8">
        {/* Profile Header */}
        <section className="flex flex-col items-center gap-4 animate-fade-in-up">
          <div className="relative">
            <div className="w-28 h-28 rounded-[32px] overflow-hidden shadow-lg border-4 border-white bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Laura García" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[var(--solvy-primary)] text-white p-2 rounded-full shadow-md active:scale-90 transition-transform">
              <Edit2 size={16} />
            </button>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-[var(--solvy-text)] tracking-tight">Laura García</h2>
            <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 gap-1.5">
              <CheckCircle2 size={14} fill="currentColor" className="text-emerald-500" />
              Premium Member
            </div>
          </div>
        </section>

        {/* Menu Sections */}
        <div className="flex flex-col gap-6 animate-fade-in-up delay-1">
          {/* Section: Cuenta */}
          <section className="space-y-3">
            <h3 className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest px-1">Cuenta</h3>
            <div className="bg-white rounded-[24px] shadow-sm border border-[var(--solvy-border-light)] overflow-hidden">
              <Link href="/perfil/info" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                    <User size={20} />
                  </div>
                  <span className="font-bold text-[15px] text-[var(--solvy-text)]">Información Personal</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--solvy-primary)] transition-colors" />
              </Link>

              <Link href="/perfil/historial" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                    <History size={20} />
                  </div>
                  <span className="font-bold text-[15px] text-[var(--solvy-text)]">Historial de Aportes</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--solvy-primary)] transition-colors" />
              </Link>

              <Link href="/perfil/datos" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                    <CreditCard size={20} />
                  </div>
                  <span className="font-bold text-[15px] text-[var(--solvy-text)]">Datos Financieros</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--solvy-primary)] transition-colors" />
              </Link>
            </div>
          </section>

          {/* Section: Soporte */}
          <section className="space-y-3">
            <h3 className="text-xs font-black text-[var(--solvy-text-muted)] uppercase tracking-widest px-1">Soporte</h3>
            <div className="bg-white rounded-[24px] shadow-sm border border-[var(--solvy-border-light)] overflow-hidden">
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                    <HelpCircle size={20} />
                  </div>
                  <span className="font-bold text-[15px] text-[var(--solvy-text)]">Centro de Ayuda</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--solvy-primary)] transition-colors" />
              </Link>

              <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--solvy-primary-container)] flex items-center justify-center text-[var(--solvy-primary)]">
                    <FileText size={20} />
                  </div>
                  <span className="font-bold text-[15px] text-[var(--solvy-text)]">Términos y Condiciones</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--solvy-primary)] transition-colors" />
              </Link>
            </div>
          </section>
        </div>

        {/* Logout Action */}
        <section className="mt-4 animate-fade-in-up delay-2">
          <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-[var(--solvy-error)]/20 text-[var(--solvy-error)] hover:bg-[var(--solvy-error-container)] transition-all active:scale-95 font-bold text-[15px]">
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
