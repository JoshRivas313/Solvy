"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { goalsService } from "@/services/goals.service";

export type Activity = {
  title: string;
  date: string;
  amount: string;
};

export type Goal = {
  id: string;
  title: string;
  type: string;
  iconName: string;
  iconColor: string;
  iconBg: string;
  saved: number;
  target: number;
  progress: number;
  lastDeposit?: number;
  lastDepositDate?: string;
  recentActivity: Activity[];
};

type GoalsContextType = {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "saved" | "progress" | "lastDeposit" | "lastDepositDate" | "recentActivity">) => Promise<void>;
  addDeposit: (goalId: string, amount: number) => Promise<void>;
  updateGoal: (goalId: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
};

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load from API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await goalsService.getGoals();
        setGoals(data);
      } catch (e) {
        console.error("Failed to fetch goals", e);
        const saved = localStorage.getItem("solvy-goals");
        if (saved) setGoals(JSON.parse(saved));
      }
    };
    fetchGoals();
  }, []);

  // Cache to local storage
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem("solvy-goals", JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = async (newGoalData: Omit<Goal, "id" | "saved" | "progress" | "lastDeposit" | "lastDepositDate" | "recentActivity">) => {
    try {
      const savedGoal = await goalsService.createGoal(newGoalData);
      setGoals((prev) => [...prev, savedGoal]);
    } catch (e) {
      console.error("Error creating goal", e);
    }
  };

  const addDeposit = async (goalId: string, amount: number) => {
    try {
      await goalsService.addDeposit(goalId, amount);
      const updatedGoals = await goalsService.getGoals();
      setGoals(updatedGoals);
    } catch (e) {
      console.error("Error adding deposit", e);
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    try {
      const updatedGoal = await goalsService.updateGoal(goalId, updates);
      setGoals((prev) =>
        prev.map((g) => (g.id === goalId ? { ...g, ...updatedGoal } : g))
      );
    } catch (e) {
      console.error("Error updating goal", e);
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      await goalsService.deleteGoal(goalId);
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
    } catch (e) {
      console.error("Error deleting goal", e);
    }
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, addDeposit, updateGoal, deleteGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
}
