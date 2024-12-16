import React from 'react';
import { PieChart, BarChart } from 'lucide-react';
import type { Expense } from '../../types';
import { analyzeSpendingPattern } from '../../utils/expenseAnalytics';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export default function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const { monthlyTotal, categoryTotal } = analyzeSpendingPattern(expenses);
  const totalSpent = Object.values(monthlyTotal).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(monthlyTotal).map(([month, total]) => (
            <div key={month} className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">{month}</p>
              <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Category Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(categoryTotal).map(([category, total]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="capitalize text-gray-700">{category}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-medium">${total.toFixed(2)}</span>
                <span className="text-sm text-gray-500">
                  ({totalSpent ? Math.round((total / totalSpent) * 100) : 0}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}