"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authService.register({ fullName: name, email, password });
      router.push("/onboarding/edad");
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
    }
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="flex items-center px-6 h-16 w-full">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-[var(--solvy-primary-container)] transition-colors active:scale-95"
        >
          <ArrowLeft size={22} color="var(--solvy-text)" />
        </Link>
      </header>

      <main className="flex-1 px-6 flex flex-col gap-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center text-center space-y-4 animate-fade-in-up">
          <div className="w-28 h-28 rounded-2xl bg-[var(--solvy-primary)] flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-extrabold text-4xl">S</span>
          </div>
          <h1 className="text-[1.75rem] font-extrabold leading-tight text-[var(--solvy-text)]">
            Crea tu cuenta
          </h1>
          <p className="text-base text-[var(--solvy-text-secondary)]">
            Empieza a construir tu futuro.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in-up delay-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          <div className="input-card">
            <div className="icon-container">
              <User size={18} />
            </div>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-card">
            <div className="icon-container">
              <Mail size={18} />
            </div>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-card">
            <div className="icon-container">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 mt-2 px-2 animate-fade-in-up delay-2">
            <Shield size={16} className="text-[var(--solvy-text-muted)] mt-0.5 shrink-0" />
            <p className="text-xs text-[var(--solvy-text-secondary)] leading-relaxed">
              Tus datos están protegidos con encriptación de grado bancario.
            </p>
          </div>

          <button type="submit" className="btn-primary mt-4 animate-fade-in-up delay-3">
            Crear cuenta
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 mb-8 text-center animate-fade-in delay-4">
          <Link
            href="/login"
            className="text-sm text-[var(--solvy-text-secondary)] hover:text-[var(--solvy-primary)] transition-colors"
          >
            ¿Ya tienes cuenta?{" "}
            <span className="font-bold text-[var(--solvy-text)]">Inicia sesión</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
