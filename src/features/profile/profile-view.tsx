"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ChevronRight, Edit2, Shield, Bell, HelpCircle, FileText } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Card } from "@/components/ui/card";
import { Btn } from "@/components/ui/btn";
import { Badge } from "@/components/ui/badge";
import { fmt } from "@/lib/utils/format";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { RiskLevel, KnowledgeLevel } from "@/types";

type Profile = Database["public"]["Tables"]["financial_profiles"]["Row"] | null;

const RISK_LABELS: Record<RiskLevel, { label: string; color: string }> = {
  low:    { label: "Conservador", color: "#34BD78" },
  medium: { label: "Moderado",    color: "#1E9EB3" },
  high:   { label: "Agresivo",    color: "#EC4899" },
};

const KNOWLEDGE_LABELS: Record<KnowledgeLevel, string> = {
  none:         "Sin experiencia",
  basic:        "Básico",
  intermediate: "Intermedio",
  advanced:     "Avanzado",
};

const MENU_ITEMS = [
  { icon: Shield,    label: "Privacidad y seguridad",  href: "#" },
  { icon: Bell,      label: "Notificaciones",           href: "#" },
  { icon: HelpCircle, label: "Ayuda y soporte",         href: "#" },
  { icon: FileText,  label: "Términos y condiciones",   href: "#" },
];

interface ProfileViewProps {
  user: User;
  profile: Profile;
}

export function ProfileView({ user, profile }: ProfileViewProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const name = (user.user_metadata?.full_name as string | undefined) ?? "Usuario";
  const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const risk = profile?.risk_tolerance as RiskLevel | undefined;
  const knowledge = profile?.knowledge_level as KnowledgeLevel | undefined;

  return (
    <>
      <TopBar title="Mi perfil" />

      <div className="px-5 pt-4 flex flex-col gap-5 pb-6">
        {/* Avatar y nombre */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-card-md">
            <span className="text-white font-bold text-2xl">{initials}</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-neutral-900">{name}</p>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
          {profile && (
            <div className="flex gap-2">
              {risk && (
                <Badge
                  label={RISK_LABELS[risk].label}
                  color={RISK_LABELS[risk].color}
                />
              )}
              {knowledge && (
                <Badge label={KNOWLEDGE_LABELS[knowledge]} />
              )}
            </div>
          )}
        </div>

        {/* Datos financieros */}
        {profile ? (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Situación financiera</p>
              <button
                onClick={() => router.push("/onboarding")}
                className="flex items-center gap-1 text-xs text-primary-600 font-semibold"
              >
                <Edit2 size={12} /> Editar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Ingresos",   value: fmt(profile.monthly_income)  },
                { label: "Gastos",     value: fmt(profile.monthly_expenses) },
                { label: "Ahorros",    value: fmt(profile.current_savings)  },
                { label: "Deudas/mes", value: fmt(profile.monthly_debt)     },
              ].map(({ label, value }) => (
                <div key={label} className="bg-neutral-50 rounded-xl p-3">
                  <p className="text-xs text-neutral-500">{label}</p>
                  <p className="font-semibold font-mono-nums text-neutral-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="border-dashed border-2 border-neutral-200 text-center py-6 flex flex-col items-center gap-3">
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-semibold text-neutral-700">Sin perfil financiero</p>
              <p className="text-xs text-neutral-500 mt-1">Completa el onboarding para ver tus datos</p>
            </div>
            <Btn size="sm" variant="secondary" onClick={() => router.push("/onboarding")}>
              Completar perfil
            </Btn>
          </Card>
        )}

        {/* Menú de opciones */}
        <Card padding="none">
          {MENU_ITEMS.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50 transition-colors ${
                i < MENU_ITEMS.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center">
                <Icon size={15} className="text-neutral-600" />
              </div>
              <span className="text-sm font-medium text-neutral-700 flex-1 text-left">{label}</span>
              <ChevronRight size={16} className="text-neutral-300" />
            </button>
          ))}
        </Card>

        {/* Cerrar sesión */}
        <Btn
          variant="danger"
          className="w-full"
          loading={loggingOut}
          onClick={handleLogout}
        >
          <LogOut size={16} /> Cerrar sesión
        </Btn>

        <p className="text-center text-xs text-neutral-400">Solvy MVP · v1.0</p>
      </div>
    </>
  );
}
