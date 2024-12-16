import type { Expense, ExpenseCategory } from '../types';

export const categorizeExpense = (description: string): ExpenseCategory => {
  const keywords: Record<ExpenseCategory, string[]> = {
    food: ['grocery', 'restaurant', 'food', 'meal'],
    travel: ['flight', 'hotel', 'taxi', 'uber'],
    education: ['course', 'book', 'tuition', 'school'],
    shopping: ['clothes', 'shoes', 'mall'],
    healthcare: ['doctor', 'medicine', 'hospital'],
    utilities: ['electricity', 'water', 'internet', 'phone'],
    entertainment: ['movie', 'game', 'concert'],
    other: []
  };

  const lowercaseDesc = description.toLowerCase();
  
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowercaseDesc.includes(word))) {
      return category as ExpenseCategory;
    }
  }
  
  return 'other';
};

export const analyzeSpendingPattern = (expenses: Expense[]) => {
  const monthlyTotal: Record<string, number> = {};
  const categoryTotal: Record<ExpenseCategory, number> = {
    food: 0,
    travel: 0,
    education: 0,
    shopping: 0,
    healthcare: 0,
    utilities: 0,
    entertainment: 0,
    other: 0
  };

  expenses.forEach(expense => {
    const month = new Date(expense.date).toISOString().slice(0, 7);
    monthlyTotal[month] = (monthlyTotal[month] || 0) + expense.amount;
    categoryTotal[expense.category] += expense.amount;
  });

  return { monthlyTotal, categoryTotal };
};