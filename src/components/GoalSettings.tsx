import React, { useState } from 'react';
import { Target } from 'lucide-react';
import type { Goal } from '../types';
import GoalForm from './goals/GoalForm';
import GoalCard from './goals/GoalCard';

export default function GoalSettings() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'progress'>) => {
    const goal: Goal = {
      ...newGoal,
      id: crypto.randomUUID(),
      progress: 0
    };
    setGoals([...goals, goal]);
    setShowForm(false);
  };

  const handleUpdateGoal = (id: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.currentAmount + amount;
        return {
          ...goal,
          currentAmount: newAmount,
          progress: Math.min(100, Math.round((newAmount / goal.targetAmount) * 100))
        };
      }
      return goal;
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Target className="h-6 w-6 text-purple-600" />
          <h2 className="ml-2 text-xl font-semibold text-gray-900">Financial Goals</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          {showForm ? 'View Goals' : 'Add Goal'}
        </button>
      </div>

      {showForm ? (
        <GoalForm onSubmit={handleAddGoal} />
      ) : (
        <div className="space-y-4">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
            />
          ))}
          {goals.length === 0 && (
            <p className="text-gray-500 text-center py-8">No goals set yet</p>
          )}
        </div>
      )}
    </div>
  );
}