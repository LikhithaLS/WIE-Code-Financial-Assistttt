import type { Goal } from '../types';

export const calculateEmergencyFund = (monthlyExpenses: number): number => {
  // Recommended: 3-6 months of expenses
  return monthlyExpenses * 6;
};

export const calculateGoalProgress = (goal: Goal): number => {
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

export const getMonthlyContribution = (goal: Goal): number => {
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const monthsRemaining = (deadline.getFullYear() - today.getFullYear()) * 12 + 
    (deadline.getMonth() - today.getMonth());
  
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  return Math.ceil(remainingAmount / monthsRemaining);
};