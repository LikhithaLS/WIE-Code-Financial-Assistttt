import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import type { FinancialProfile, EmergencyFundCalculation } from '../../types/api';
import { calculateEmergencyFundNeeds } from '../../services/emergencyFund';

export default function EmergencyFundCalculator() {
  const [profile, setProfile] = useState<FinancialProfile>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    dependents: 0,
    employmentType: 'full-time',
    hasHealthInsurance: true,
    hasDisabilityInsurance: true
  });

  const [calculation, setCalculation] = useState<EmergencyFundCalculation | null>(null);

  const handleCalculate = () => {
    const result = calculateEmergencyFundNeeds(profile);
    setCalculation(result);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-purple-600" />
        <h2 className="ml-2 text-xl font-semibold text-gray-900">Emergency Fund Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
            <input
              type="number"
              value={profile.monthlyIncome}
              onChange={(e) => setProfile({ ...profile, monthlyIncome: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Expenses</label>
            <input
              type="number"
              value={profile.monthlyExpenses}
              onChange={(e) => setProfile({ ...profile, monthlyExpenses: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Dependents</label>
            <input
              type="number"
              value={profile.dependents}
              onChange={(e) => setProfile({ ...profile, dependents: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              value={profile.employmentType}
              onChange={(e) => setProfile({ ...profile, employmentType: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="self-employed">Self Employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.hasHealthInsurance}
              onChange={(e) => setProfile({ ...profile, hasHealthInsurance: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Health Insurance</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.hasDisabilityInsurance}
              onChange={(e) => setProfile({ ...profile, hasDisabilityInsurance: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Disability Insurance</span>
          </label>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Calculate Emergency Fund
        </button>

        {calculation && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className={`h-5 w-5 ${
                calculation.riskLevel === 'low' ? 'text-green-500' :
                calculation.riskLevel === 'medium' ? 'text-yellow-500' :
                'text-red-500'
              }`} />
              <span className="ml-2 font-medium capitalize">
                {calculation.riskLevel} Risk Level
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Recommended Amount:</span>
                <span className="font-semibold">${calculation.recommendedAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Contribution:</span>
                <span className="font-semibold">${calculation.monthlyContribution.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time to Reach Goal:</span>
                <span className="font-semibold">{calculation.timeToReach} months</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}