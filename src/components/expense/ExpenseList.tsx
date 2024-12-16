import React from 'react';
import type { Expense } from '../../types';

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div>
            <p className="font-medium text-gray-900">{expense.description}</p>
            <div className="flex space-x-2 text-sm text-gray-500">
              <span>{new Date(expense.date).toLocaleDateString()}</span>
              <span>•</span>
              <span className="capitalize">{expense.category}</span>
            </div>
          </div>
          <p className="font-semibold text-gray-900">
            ${expense.amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}