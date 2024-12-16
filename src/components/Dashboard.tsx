import React from 'react';
import { BarChart3, PiggyBank, Target, BookOpen, Shield } from 'lucide-react';
import ExpenseTracker from './ExpenseTracker';
import GoalSettings from './GoalSettings';
import Tutorials from './Tutorials';
import EmergencyFundCalculator from './emergency/EmergencyFundCalculator';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <PiggyBank className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">FinWise</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Dashboard</h1>
          </div>
          
          <ExpenseTracker />
          <EmergencyFundCalculator />
          <GoalSettings />
          <div className="lg:col-span-3">
            <Tutorials />
          </div>
        </div>
      </main>
    </div>
  );
}