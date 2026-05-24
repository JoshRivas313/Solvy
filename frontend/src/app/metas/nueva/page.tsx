"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Home, Car, GraduationCap, Plane, PiggyBank, ShoppingCart, 
  Edit3, DollarSign, Calendar, Lightbulb, ArrowRight 
} from "lucide-react";
import { useGoals } from "@/context/GoalsContext";

const AVAILABLE_ICONS = [
  { id: "home", component: Home, name: "Home" },
  { id: "car", component: Car, name: "Car" },
  { id: "graduation", component: GraduationCap, name: "GraduationCap" },
  { id: "plane", component: Plane, name: "Plane" },
  { id: "savings", component: PiggyBank, name: "PiggyBank" },
  { id: "cart", component: ShoppingCart, name: "ShoppingCart" },
];

const AVAILABLE_COLORS = [
  { id: "emerald", value: "var(--solvy-primary)", bg: "var(--solvy-primary-container)" },
  { id: "blue", value: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  { id: "purple", value: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" },
  { id: "orange", value: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
  { id: "rose", value: "#F43F5E", bg: "rgba(244, 63, 94, 0.1)" },
  { id: "slate", value: "#1E293B", bg: "rgba(30, 41, 59, 0.1)" },
];

export default function NuevaMetaPage() {
  const router = useRouter();
  const { addGoal } = useGoals();
  
  const [selectedIconId, setSelectedIconId] = useState("savings");
  const [selectedColorId, setSelectedColorId] = useState("emerald");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const selectedIcon = AVAILABLE_ICONS.find(i => i.id === selectedIconId) || AVAILABLE_ICONS[4];
  const selectedColor = AVAILABLE_COLORS.find(c => c.id === selectedColorId) || AVAILABLE_COLORS[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addGoal({
      title: name,
      type: "Secundaria",
      iconName: selectedIcon.name,
      iconColor: selectedColor.value,
      iconBg: selectedColor.bg,
      target: Number(amount),
    });

    router.push("/metas");
  };

  return (
    <div className="mobile-container flex flex-col min-h-dvh bg-[var(--solvy-bg)]">
      {/* Header */}
      <header className="fixed top-0 w-full max-w-[480px] z-50 bg-[var(--solvy-surface)]/90 backdrop-blur-md border-b border-[var(--solvy-border-light)]">
        <div className="flex items-center justify-between px-4 h-16 w-full">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--solvy-bg)] transition-colors active:scale-95 duration-200"
          >
            <ArrowLeft size={24} className="text-[var(--solvy-text)]" />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--solvy-text)]">
            Nueva Meta
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12 px-5 flex flex-col">
        <form onSubmit={handleCreate} className="flex flex-col gap-8 animate-fade-in-up">
          
          <div className="flex flex-col gap-6">
            {/* Icon Preview */}
            <div className="flex flex-col items-center justify-center">
              <label className="text-xl font-bold text-[var(--solvy-text)] mb-6">
                Personaliza tu meta
              </label>
              <div 
                className="rounded-full flex items-center justify-center shadow-sm border w-32 h-32 transition-all duration-300"
                style={{ 
                  backgroundColor: selectedColor.bg, 
                  color: selectedColor.value,
                  borderColor: `${selectedColor.value}20`
                }}
              >
                <selectedIcon.component size={56} strokeWidth={1.5} />
              </div>
            </div>

            {/* Icon Grid */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-xs font-bold text-[var(--solvy-text-muted)] uppercase tracking-wider pl-1">
                Selecciona un ícono
              </p>
              <div className="grid grid-cols-6 gap-2">
                {AVAILABLE_ICONS.map((icon) => (
                  <button 
                    key={icon.id}
                    type="button" 
                    onClick={() => setSelectedIconId(icon.id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                      selectedIconId === icon.id 
                        ? 'bg-[var(--solvy-primary-container)] border-2 border-[var(--solvy-primary)] text-[var(--solvy-primary)]' 
                        : 'bg-white border border-[var(--solvy-border)] text-[var(--solvy-text-secondary)] hover:border-[var(--solvy-primary)]'
                    }`}
                  >
                    <icon.component size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Color Grid */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-[var(--solvy-text-muted)] uppercase tracking-wider pl-1">
                Elige un color
              </p>
              <div className="flex justify-between px-1">
                {AVAILABLE_COLORS.map((color) => (
                  <button 
                    key={color.id}
                    type="button" 
                    onClick={() => setSelectedColorId(color.id)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColorId === color.id ? 'ring-2 ring-offset-2' : 'hover:scale-110'
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      boxShadow: selectedColorId === color.id ? `0 0 0 2px ${color.value}` : 'none'
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-2 animate-fade-in-up delay-1">
            <label className="text-sm font-bold text-[var(--solvy-text-secondary)] ml-1">Nombre de la meta</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--solvy-text-muted)] group-focus-within:text-[var(--solvy-primary)] transition-colors">
                <Edit3 size={20} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej. Fondo de emergencia"
                className="w-full h-14 pl-12 pr-4 bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)] rounded-2xl text-[var(--solvy-text)] placeholder:text-[var(--solvy-text-muted)] focus:border-[var(--solvy-primary)] focus:ring-1 focus:ring-[var(--solvy-primary)] outline-none shadow-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 animate-fade-in-up delay-1">
            <label className="text-sm font-bold text-[var(--solvy-text-secondary)] ml-1">Monto objetivo</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--solvy-primary)] font-extrabold text-lg">
                S/
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-14 pl-12 pr-4 bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)] rounded-2xl font-bold text-xl text-[var(--solvy-text)] placeholder:text-[var(--solvy-text-muted)] focus:border-[var(--solvy-primary)] focus:ring-1 focus:ring-[var(--solvy-primary)] outline-none shadow-sm transition-all"
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[var(--solvy-text-muted)]">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 animate-fade-in-up delay-1">
            <label className="text-sm font-bold text-[var(--solvy-text-secondary)] ml-1">Plazo estimado</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--solvy-text-muted)] group-focus-within:text-[var(--solvy-primary)] transition-colors">
                <Calendar size={20} />
              </div>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-[var(--solvy-surface)] border border-[var(--solvy-border-light)] rounded-2xl text-[var(--solvy-text)] focus:border-[var(--solvy-primary)] focus:ring-1 focus:ring-[var(--solvy-primary)] outline-none shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="p-4 bg-[var(--solvy-success-container)] rounded-[24px] border border-[var(--solvy-border-light)] flex items-start gap-3 animate-fade-in-up delay-2">
            <Lightbulb size={20} className="text-[var(--solvy-primary-dark)] shrink-0 mt-0.5" />
            <p className="text-[13px] leading-relaxed text-emerald-800 font-medium">
              Las metas personalizadas te permiten organizar tus ahorros por proyectos específicos. Te ayudaremos a calcular cuánto necesitas ahorrar cada mes.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4 pb-8 animate-fade-in-up delay-3">
            <button type="submit" className="btn-primary">
              Crear Meta
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-[var(--solvy-text-muted)] text-[12px] mt-4 font-medium">
              Podrás editar estos detalles más adelante desde tu perfil.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
