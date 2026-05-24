import Link from "next/link";
import { Calendar, Wallet, TrendingUp } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="mobile-container flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden min-h-dvh">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--solvy-primary)] rounded-full opacity-[0.06] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--solvy-indigo)] rounded-full opacity-[0.06] blur-3xl pointer-events-none" />

      <main className="w-full flex flex-col items-center justify-center gap-12 z-10">
        {/* Branding */}
        <header className="flex flex-col items-center mt-8 animate-fade-in-up">
          <div className="w-20 h-20 rounded-2xl bg-[var(--solvy-primary)] flex items-center justify-center mb-10 shadow-lg">
            <span className="text-white font-extrabold text-3xl">S</span>
          </div>
          <div className="text-center space-y-4 px-2">
            <h1 className="text-3xl font-extrabold leading-tight text-[var(--solvy-text)]">
              Tu futuro empieza hoy
            </h1>
            <p className="text-base text-[var(--solvy-text-secondary)] font-medium leading-relaxed max-w-[300px] mx-auto">
              Aprende a ahorrar, simula tu crecimiento y construye tu patrimonio
              paso a paso desde montos accesibles.
            </p>
          </div>
        </header>

        {/* Metrics Card */}
        <div className="card w-full animate-fade-in-up delay-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--solvy-primary)] to-[var(--solvy-primary-light)] rounded-t-xl" />
          <div className="flex flex-col gap-6">
            {[
              { icon: Calendar, value: "18–30", label: "AÑOS" },
              { icon: Wallet, value: "S/50", label: "PARA EMPEZAR" },
              { icon: TrendingUp, value: "7%", label: "RETORNO EST." },
            ].map((metric, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[var(--solvy-bg)] flex items-center justify-center shrink-0">
                  <metric.icon size={22} className="text-[var(--solvy-primary)]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-extrabold text-[var(--solvy-text)] leading-none mb-1">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--solvy-text-secondary)]">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 animate-fade-in-up delay-3">
          <Link href="/registro" className="btn-primary">
            Empezar gratis
          </Link>
          <Link href="/login" className="btn-secondary">
            Ya tengo una cuenta
          </Link>
        </div>
      </main>
    </div>
  );
}
