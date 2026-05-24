export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      financial_profiles: {
        Row: {
          id: string;
          user_id: string;
          age: number;
          monthly_income: number;
          monthly_expenses: number;
          current_savings: number;
          monthly_debt: number;
          knowledge_level: "none" | "basic" | "intermediate" | "advanced";
          risk_tolerance: "low" | "medium" | "high";
          investment_goal: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["financial_profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["financial_profiles"]["Insert"]>;
      };
      plans: {
        Row: {
          id: string;
          user_id: string;
          period: string;
          summary: string;
          savings_suggested: number;
          investment_suggested: number;
          expenses_limit: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["plans"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["plans"]["Insert"]>;
      };
      plan_actions: {
        Row: {
          id: string;
          plan_id: string;
          user_id: string;
          title: string;
          description: string;
          priority: "high" | "medium" | "low";
          completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["plan_actions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["plan_actions"]["Insert"]>;
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount: number;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["goals"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["goals"]["Insert"]>;
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          quiz_passed: boolean;
          completed_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["lesson_progress"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["lesson_progress"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
