"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/layout/top-bar";
import { Card } from "@/components/ui/card";
import { Btn } from "@/components/ui/btn";
import { Field } from "@/components/ui/field";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { fmt } from "@/lib/utils/format";
import type { Goal } from "@/types";

const schema = z.object({
  name:          z.string().min(1, "Ingresa un nombre"),
  target_amount: z.coerce.number().min(1, "Ingresa el monto objetivo"),
  color:         z.string(),
});

type FormData = z.infer<typeof schema>;

const PRESET_COLORS = [
  "#34BD78", "#1E9EB3", "#6366F1", "#F59E0B",
  "#EC4899", "#3B82F6", "#14B8A6", "#F97316",
];

export function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [contribution, setContribution] = useState("");

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { color: PRESET_COLORS[0] },
  });

  const selectedColor = watch("color");

  const createGoal = (data: FormData) => {
    const goal: Goal = {
      id:             crypto.randomUUID(),
      name:           data.name,
      target_amount:  data.target_amount,
      current_amount: 0,
      color:          data.color,
    };
    setGoals((g) => [goal, ...g]);
    reset({ color: PRESET_COLORS[0] });
    setShowForm(false);
  };

  const addContribution = (goalId: string) => {
    const amount = Number(contribution);
    if (!amount || amount <= 0) return;
    setGoals((gs) =>
      gs.map((g) => g.id === goalId
        ? { ...g, current_amount: Math.min(g.target_amount, g.current_amount + amount) }
        : g
      )
    );
    setAddingTo(null);
    setContribution("");
  };

  const deleteGoal = (id: string) =>
    setGoals((gs) => gs.filter((g) => g.id !== id));

  return (
    <>
      <TopBar
        title="Mis metas"
        subtitle="Seguimiento de objetivos financieros"
        action={
          <Btn size="sm" variant="secondary" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Nueva
          </Btn>
        }
      />

      <div className="px-5 pt-4 flex flex-col gap-4">
        {/* Formulario nueva meta */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-neutral-800">Nueva meta</p>
                  <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-600">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(createGoal)} className="flex flex-col gap-4">
                  <Field label="Nombre de la meta" placeholder="Ej: Casa propia" error={errors.name?.message} {...register("name")} />
                  <Field label="Monto objetivo (S/)" type="number" inputMode="numeric" placeholder="10000" error={errors.target_amount?.message} {...register("target_amount")} />

                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">Color</p>
                    <div className="flex gap-2 flex-wrap">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setValue("color", c)}
                          className={`w-7 h-7 rounded-full transition-all ${selectedColor === c ? "ring-2 ring-offset-2 ring-neutral-400 scale-110" : ""}`}
                          style={{ backgroundColor: c }}
                          aria-label={c}
                        />
                      ))}
                    </div>
                  </div>

                  <Btn type="submit" className="w-full">Crear meta</Btn>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de metas */}
        {goals.length === 0 && !showForm ? (
          <EmptyState
            icon="🎯"
            title="Sin metas aún"
            description="Crea tu primera meta financiera para empezar a seguir tu progreso"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {goals.map((goal) => {
              const pct = Math.round((goal.current_amount / goal.target_amount) * 100);
              return (
                <Card key={goal.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: goal.color }} />
                      <p className="font-semibold text-neutral-800">{goal.name}</p>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-neutral-300 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-500">Acumulado</span>
                    <span className="font-mono-nums font-semibold text-neutral-700">
                      {fmt(goal.current_amount)} / {fmt(goal.target_amount)}
                    </span>
                  </div>

                  <ProgressBar value={goal.current_amount} max={goal.target_amount} color={goal.color} showLabel />

                  {pct >= 100 ? (
                    <div className="mt-3 bg-primary-50 rounded-xl p-3 text-center">
                      <span className="text-sm font-semibold text-primary-600">🎉 ¡Meta alcanzada!</span>
                    </div>
                  ) : addingTo === goal.id ? (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="Monto S/"
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)}
                        className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                      <Btn size="sm" onClick={() => addContribution(goal.id)}>Agregar</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setAddingTo(null)}><X size={14} /></Btn>
                    </div>
                  ) : (
                    <Btn
                      variant="secondary"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => setAddingTo(goal.id)}
                    >
                      <Plus size={14} /> Agregar aporte
                    </Btn>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
