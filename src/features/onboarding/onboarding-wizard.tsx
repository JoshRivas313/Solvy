"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Btn } from "@/components/ui/btn";
import { ProgressBar } from "@/components/ui/progress-bar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";
import type { KnowledgeLevel, RiskLevel } from "@/types";

const schema = z.object({
  age:               z.coerce.number().min(16, "Debes tener al menos 16 años").max(80),
  monthly_income:    z.coerce.number().min(1, "Ingresa tus ingresos mensuales"),
  monthly_expenses:  z.coerce.number().min(0),
  current_savings:   z.coerce.number().min(0),
  monthly_debt:      z.coerce.number().min(0),
  knowledge_level:   z.enum(["none", "basic", "intermediate", "advanced"]),
  risk_tolerance:    z.enum(["low", "medium", "high"]),
  investment_goal:   z.string().min(1, "Selecciona un objetivo"),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { title: "¿Cuántos años tienes?",        subtitle: "Esto nos ayuda a calcular tu horizonte de inversión" },
  { title: "Tu situación financiera",       subtitle: "Todo queda privado y seguro en tu cuenta" },
  { title: "¿Cuánto sabes de inversiones?", subtitle: "Sin juicios — esto es para personalizar tu ruta" },
  { title: "Tu tolerancia al riesgo",       subtitle: "¿Cómo reaccionas ante la incertidumbre?" },
  { title: "¿Cuál es tu meta principal?",   subtitle: "Puedes cambiarla después" },
];

const KNOWLEDGE_OPTIONS: { value: KnowledgeLevel; label: string; desc: string }[] = [
  { value: "none",         label: "Cero experiencia",    desc: "Nunca he invertido ni estudiado el tema" },
  { value: "basic",        label: "Algo básico",          desc: "Conozco algunos conceptos pero no he invertido" },
  { value: "intermediate", label: "Intermedio",           desc: "He invertido alguna vez y entiendo los riesgos" },
  { value: "advanced",     label: "Avanzado",             desc: "Tengo portafolio activo y experiencia real" },
];

const RISK_OPTIONS: { value: RiskLevel; label: string; desc: string; emoji: string }[] = [
  { value: "low",    label: "Conservador",  desc: "Prefiero estabilidad aunque gane menos",          emoji: "🛡️" },
  { value: "medium", label: "Moderado",     desc: "Acepto cierta variación por mejor rendimiento",   emoji: "⚖️" },
  { value: "high",   label: "Agresivo",     desc: "Tolero pérdidas temporales por más crecimiento",  emoji: "🚀" },
];

const GOAL_OPTIONS = [
  { value: "retirement",  label: "Jubilarme tranquilo",      emoji: "🌅" },
  { value: "house",       label: "Comprar una casa",          emoji: "🏠" },
  { value: "emergency",   label: "Fondo de emergencia",       emoji: "🛡️" },
  { value: "freedom",     label: "Libertad financiera",       emoji: "🦅" },
  { value: "education",   label: "Educación o estudio",       emoji: "📚" },
  { value: "business",    label: "Emprender un negocio",      emoji: "💼" },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthly_debt:    0,
      monthly_expenses: 0,
      current_savings:  0,
      knowledge_level: "none",
      risk_tolerance:  "medium",
      investment_goal: "",
    },
  });

  const knowledge = watch("knowledge_level");
  const risk      = watch("risk_tolerance");
  const goal      = watch("investment_goal");

  const stepFields: (keyof FormData)[][] = [
    ["age"],
    ["monthly_income", "monthly_expenses", "current_savings", "monthly_debt"],
    ["knowledge_level"],
    ["risk_tolerance"],
    ["investment_goal"],
  ];

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("financial_profiles").upsert({
        user_id: user.id,
        ...data,
      });

      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col px-5 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="font-bold text-brand-900">Solvy</span>
        <span className="ml-auto text-xs text-neutral-500">{step + 1} / {STEPS.length}</span>
      </div>

      <ProgressBar value={step + 1} max={STEPS.length} className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-neutral-900">{STEPS[step].title}</h2>
              <p className="text-sm text-neutral-500 mt-1">{STEPS[step].subtitle}</p>
            </div>

            {/* Paso 1 — Edad */}
            {step === 0 && (
              <Field
                label="Edad"
                type="number"
                inputMode="numeric"
                placeholder="25"
                error={errors.age?.message}
                {...register("age")}
              />
            )}

            {/* Paso 2 — Finanzas */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <Field label="Ingresos mensuales (S/)" type="number" inputMode="numeric" placeholder="2000"
                  error={errors.monthly_income?.message} {...register("monthly_income")} />
                <Field label="Gastos mensuales (S/)" type="number" inputMode="numeric" placeholder="1200"
                  error={errors.monthly_expenses?.message} {...register("monthly_expenses")} />
                <Field label="Ahorros actuales (S/)" type="number" inputMode="numeric" placeholder="500"
                  error={errors.current_savings?.message} {...register("current_savings")} />
                <Field label="Deudas mensuales (S/)" type="number" inputMode="numeric" placeholder="0"
                  error={errors.monthly_debt?.message} {...register("monthly_debt")} />
              </div>
            )}

            {/* Paso 3 — Conocimiento */}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                {KNOWLEDGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue("knowledge_level", opt.value)}
                    className={cn(
                      "text-left p-4 rounded-card border-2 transition-all",
                      knowledge === opt.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 bg-surface hover:border-neutral-300"
                    )}
                  >
                    <p className={cn("font-semibold text-sm", knowledge === opt.value ? "text-primary-700" : "text-neutral-800")}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Paso 4 — Riesgo */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                {RISK_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue("risk_tolerance", opt.value)}
                    className={cn(
                      "text-left p-4 rounded-card border-2 transition-all flex gap-3 items-start",
                      risk === opt.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 bg-surface hover:border-neutral-300"
                    )}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <p className={cn("font-semibold text-sm", risk === opt.value ? "text-primary-700" : "text-neutral-800")}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Paso 5 — Objetivo */}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue("investment_goal", opt.value)}
                    className={cn(
                      "p-4 rounded-card border-2 transition-all flex flex-col items-center gap-2 text-center",
                      goal === opt.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 bg-surface hover:border-neutral-300"
                    )}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <p className={cn("text-xs font-semibold", goal === opt.value ? "text-primary-700" : "text-neutral-700")}>
                      {opt.label}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Btn type="button" variant="ghost" onClick={() => setStep((s) => s - 1)} className="flex-1">
              Atrás
            </Btn>
          )}
          {step < STEPS.length - 1 ? (
            <Btn type="button" onClick={next} className="flex-1" size="lg">
              Continuar <ChevronRight size={18} />
            </Btn>
          ) : (
            <Btn type="submit" loading={saving} className="flex-1" size="lg">
              Ver mi plan
            </Btn>
          )}
        </div>
      </form>
    </div>
  );
}
