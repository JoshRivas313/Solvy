"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, X, ChevronRight, ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Btn } from "@/components/ui/btn";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LESSONS, CAT_META } from "@/lib/data/lessons";
import { cn } from "@/lib/utils/cn";
import type { Lesson, LessonCategory } from "@/types";

const ALL_CATS = ["all", ...Object.keys(CAT_META)] as const;

type QuizState = "idle" | "answered" | "passed";

interface LessonProgress {
  [id: string]: { completed: boolean; quizPassed: boolean };
}

export function EducationView() {
  const [filter, setFilter]           = useState<string>("all");
  const [active, setActive]           = useState<Lesson | null>(null);
  const [quizStep, setQuizStep]       = useState<QuizState>("idle");
  const [selected, setSelected]       = useState<number | null>(null);
  const [progress, setProgress]       = useState<LessonProgress>({});

  const filtered = filter === "all"
    ? LESSONS
    : LESSONS.filter((l) => l.category === filter);

  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  const openLesson = (lesson: Lesson) => {
    setActive(lesson);
    setQuizStep("idle");
    setSelected(null);
  };

  const closeLesson = () => setActive(null);

  const selectAnswer = (idx: number) => {
    if (quizStep !== "idle") return;
    setSelected(idx);
    setQuizStep("answered");
    const correct = active!.quiz.options[idx].correct;
    if (correct) {
      setProgress((p) => ({
        ...p,
        [active!.id]: { completed: true, quizPassed: true },
      }));
    }
  };

  const finishLesson = () => {
    setProgress((p) => ({
      ...p,
      [active!.id]: { ...(p[active!.id] ?? { quizPassed: false }), completed: true },
    }));
    setActive(null);
  };

  return (
    <>
      {!active ? (
        <>
          <TopBar title="Aprender" subtitle="Educación financiera paso a paso" />

          <div className="px-5 pt-4 flex flex-col gap-5">
            {/* Progreso general */}
            <Card>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-700">Tu progreso</span>
                <span className="text-sm font-semibold text-primary-600">{completedCount}/{LESSONS.length}</span>
              </div>
              <ProgressBar value={completedCount} max={LESSONS.length} showLabel />
            </Card>

            {/* Filtros por categoría */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {ALL_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "shrink-0 px-3 py-1.5 rounded-pill text-xs font-semibold transition-all",
                    filter === cat
                      ? "bg-primary-500 text-white shadow-card"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {cat === "all" ? "Todas" : CAT_META[cat as LessonCategory]?.label}
                </button>
              ))}
            </div>

            {/* Lista de lecciones */}
            <div className="flex flex-col gap-3">
              {filtered.map((lesson) => {
                const done = progress[lesson.id]?.completed;
                const meta = CAT_META[lesson.category];
                return (
                  <button
                    key={lesson.id}
                    onClick={() => openLesson(lesson)}
                    className="text-left"
                  >
                    <Card className="flex gap-4 items-center hover:shadow-card-md transition-all active:scale-[0.98]">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ backgroundColor: `${meta?.color}18` }}
                      >
                        {lesson.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-neutral-900 leading-tight">{lesson.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge label={meta?.label ?? lesson.category} color={meta?.color} />
                          <span className="flex items-center gap-1 text-xs text-neutral-400">
                            <Clock size={11} />
                            {lesson.duration} min
                          </span>
                        </div>
                      </div>
                      {done
                        ? <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                            <Check size={13} className="text-primary-600" />
                          </div>
                        : <ChevronRight size={18} className="text-neutral-300 shrink-0" />
                      }
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* ── Detalle de lección ── */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="flex flex-col min-h-dvh"
          >
            <TopBar
              title={active.title}
              showBack
              action={
                <button onClick={closeLesson} className="p-1.5 rounded-xl hover:bg-neutral-100 transition-colors">
                  <X size={18} className="text-neutral-500" />
                </button>
              }
            />

            <div className="px-5 pt-4 pb-8 flex flex-col gap-5">
              {/* Contenido */}
              {active.content.map((block, i) => (
                <div key={i}>
                  {block.type === "text" ? (
                    <p className="text-sm text-neutral-700 leading-relaxed">{block.text}</p>
                  ) : (
                    <div className="bg-primary-50 border-l-4 border-primary-400 rounded-r-xl p-4">
                      <p className="text-sm text-primary-800 font-medium leading-relaxed">{block.text}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Quiz */}
              {quizStep === "idle" && (
                <Card>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Quiz rápido</p>
                  <p className="text-sm font-semibold text-neutral-800 mb-4">{active.quiz.question}</p>
                  <div className="flex flex-col gap-2">
                    {active.quiz.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => selectAnswer(i)}
                        className="text-left p-3 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 text-sm text-neutral-700 transition-all"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {quizStep === "answered" && selected !== null && (
                <Card>
                  <div className={cn(
                    "flex items-center gap-2 mb-3",
                    active.quiz.options[selected].correct ? "text-primary-600" : "text-red-500"
                  )}>
                    {active.quiz.options[selected].correct
                      ? <><Check size={18} /><span className="font-semibold text-sm">¡Correcto!</span></>
                      : <><X size={18} /><span className="font-semibold text-sm">No del todo…</span></>
                    }
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{active.quiz.explanation}</p>
                  <Btn onClick={finishLesson} className="w-full">
                    Terminar lección
                  </Btn>
                </Card>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
