// API Types
export interface User {
  id: string;
  name: string;
  email: string;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface EmergencyFundCalculation {
  recommendedAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  timeToReach: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface FinancialProfile {
  monthlyIncome: number;
  monthlyExpenses: number;
  dependents: number;
  employmentType: 'full-time' | 'part-time' | 'self-employed' | 'unemployed';
  hasHealthInsurance: boolean;
  hasDisabilityInsurance: boolean;
}