import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import type { Expense } from '../types';
import ExpenseForm from './expense/ExpenseForm';
import ExpenseList from './expense/ExpenseList';
import ExpenseStats from './expense/ExpenseStats';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showStats, setShowStats] = useState(false);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID()
    };
    setExpenses([expense, ...expenses]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          <h2 className="ml-2 text-xl font-semibold text-gray-900">Expense Tracker</h2>
        </div>
        <button
          onClick={() => setShowStats(!showStats)}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          {showStats ? 'View Expenses' : 'View Stats'}
        </button>
      </div>

      {showStats ? (
        <ExpenseStats expenses={expenses} />
      ) : (
        <>
          <ExpenseForm onSubmit={handleAddExpense} />
          <div className="mt-6">
            <ExpenseList expenses={expenses} />
          </div>
        </>
      )}
    </div>
  );
}