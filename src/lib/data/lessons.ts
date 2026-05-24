import type { Lesson } from "@/types";

export const LESSONS: Lesson[] = [
  {
    id: "1",
    category: "investing",
    title: "El poder del interés compuesto",
    duration: 3,
    icon: "⚡",
    content: [
      { type: "text", text: "El interés compuesto es cuando tus ganancias generan más ganancias. Es el principio más poderoso en las finanzas personales." },
      { type: "key",  text: "Si inviertes S/150 al mes desde los 25, a los 65 podrías tener más de S/400,000 con una tasa del 7% anual." },
      { type: "text", text: "La clave es el tiempo. Cada año sin invertir es potencial perdido. No necesitas mucho dinero — necesitas empezar pronto." },
    ],
    quiz: {
      question: "¿Por qué el tiempo es tan importante al invertir?",
      options: [
        { text: "Porque los precios siempre suben con el tiempo", correct: false },
        { text: "Porque tus ganancias generan más ganancias exponencialmente", correct: true },
        { text: "Porque el banco te da más intereses si llevas más años", correct: false },
      ],
      explanation: "El interés compuesto crece de forma exponencial. Por eso empezar hoy vale más que duplicar el monto en 10 años.",
    },
  },
  {
    id: "2",
    category: "risk",
    title: "¿Qué es el riesgo en inversiones?",
    duration: 4,
    icon: "🛡️",
    content: [
      { type: "text", text: "El riesgo es la posibilidad de que tu inversión valga menos de lo esperado. No es malo — es parte del proceso." },
      { type: "key",  text: "Mayor riesgo = Mayor retorno potencial. Menor riesgo = Mayor estabilidad. Tú decides según tu situación." },
      { type: "text", text: "La solución es diversificar: no poner todos los huevos en una canasta. Y el tiempo: las inversiones de largo plazo se recuperan." },
    ],
    quiz: {
      question: "¿Cuál es la mejor forma de reducir el riesgo de una inversión?",
      options: [
        { text: "Invertir todo en un solo activo seguro", correct: false },
        { text: "Diversificar en distintos tipos de inversiones", correct: true },
        { text: "Esperar a que el mercado suba para invertir", correct: false },
      ],
      explanation: "Diversificar distribuye el riesgo. Si un activo baja, otros pueden subir y compensar la pérdida.",
    },
  },
  {
    id: "3",
    category: "saving",
    title: "Tu fondo de emergencia primero",
    duration: 3,
    icon: "🏦",
    content: [
      { type: "text", text: "Antes de invertir, necesitas un fondo de emergencia: dinero líquido para imprevistos sin tocar tus inversiones." },
      { type: "key",  text: "La regla general: tener entre 3 y 6 meses de gastos guardados en una cuenta de ahorros accesible." },
      { type: "text", text: "Sin este fondo, cualquier imprevisto te obliga a vender inversiones en mal momento. El fondo es tu escudo financiero." },
    ],
    quiz: {
      question: "¿Cuánto debería tener en tu fondo de emergencia?",
      options: [
        { text: "Al menos 1 mes de gastos", correct: false },
        { text: "Entre 3 y 6 meses de gastos", correct: true },
        { text: "Todo el dinero que tengas ahorrado", correct: false },
      ],
      explanation: "3 a 6 meses te da tiempo suficiente para resolver un imprevisto sin entrar en deudas ni vender inversiones.",
    },
  },
  {
    id: "4",
    category: "retirement",
    title: "Jubilación: el concepto real",
    duration: 4,
    icon: "🌅",
    content: [
      { type: "text", text: "Jubilarte no significa dejar de trabajar por obligación. Significa tener suficiente dinero para elegir cómo vivir." },
      { type: "key",  text: "La regla del 4%: si acumulas suficiente capital, puedes retirar el 4% anual sin agotar tu fondo en 30 años." },
      { type: "text", text: "Cuanto antes empieces, menos tendrás que ahorrar cada mes. El tiempo hace el trabajo pesado por ti." },
    ],
    quiz: {
      question: "¿Qué significa la regla del 4% en jubilación?",
      options: [
        { text: "Debes ahorrar el 4% de tu salario cada mes", correct: false },
        { text: "Puedes retirar el 4% anual de tu capital sin agotarlo", correct: true },
        { text: "Tu inversión crece 4% al año garantizado", correct: false },
      ],
      explanation: "La regla del 4% es una guía histórica que sugiere que ese ritmo de retiro sostiene el capital por al menos 30 años.",
    },
  },
  {
    id: "5",
    category: "habits",
    title: "Automatiza tu ahorro",
    duration: 3,
    icon: "🤖",
    content: [
      { type: "text", text: "El secreto de quienes ahorran bien no es la disciplina: es la automatización. Quitan la decisión de en medio." },
      { type: "key",  text: "Configura una transferencia automática el día que te pagan. Primero págate a ti mismo, luego gasta el resto." },
      { type: "text", text: "Con el tiempo, ni notarás el dinero que se va. Y tu futuro yo te lo agradecerá enormemente." },
    ],
    quiz: {
      question: "¿Por qué automatizar el ahorro es más efectivo que depender de la disciplina?",
      options: [
        { text: "Porque la automatización gana más intereses", correct: false },
        { text: "Porque elimina la decisión y el olvido del proceso", correct: true },
        { text: "Porque los bancos premian los ahorros automáticos", correct: false },
      ],
      explanation: "Al automatizar, no dependes de recordarlo ni de tener fuerza de voluntad. El sistema trabaja sin ti.",
    },
  },
];

export const CAT_META: Record<string, { label: string; color: string }> = {
  saving:     { label: "Ahorro",     color: "#34BD78" },
  investing:  { label: "Inversión",  color: "#6366F1" },
  risk:       { label: "Riesgo",     color: "#F59E0B" },
  retirement: { label: "Jubilación", color: "#EC4899" },
  habits:     { label: "Hábitos",    color: "#3B82F6" },
};
