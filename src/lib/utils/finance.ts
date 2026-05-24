import type { RiskLevel } from "@/types";

export const RISK_RETURNS: Record<RiskLevel, number> = {
  low: 5,
  medium: 7,
  high: 9,
};

export function compoundGrowth(
  monthlyContribution: number,
  currentSavings: number,
  annualRate: number,
  years: number
): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const futureContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  const futureSavings = currentSavings * Math.pow(1 + r, n);
  return futureContributions + futureSavings;
}

export function buildChartData(
  monthlyContribution: number,
  currentSavings: number,
  annualRate: number,
  currentAge: number,
  retirementAge: number
) {
  const years = retirementAge - currentAge;
  return Array.from({ length: years + 1 }, (_, i) => ({
    age: currentAge + i,
    value: Math.round(compoundGrowth(monthlyContribution, currentSavings, annualRate, i)),
  }));
}
