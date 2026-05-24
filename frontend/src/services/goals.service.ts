import { apiFetch } from "@/lib/api";

export const goalsService = {
  async getGoals() {
    return apiFetch('/goals');
  },

  async createGoal(goalData: any) {
    return apiFetch('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  },

  async addDeposit(goalId: string, amount: number) {
    return apiFetch(`/goals/${goalId}/deposits`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },

  async deleteGoal(goalId: string) {
    return apiFetch(`/goals/${goalId}`, {
      method: 'DELETE',
    });
  },

  async updateGoal(goalId: string, goalData: any) {
    return apiFetch(`/goals/${goalId}`, {
      method: 'PUT',
      body: JSON.stringify(goalData),
    });
  }
};
