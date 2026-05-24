import { Clock, Play, Zap, ShieldCheck, Landmark, Sunset, RefreshCw } from "lucide-react";

export const categories = ["Todos", "Ahorro", "Inversión", "Riesgo"];

export const lessons = [
  {
    id: 1,
    title: "Tu fondo de emergencia primero",
    category: "Ahorro",
    duration: "3 min",
    icon: Landmark,
    iconBg: "bg-emerald-50",
    iconColor: "text-[var(--solvy-primary)]",
    tagBg: "bg-emerald-50",
    tagColor: "text-[var(--solvy-primary)]",
  },
  {
    id: 2,
    title: "Presupuesto 50/30/20",
    category: "Ahorro",
    duration: "4 min",
    icon: Landmark,
    iconBg: "bg-emerald-50",
    iconColor: "text-[var(--solvy-primary)]",
    tagBg: "bg-emerald-50",
    tagColor: "text-[var(--solvy-primary)]",
  },
  {
    id: 3,
    title: "Automatiza tu ahorro",
    category: "Ahorro",
    duration: "3 min",
    icon: RefreshCw,
    iconBg: "bg-emerald-50",
    iconColor: "text-[var(--solvy-primary)]",
    tagBg: "bg-emerald-50",
    tagColor: "text-[var(--solvy-primary)]",
  },
  {
    id: 4,
    title: "El poder del interés compuesto",
    category: "Inversión",
    duration: "3 min",
    icon: Zap,
    iconBg: "bg-blue-50",
    iconColor: "text-[var(--solvy-blue)]",
    tagBg: "bg-blue-50",
    tagColor: "text-[var(--solvy-blue)]",
  },
  {
    id: 5,
    title: "Renta fija vs. Renta variable",
    category: "Inversión",
    duration: "5 min",
    icon: Zap,
    iconBg: "bg-blue-50",
    iconColor: "text-[var(--solvy-blue)]",
    tagBg: "bg-blue-50",
    tagColor: "text-[var(--solvy-blue)]",
  },
  {
    id: 6,
    title: "Empieza a invertir con S/ 50",
    category: "Inversión",
    duration: "4 min",
    icon: Zap,
    iconBg: "bg-blue-50",
    iconColor: "text-[var(--solvy-blue)]",
    tagBg: "bg-blue-50",
    tagColor: "text-[var(--solvy-blue)]",
  },
  {
    id: 7,
    title: "¿Qué es el riesgo en inversiones?",
    category: "Riesgo",
    duration: "4 min",
    icon: ShieldCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-[var(--solvy-orange)]",
    tagBg: "bg-orange-50",
    tagColor: "text-[var(--solvy-orange)]",
  },
  {
    id: 8,
    title: "Jubilación: el concepto real",
    category: "Riesgo",
    duration: "4 min",
    icon: Sunset,
    iconBg: "bg-orange-50",
    iconColor: "text-[var(--solvy-orange)]",
    tagBg: "bg-orange-50",
    tagColor: "text-[var(--solvy-orange)]",
  },
  {
    id: 9,
    title: "Diversificación de portafolio",
    category: "Riesgo",
    duration: "5 min",
    icon: ShieldCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-[var(--solvy-orange)]",
    tagBg: "bg-orange-50",
    tagColor: "text-[var(--solvy-orange)]",
  },
];

export const quizzes: Record<number, any> = {
  1: {
    question: "¿Por qué es importante tener un fondo de emergencia primero?",
    options: [
      { id: "a", text: "Para poder gastarlo en vacaciones.", correct: false },
      { id: "b", text: "Para evitar endeudarse ante imprevistos como gastos médicos.", correct: true },
      { id: "c", text: "Porque el banco te regala dinero.", correct: false },
    ],
    successMessage: "¡Respuesta correcta! Un fondo de emergencia te da tranquilidad y evita que te endeudes con altas tasas de interés.",
    errorMessage: "Tu respuesta no es del todo precisa. El fondo de emergencia es para imprevistos."
  },
  2: {
    question: "¿En qué consiste la regla del 50/30/20?",
    options: [
      { id: "a", text: "50% necesidades, 30% gustos, 20% ahorro e inversión.", correct: true },
      { id: "b", text: "50% ahorro, 30% gastos, 20% deudas.", correct: false },
      { id: "c", text: "50% para vivienda, 30% comida, 20% diversión.", correct: false },
    ],
    successMessage: "¡Excelente! Esta regla te permite organizar tus finanzas de manera equilibrada sin sacrificar tu estilo de vida.",
    errorMessage: "La regla distribuye el ingreso en necesidades (50%), deseos (30%) y ahorro/inversión (20%)."
  },
  3: {
    question: "¿Cuál es el principal beneficio de automatizar tu ahorro?",
    options: [
      { id: "a", text: "El banco te cobra menos comisiones.", correct: false },
      { id: "b", text: "Garantizas que ahorras antes de gastar el dinero.", correct: true },
      { id: "c", text: "Ganas el doble de intereses.", correct: false },
    ],
    successMessage: "¡Correcto! Automatizar el ahorro significa 'pagarte a ti mismo primero'.",
    errorMessage: "El beneficio principal es psicológico y práctico: evitas la tentación de gastarlo antes."
  },
  4: {
    question: "¿Por qué el tiempo es tan importante al invertir?",
    options: [
      { id: "a", text: "Porque permite que las ganancias previas generen aún más ganancias.", correct: true },
      { id: "b", text: "Porque los bancos ofrecen mejores tasas si esperas más años.", correct: false },
      { id: "c", text: "Porque el dinero pierde su valor adquisitivo debido a la inflación.", correct: false },
    ],
    successMessage: "¡Respuesta correcta! El interés compuesto permite que tus ahorros crezcan exponencialmente.",
    errorMessage: "Tu respuesta no ha sido del todo precisa. Analicemos cómo las ganancias reinvertidas generan más crecimiento."
  },
  5: {
    question: "¿Cuál es la diferencia principal entre renta fija y variable?",
    options: [
      { id: "a", text: "La renta fija no paga impuestos.", correct: false },
      { id: "b", text: "La renta fija garantiza un rendimiento, la variable depende del mercado.", correct: true },
      { id: "c", text: "La renta variable siempre da pérdidas.", correct: false },
    ],
    successMessage: "¡Excelente! La renta fija es más segura pero da menos rendimiento; la variable fluctúa pero ofrece mayor potencial.",
    errorMessage: "Recuerda: la 'fija' ofrece certeza desde el inicio, mientras que la 'variable' cambia según el desempeño del mercado."
  },
  6: {
    question: "¿Se necesita mucho dinero para empezar a invertir?",
    options: [
      { id: "a", text: "Sí, solo los millonarios pueden invertir en bolsa.", correct: false },
      { id: "b", text: "No, con montos pequeños y constancia se pueden lograr grandes cosas.", correct: true },
      { id: "c", text: "Solo si quieres invertir en bienes raíces.", correct: false },
    ],
    successMessage: "¡Así es! Muchos instrumentos financieros actuales permiten empezar con muy poco capital.",
    errorMessage: "Hoy en día, las barreras de entrada son bajísimas. La constancia es más importante que el monto inicial."
  },
  7: {
    question: "¿Qué significa que una inversión tenga 'alto riesgo'?",
    options: [
      { id: "a", text: "Que seguro perderás todo tu dinero.", correct: false },
      { id: "b", text: "Que el banco puede congelar tus fondos.", correct: false },
      { id: "c", text: "Que el valor de la inversión puede fluctuar mucho (ganar o perder más).", correct: true },
    ],
    successMessage: "¡Correcto! Mayor riesgo significa mayor volatilidad, pero usualmente también mayor potencial de ganancia a largo plazo.",
    errorMessage: "El riesgo en finanzas usualmente se refiere a la volatilidad o la incertidumbre del retorno, no a una pérdida garantizada."
  },
  8: {
    question: "¿Cuándo es el mejor momento para empezar a planear tu jubilación?",
    options: [
      { id: "a", text: "A los 50 años, cuando ganes más dinero.", correct: false },
      { id: "b", text: "Lo antes posible, para aprovechar el interés compuesto.", correct: true },
      { id: "c", text: "Cuando tengas hijos.", correct: false },
    ],
    successMessage: "¡Excelente! Cada año que pasa es un año perdido para el interés compuesto. Empezar hoy es clave.",
    errorMessage: "Retrasar el ahorro para la jubilación requiere que ahorres un porcentaje mucho mayor de tu sueldo en el futuro."
  },
  9: {
    question: "¿Para qué sirve diversificar un portafolio?",
    options: [
      { id: "a", text: "Para reducir el riesgo de perder gran parte de tu dinero si una inversión cae.", correct: true },
      { id: "b", text: "Para pagar menos impuestos.", correct: false },
      { id: "c", text: "Para parecer un inversionista profesional.", correct: false },
    ],
    successMessage: "¡Correcto! 'No poner todos los huevos en la misma canasta' te protege de caídas drásticas en un sector específico.",
    errorMessage: "La diversificación es una estrategia de gestión de riesgos, mezclando distintas inversiones en una cartera."
  }
};
