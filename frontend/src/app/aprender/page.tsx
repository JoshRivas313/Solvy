"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Clock, Play } from "lucide-react";
import { categories, lessons } from "@/data/aprenderData";

export default function AprenderPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? lessons
      : lessons.filter((l) => l.category === activeCategory);

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      <TopBar showLogo showNotification />

      <main className="flex-1 pt-20 pb-28 px-5 flex flex-col gap-4">
        {/* Progress Card */}
        <section className="card flex items-center justify-between animate-fade-in-up">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-[var(--solvy-text)]">Tu progreso</h2>
            <p className="text-sm text-[var(--solvy-text-secondary)]">0 de {lessons.length} lecciones</p>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="var(--solvy-border-light)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="var(--solvy-primary)"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                strokeLinecap="round"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            </svg>
            <span className="text-xs font-bold text-[var(--solvy-text)] relative z-10">0%</span>
          </div>
        </section>

        {/* Category Filters */}
        <section className="flex gap-3 overflow-x-auto pb-1 animate-fade-in-up delay-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip whitespace-nowrap text-sm ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Lesson List */}
        <section className="flex flex-col gap-3 animate-fade-in-up delay-2">
          {filtered.map((lesson) => (
            <Link key={lesson.id} href={`/aprender/quiz?leccion=${lesson.id}`}>
              <div className="lesson-card">
                <div
                  className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 ${lesson.iconBg}`}
                >
                  <lesson.icon size={22} className={lesson.iconColor} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <span
                    className={`inline-block w-fit text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${lesson.tagBg} ${lesson.tagColor}`}
                  >
                    {lesson.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--solvy-text)] leading-snug">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[var(--solvy-text-muted)]">
                    <Clock size={13} />
                    <span className="text-[13px]">{lesson.duration}</span>
                  </div>
                </div>
                <button className="shrink-0 w-8 h-8 rounded-full border border-[var(--solvy-border)] flex items-center justify-center text-[var(--solvy-text-muted)] mt-2 hover:bg-[var(--solvy-primary-container)] hover:text-[var(--solvy-primary)] hover:border-[var(--solvy-primary)] transition-all">
                  <Play size={14} />
                </button>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
