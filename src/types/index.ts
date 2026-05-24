export type RiskLevel = "low" | "medium" | "high";
export type KnowledgeLevel = "none" | "basic" | "intermediate" | "advanced";
export type LessonCategory = "saving" | "investing" | "risk" | "retirement" | "habits";
export type Priority = "high" | "medium" | "low";

export interface FinancialProfile {
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  current_savings: number;
  monthly_debt: number;
  knowledge_level: KnowledgeLevel;
  risk_tolerance: RiskLevel;
  investment_goal: string;
}

export interface Lesson {
  id: string;
  category: LessonCategory;
  title: string;
  duration: number;
  icon: string;
  content: LessonBlock[];
  quiz: Quiz;
}

export interface LessonBlock {
  type: "text" | "key";
  text: string;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  color: string;
}

export interface PlanAction {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
}
