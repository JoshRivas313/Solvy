import { Wallet, ShoppingCart, Leaf, BarChart3, Rocket, Shield, Scale, Flame } from "lucide-react";

export const recentActivityData = [
  {
    icon: Wallet,
    iconBg: "var(--solvy-success-container)",
    iconColor: "var(--solvy-success)",
    title: "Aporte Retiro",
    time: "Hoy, 10:45 AM",
    amount: "+$500",
    amountColor: "var(--solvy-success)",
  },
  {
    icon: ShoppingCart,
    iconBg: "var(--solvy-error-container)",
    iconColor: "var(--solvy-error)",
    title: "Suscripciones",
    time: "Ayer, 14:20 PM",
    amount: "-$45",
    amountColor: "var(--solvy-text)",
  },
];

export const savingsOptions = [
  { value: 50, label: "S/ 50" },
  { value: 100, label: "S/ 100" },
  { value: 200, label: "S/ 200" },
  { value: 400, label: "S/ 400" },
  { value: 800, label: "S/ 800" },
];

export const incomeOptions = [
  { value: 500, label: "S/ 500" },
  { value: 1000, label: "S/ 1,000" },
  { value: 1500, label: "S/ 1,500" },
  { value: 2500, label: "S/ 2,500" },
  { value: 4000, label: "S/ 4,000" },
];

export const knowledgeOptions = [
  {
    id: "principiante",
    title: "Principiante",
    description: "Nunca he invertido ni sé mucho del tema",
    icon: Leaf,
  },
  {
    id: "intermedio",
    title: "Intermedio",
    description: "Tengo nociones básicas y algo de experiencia",
    icon: BarChart3,
  },
  {
    id: "avanzado",
    title: "Avanzado",
    description: "Entiendo instrumentos financieros y ya invierto",
    icon: Rocket,
  },
];

export const riskOptions = [
  {
    id: "conservador",
    title: "Conservador",
    description: "Prefiero seguridad sobre ganancias (5% est.)",
    icon: Shield,
    iconBg: "var(--solvy-bg)",
    iconColor: "var(--solvy-text-muted)",
  },
  {
    id: "moderado",
    title: "Moderado",
    description: "Acepto variación por mejores retornos (7% est.)",
    icon: Scale,
    iconBg: "var(--solvy-primary-container)",
    iconColor: "var(--solvy-primary)",
  },
  {
    id: "agresivo",
    title: "Agresivo",
    description: "Busco máximo crecimiento y acepto volatilidad (9% est.)",
    icon: Flame,
    iconBg: "var(--solvy-bg)",
    iconColor: "var(--solvy-text-muted)",
  },
];

export const goalsData = [
  {
    id: "jubilacion",
    title: "Mi jubilación",
    type: "Principal",
    iconName: "PiggyBank",
    iconColor: "var(--solvy-primary)",
    iconBg: "var(--solvy-primary-container)",
    saved: 0,
    target: 524963,
    progress: 0,
    lastDeposit: 100,
    lastDepositDate: "12 Oct 2023",
    recentActivity: [
      {
        title: "Aporte inicial",
        date: "12 Oct 2023",
        amount: "+S/ 100",
      }
    ]
  },
  {
    id: "auto",
    title: "Auto Nuevo",
    type: "Secundaria",
    iconName: "Car",
    iconColor: "var(--solvy-indigo)",
    iconBg: "rgba(99, 102, 241, 0.1)", // equivalent to bg-indigo-50
    saved: 12500,
    target: 50000,
    progress: 25,
    lastDeposit: 500,
    lastDepositDate: "15 Oct 2023",
    recentActivity: [
      {
        title: "Aporte 01",
        date: "15 Oct 2023",
        amount: "+S/ 500",
      },
      {
        title: "Aporte 02",
        date: "01 Oct 2023",
        amount: "+S/ 250",
      }
    ]
  }
];
