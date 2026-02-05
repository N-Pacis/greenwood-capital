/**
 * TRANSPARENT CREDIT SCORE CALCULATOR
 *
 * This module calculates the Alternative Credit Score with full transparency.
 * Every calculation step is documented and returned for user inspection.
 *
 * EQUITY PRINCIPLES ENFORCED:
 * - No criminal history considered
 * - No zip code or location data
 * - No demographic inference
 * - Fairness checks included
 */

import { SCORING_CONFIG, getScoreTier } from '../config/scoringWeights';

/**
 * Calculate the complete Alternative Credit Score with full breakdown
 * @param {Object} userData - User's data including all factors
 * @returns {Object} Complete score breakdown with explanations
 */
export function calculateScore(userData) {
  const { rentPayments, utilityPayments, communityEndorsements, mentorshipPrograms } = userData;

  // Calculate each factor score (0-100 scale)
  const rentScore = calculateRentScore(rentPayments);
  const utilityScore = calculateUtilityScore(utilityPayments);
  const endorsementScore = calculateEndorsementScore(communityEndorsements);
  const mentorshipScore = calculateMentorshipScore(mentorshipPrograms);

  // Calculate weighted contributions
  const { weights, maxScore, minScore } = SCORING_CONFIG;
  const scoreRange = maxScore - minScore;

  // Raw weighted score (0-100)
  const rawWeightedScore =
    (rentScore.score * weights.rentPayments) +
    (utilityScore.score * weights.utilityPayments) +
    (endorsementScore.score * weights.communityEndorsements) +
    (mentorshipScore.score * weights.mentorshipCompletion);

  // Convert to 300-850 scale
  const normalizedScore = Math.round(minScore + (rawWeightedScore / 100) * scoreRange);

  // Calculate point contributions for each factor
  const rentPoints = Math.round((rentScore.score * weights.rentPayments / 100) * scoreRange);
  const utilityPoints = Math.round((utilityScore.score * weights.utilityPayments / 100) * scoreRange);
  const endorsementPoints = Math.round((endorsementScore.score * weights.communityEndorsements / 100) * scoreRange);
  const mentorshipPoints = Math.round((mentorshipScore.score * weights.mentorshipCompletion / 100) * scoreRange);

  // Build detailed breakdown
  const breakdown = {
    rentPayments: {
      rawScore: rentScore.score,
      weight: weights.rentPayments,
      weightedContribution: Math.round(rentScore.score * weights.rentPayments),
      pointsEarned: rentPoints,
      maxPossiblePoints: Math.round(weights.rentPayments * scoreRange),
      explanation: generateExplanation('rent', rentScore, rentPoints),
      details: rentScore.details,
      dataSource: `${rentPayments.length} rent payment records`
    },
    utilityPayments: {
      rawScore: utilityScore.score,
      weight: weights.utilityPayments,
      weightedContribution: Math.round(utilityScore.score * weights.utilityPayments),
      pointsEarned: utilityPoints,
      maxPossiblePoints: Math.round(weights.utilityPayments * scoreRange),
      explanation: generateExplanation('utility', utilityScore, utilityPoints),
      details: utilityScore.details,
      dataSource: `${utilityPayments.length} utility payment records`
    },
    communityEndorsements: {
      rawScore: endorsementScore.score,
      weight: weights.communityEndorsements,
      weightedContribution: Math.round(endorsementScore.score * weights.communityEndorsements),
      pointsEarned: endorsementPoints,
      maxPossiblePoints: Math.round(weights.communityEndorsements * scoreRange),
      explanation: generateExplanation('endorsement', endorsementScore, endorsementPoints),
      details: endorsementScore.details,
      dataSource: `${communityEndorsements.length} community endorsements`
    },
    mentorshipCompletion: {
      rawScore: mentorshipScore.score,
      weight: weights.mentorshipCompletion,
      weightedContribution: Math.round(mentorshipScore.score * weights.mentorshipCompletion),
      pointsEarned: mentorshipPoints,
      maxPossiblePoints: Math.round(weights.mentorshipCompletion * scoreRange),
      explanation: generateExplanation('mentorship', mentorshipScore, mentorshipPoints),
      details: mentorshipScore.details,
      dataSource: `${mentorshipPrograms.length} completed programs`
    }
  };

  // Check for fairness issues
  const fairnessFlags = checkFairness(breakdown);

  // Generate improvement suggestions
  const improvements = generateImprovements(
    { rentScore, utilityScore, endorsementScore, mentorshipScore },
    { rentPayments, utilityPayments, communityEndorsements, mentorshipPrograms }
  );

  // Get score tier
  const tier = getScoreTier(normalizedScore);

  return {
    totalScore: normalizedScore,
    tier,
    rawWeightedScore: Math.round(rawWeightedScore),
    breakdown,
    improvements,
    fairnessFlags,
    calculatedAt: new Date().toISOString(),
    algorithm: 'Alternative Credit Score v1.0',
    note: 'This score is calculated using transparent, equity-focused criteria. No criminal history, zip codes, or demographic data are used.'
  };
}

/**
 * Calculate rent payment score (0-100)
 */
function calculateRentScore(rentPayments) {
  if (!rentPayments || rentPayments.length === 0) {
    return {
      score: 0,
      details: {
        onTimePercentage: 0,
        totalPayments: 0,
        onTimePayments: 0,
        latePayments: 0,
        missedPayments: 0,
        consistencyStreak: 0
      }
    };
  }

  const { rentFactors } = SCORING_CONFIG;

  const totalPayments = rentPayments.length;
  const onTimePayments = rentPayments.filter(p => p.status === 'on_time').length;
  const latePayments = rentPayments.filter(p => p.status === 'late').length;
  const missedPayments = rentPayments.filter(p => p.status === 'missed').length;

  const onTimePercentage = (onTimePayments / totalPayments) * 100;

  // Calculate consistency streak (consecutive on-time payments from most recent)
  let consistencyStreak = 0;
  const sortedPayments = [...rentPayments].sort((a, b) =>
    new Date(b.paymentDate) - new Date(a.paymentDate)
  );
  for (const payment of sortedPayments) {
    if (payment.status === 'on_time') {
      consistencyStreak++;
    } else {
      break;
    }
  }

  // Calculate score components
  const onTimeScore = onTimePercentage * rentFactors.onTimePercentage;
  const consistencyBonus = Math.min(consistencyStreak * 10, 100) * rentFactors.consistencyBonus;

  const score = Math.min(100, Math.round(onTimeScore + consistencyBonus));

  return {
    score,
    details: {
      onTimePercentage: Math.round(onTimePercentage),
      totalPayments,
      onTimePayments,
      latePayments,
      missedPayments,
      consistencyStreak
    }
  };
}

/**
 * Calculate utility payment score (0-100)
 */
function calculateUtilityScore(utilityPayments) {
  if (!utilityPayments || utilityPayments.length === 0) {
    return {
      score: 0,
      details: {
        onTimePercentage: 0,
        totalPayments: 0,
        utilityTypes: [],
        diversityScore: 0
      }
    };
  }

  const { utilityFactors } = SCORING_CONFIG;

  const totalPayments = utilityPayments.length;
  const onTimePayments = utilityPayments.filter(p => p.status === 'on_time').length;
  const onTimePercentage = (onTimePayments / totalPayments) * 100;

  // Diversity bonus - more utility types = better
  const utilityTypes = [...new Set(utilityPayments.map(p => p.utilityType))];
  const diversityScore = Math.min(utilityTypes.length * 25, 100);

  // Consistency streak
  let consistencyStreak = 0;
  const sortedPayments = [...utilityPayments].sort((a, b) =>
    new Date(b.paymentDate) - new Date(a.paymentDate)
  );
  for (const payment of sortedPayments) {
    if (payment.status === 'on_time') {
      consistencyStreak++;
    } else {
      break;
    }
  }

  // Calculate score
  const onTimeScore = onTimePercentage * utilityFactors.onTimePercentage;
  const diversityBonus = diversityScore * utilityFactors.diversityBonus;
  const consistencyBonus = Math.min(consistencyStreak * 10, 100) * utilityFactors.consistencyBonus;

  const score = Math.min(100, Math.round(onTimeScore + diversityBonus + consistencyBonus));

  return {
    score,
    details: {
      onTimePercentage: Math.round(onTimePercentage),
      totalPayments,
      onTimePayments,
      utilityTypes,
      diversityScore: Math.round(diversityScore),
      consistencyStreak
    }
  };
}

/**
 * Calculate community endorsement score (0-100)
 */
function calculateEndorsementScore(endorsements) {
  if (!endorsements || endorsements.length === 0) {
    return {
      score: 0,
      details: {
        count: 0,
        averageTrustLevel: 0,
        verifiedCount: 0,
        endorserTypes: []
      }
    };
  }

  const { endorsementFactors } = SCORING_CONFIG;

  const count = endorsements.length;
  const verifiedCount = endorsements.filter(e => e.verified).length;
  const averageTrustLevel = endorsements.reduce((sum, e) => sum + e.trustLevel, 0) / count;
  const endorserTypes = [...new Set(endorsements.map(e => e.endorserType))];

  // Count score - up to 5 endorsements for full points
  const countScore = Math.min(count / 5 * 100, 100) * endorsementFactors.count;

  // Trust level score (1-5 scale, normalized to 0-100)
  const trustScore = (averageTrustLevel / 5) * 100 * endorsementFactors.averageTrustLevel;

  // Verified bonus
  const verifiedPercentage = count > 0 ? (verifiedCount / count) * 100 : 0;
  const verifiedBonus = verifiedPercentage * endorsementFactors.verifiedBonus;

  const score = Math.min(100, Math.round(countScore + trustScore + verifiedBonus));

  return {
    score,
    details: {
      count,
      averageTrustLevel: Math.round(averageTrustLevel * 10) / 10,
      verifiedCount,
      verifiedPercentage: Math.round(verifiedPercentage),
      endorserTypes
    }
  };
}

/**
 * Calculate mentorship completion score (0-100)
 */
function calculateMentorshipScore(programs) {
  if (!programs || programs.length === 0) {
    return {
      score: 0,
      details: {
        completionCount: 0,
        programTypes: [],
        verifiedCount: 0
      }
    };
  }

  const { mentorshipFactors } = SCORING_CONFIG;

  const completionCount = programs.length;
  const verifiedCount = programs.filter(p => p.verified).length;
  const programTypes = [...new Set(programs.map(p => p.programType))];

  // Completion score - up to 4 programs for full points
  const completionScore = Math.min(completionCount / 4 * 100, 100) * mentorshipFactors.completionCount;

  // Diversity score - different program types
  const diversityScore = Math.min(programTypes.length / 4 * 100, 100) * mentorshipFactors.programDiversity;

  // Verified bonus
  const verifiedPercentage = completionCount > 0 ? (verifiedCount / completionCount) * 100 : 0;
  const verifiedBonus = verifiedPercentage * mentorshipFactors.verifiedBonus;

  const score = Math.min(100, Math.round(completionScore + diversityScore + verifiedBonus));

  return {
    score,
    details: {
      completionCount,
      programTypes,
      programDiversity: programTypes.length,
      verifiedCount,
      verifiedPercentage: Math.round(verifiedPercentage)
    }
  };
}

/**
 * Generate plain-language explanation for a factor
 */
function generateExplanation(factorType, scoreData, points) {
  const { score, details } = scoreData;

  switch (factorType) {
    case 'rent':
      if (details.totalPayments === 0) {
        return 'No rent payment history on file yet. Adding your rent payments can boost your score.';
      }
      if (score >= 80) {
        return `Your excellent rent payment history added ${points} points to your score. You paid on time ${details.onTimePercentage}% of the time.`;
      } else if (score >= 60) {
        return `Your rent payment history added ${points} points. You have ${details.onTimePercentage}% on-time payments with ${details.latePayments} late payment(s).`;
      } else {
        return `Your rent payments contributed ${points} points. Improving your on-time payment rate could significantly boost your score.`;
      }

    case 'utility':
      if (details.totalPayments === 0) {
        return 'No utility payment history on file yet. Adding your bills can help build your score.';
      }
      if (score >= 80) {
        return `Your consistent utility payments added ${points} points. You manage ${details.utilityTypes.length} different utilities responsibly.`;
      } else if (score >= 60) {
        return `Your utility payments contributed ${points} points. Keeping up with ${details.utilityTypes.join(', ')} bills is helping your score.`;
      } else {
        return `Utility payments added ${points} points. Paying bills on time and adding more utility types can improve this.`;
      }

    case 'endorsement':
      if (details.count === 0) {
        return 'No community endorsements yet. Ask mentors, organizations, or community leaders to vouch for you.';
      }
      if (score >= 80) {
        return `Strong community support added ${points} points! You have ${details.count} endorsements with an average trust level of ${details.averageTrustLevel}/5.`;
      } else if (score >= 60) {
        return `Your ${details.count} community endorsements contributed ${points} points. Getting more verified endorsements can help.`;
      } else {
        return `Community reputation added ${points} points. Building more relationships with local organizations can boost this.`;
      }

    case 'mentorship':
      if (details.completionCount === 0) {
        return 'No completed mentorship programs yet. Finishing a business program could add points to your score.';
      }
      if (score >= 80) {
        return `Your commitment to learning added ${points} points! You have completed ${details.completionCount} programs across ${details.programDiversity} different areas.`;
      } else if (score >= 60) {
        return `Completing ${details.completionCount} program(s) contributed ${points} points. Diversifying into other program types can help.`;
      } else {
        return `Mentorship programs added ${points} points. Completing more verified programs will strengthen your score.`;
      }

    default:
      return `This factor contributed ${points} points to your score.`;
  }
}

/**
 * Check for fairness issues in scoring
 */
function checkFairness(breakdown) {
  const flags = [];
  const { fairnessThreshold, maxScore, minScore } = SCORING_CONFIG;
  const scoreRange = maxScore - minScore;

  // Check if any single factor is disproportionately lowering the score
  for (const [factorKey, factor] of Object.entries(breakdown)) {
    const potentialMax = factor.maxPossiblePoints;
    const actual = factor.pointsEarned;
    const deficit = potentialMax - actual;

    // If this factor's deficit represents more than 40% of the score range
    if (deficit > scoreRange * fairnessThreshold && factor.rawScore < 50) {
      flags.push({
        factor: factorKey,
        severity: 'warning',
        message: `Your ${SCORING_CONFIG.factorLabels[factorKey]} is significantly impacting your score. See improvement suggestions below.`,
        deficit
      });
    }
  }

  return flags;
}

/**
 * Generate improvement suggestions
 */
function generateImprovements(scores, data) {
  const improvements = [];
  const { improvementThresholds } = SCORING_CONFIG;
  const { maxScore, minScore } = SCORING_CONFIG;
  const scoreRange = maxScore - minScore;

  // Rent improvements
  if (scores.rentScore.score < improvementThresholds.lowRentScore) {
    const potentialGain = Math.round(
      ((100 - scores.rentScore.score) * SCORING_CONFIG.weights.rentPayments / 100) * scoreRange * 0.5
    );
    improvements.push({
      factor: 'rentPayments',
      priority: 'high',
      potentialGain,
      suggestion: `Maintaining on-time rent payments for the next 3 months could increase your score by ~${potentialGain} points.`,
      actionable: 'Set up automatic payments or calendar reminders for rent due dates.'
    });
  }

  // Utility improvements
  if (scores.utilityScore.score < improvementThresholds.lowUtilityScore) {
    const potentialGain = Math.round(
      ((100 - scores.utilityScore.score) * SCORING_CONFIG.weights.utilityPayments / 100) * scoreRange * 0.4
    );
    improvements.push({
      factor: 'utilityPayments',
      priority: 'medium',
      potentialGain,
      suggestion: `Adding more utility bill records and paying on time could add ~${potentialGain} points.`,
      actionable: 'Connect your electricity, water, internet, or gas accounts to track payment history.'
    });
  }

  // Endorsement improvements
  if (data.communityEndorsements.length < improvementThresholds.fewEndorsements) {
    const potentialGain = Math.round(
      ((improvementThresholds.fewEndorsements - data.communityEndorsements.length) * 10) *
      SCORING_CONFIG.weights.communityEndorsements
    );
    improvements.push({
      factor: 'communityEndorsements',
      priority: data.communityEndorsements.length === 0 ? 'high' : 'medium',
      potentialGain,
      suggestion: `Getting ${improvementThresholds.fewEndorsements - data.communityEndorsements.length} more community endorsements could add ~${potentialGain} points.`,
      actionable: 'Ask a mentor, community organization, or local leader who knows your work to provide an endorsement.'
    });
  }

  // Mentorship improvements
  if (data.mentorshipPrograms.length < improvementThresholds.fewMentorships) {
    const potentialGain = Math.round(
      ((improvementThresholds.fewMentorships - data.mentorshipPrograms.length) * 15) *
      SCORING_CONFIG.weights.mentorshipCompletion
    );
    improvements.push({
      factor: 'mentorshipCompletion',
      priority: data.mentorshipPrograms.length === 0 ? 'high' : 'medium',
      potentialGain,
      suggestion: `Completing ${improvementThresholds.fewMentorships - data.mentorshipPrograms.length} more mentorship program(s) could increase your score by ~${potentialGain} points.`,
      actionable: 'Look into free business workshops at your local SBDC, community college, or nonprofit.'
    });
  }

  // Sort by potential gain
  improvements.sort((a, b) => b.potentialGain - a.potentialGain);

  return improvements;
}

/**
 * Export individual calculators for testing
 */
export const calculators = {
  calculateRentScore,
  calculateUtilityScore,
  calculateEndorsementScore,
  calculateMentorshipScore
};
