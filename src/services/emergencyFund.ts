import type { FinancialProfile, EmergencyFundCalculation } from '../types/api';

export function calculateEmergencyFundNeeds(profile: FinancialProfile): EmergencyFundCalculation {
  // Base calculation: 6 months of expenses
  let baseAmount = profile.monthlyExpenses * 6;

  // Adjust for risk factors
  const riskFactors = calculateRiskFactors(profile);
  const adjustedAmount = baseAmount * riskFactors.multiplier;

  // Calculate recommended monthly contribution (10% of monthly income by default)
  const recommendedContribution = profile.monthlyIncome * 0.1;

  // Calculate time to reach goal (in months)
  const timeToReach = Math.ceil(adjustedAmount / recommendedContribution);

  return {
    recommendedAmount: adjustedAmount,
    currentAmount: 0, // This would come from user's actual savings
    monthlyContribution: recommendedContribution,
    timeToReach,
    riskLevel: riskFactors.level
  };
}

function calculateRiskFactors(profile: FinancialProfile) {
  let riskScore = 0;
  let multiplier = 1;

  // Employment type risk
  if (profile.employmentType === 'self-employed') {
    riskScore += 2;
    multiplier += 0.2; // Need 20% more
  } else if (profile.employmentType === 'part-time') {
    riskScore += 1;
    multiplier += 0.1;
  } else if (profile.employmentType === 'unemployed') {
    riskScore += 3;
    multiplier += 0.3;
  }

  // Insurance risk
  if (!profile.hasHealthInsurance) {
    riskScore += 2;
    multiplier += 0.2;
  }
  if (!profile.hasDisabilityInsurance) {
    riskScore += 1;
    multiplier += 0.1;
  }

  // Dependents risk
  if (profile.dependents > 0) {
    riskScore += Math.min(profile.dependents, 3);
    multiplier += profile.dependents * 0.1;
  }

  // Determine risk level
  const riskLevel = riskScore <= 2 ? 'low' : riskScore <= 5 ? 'medium' : 'high';

  return { level: riskLevel, multiplier };
}