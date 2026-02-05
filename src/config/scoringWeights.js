/**
 * TRANSPARENT SCORING CONFIGURATION
 *
 * This file contains all the weights and parameters used to calculate
 * the Alternative Credit Score. All values are visible and editable.
 *
 * EQUITY PRINCIPLES:
 * - No criminal history
 * - No zip code penalization
 * - No demographic inference
 * - Focus on consistency and effort, not historical exclusion
 */

export const SCORING_CONFIG = {
  // Main factor weights (must sum to 1.0)
  weights: {
    rentPayments: 0.30,           // 30% - Rent payment history
    utilityPayments: 0.20,        // 20% - Utility bill payments
    communityEndorsements: 0.25,  // 25% - Community reputation
    mentorshipCompletion: 0.25    // 25% - Business mentorship
  },

  // Score range (familiar FICO-like scale)
  maxScore: 850,
  minScore: 300,

  // Factor labels for display (plain language)
  factorLabels: {
    rentPayments: 'Rent Payment History',
    utilityPayments: 'Utility Bill Payments',
    communityEndorsements: 'Community Reputation',
    mentorshipCompletion: 'Business Mentorship'
  },

  // Factor descriptions for transparency
  factorDescriptions: {
    rentPayments: 'How consistently you pay rent on time',
    utilityPayments: 'Your track record with electricity, water, and internet bills',
    communityEndorsements: 'Verified support from local organizations, mentors, and community leaders',
    mentorshipCompletion: 'Business training programs and certifications you\'ve completed'
  },

  // Sub-factor weights for detailed calculation
  rentFactors: {
    onTimePercentage: 0.7,    // 70% - Percentage of on-time payments
    consistencyBonus: 0.3     // 30% - Bonus for consistent payment streak
  },

  utilityFactors: {
    onTimePercentage: 0.6,    // 60% - Percentage of on-time payments
    diversityBonus: 0.2,      // 20% - Bonus for multiple utility types
    consistencyBonus: 0.2     // 20% - Bonus for consistent payment streak
  },

  endorsementFactors: {
    count: 0.3,               // 30% - Number of endorsements
    averageTrustLevel: 0.4,   // 40% - Average trust level (1-5)
    verifiedBonus: 0.3        // 30% - Bonus for verified endorsements
  },

  mentorshipFactors: {
    completionCount: 0.5,     // 50% - Number of programs completed
    programDiversity: 0.3,    // 30% - Variety of program types
    verifiedBonus: 0.2        // 20% - Bonus for verified programs
  },

  // Thresholds for improvement suggestions
  improvementThresholds: {
    lowRentScore: 60,         // Below this, suggest rent improvement
    lowUtilityScore: 60,      // Below this, suggest utility improvement
    fewEndorsements: 3,       // Below this count, suggest more endorsements
    fewMentorships: 2         // Below this count, suggest more programs
  },

  // Fairness check threshold
  fairnessThreshold: 0.40,    // Flag if one factor causes >40% score reduction

  // Score tier labels
  scoreTiers: {
    excellent: { min: 750, label: 'Excellent', color: '#10b981' },
    good: { min: 650, label: 'Good', color: '#22c55e' },
    fair: { min: 550, label: 'Fair', color: '#f59e0b' },
    building: { min: 300, label: 'Building', color: '#6b7280' }
  }
};

// Helper function to get score tier
export function getScoreTier(score) {
  const { scoreTiers } = SCORING_CONFIG;
  if (score >= scoreTiers.excellent.min) return scoreTiers.excellent;
  if (score >= scoreTiers.good.min) return scoreTiers.good;
  if (score >= scoreTiers.fair.min) return scoreTiers.fair;
  return scoreTiers.building;
}

// Helper to format weight as percentage
export function formatWeight(weight) {
  return `${Math.round(weight * 100)}%`;
}
