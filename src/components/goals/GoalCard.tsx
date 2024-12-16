import React from 'react';
import type { Goal } from '../../types';
import { calculateGoalProgress, getMonthlyContribution } from '../../utils/goalCalculator';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (id: string, amount: number) => void;
}

export default function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const progress = calculateGoalProgress(goal);
  const monthlyContribution = getMonthlyContribution(goal);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{goal.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{goal.category}</p>
        </div>
        <span className="text-sm text-purple-600 font-medium">{progress}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Current Amount:</span>
          <span className="font-medium">${goal.currentAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Target Amount:</span>
          <span className="font-medium">${goal.targetAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Monthly Needed:</span>
          <span className="font-medium">${monthlyContribution.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => onUpdate(goal.id, monthlyContribution)}
        className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Add Monthly Contribution
      </button>
    </div>
  );
}