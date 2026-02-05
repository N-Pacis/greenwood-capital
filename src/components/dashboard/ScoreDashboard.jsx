import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useScore } from '../../context/ScoreContext';
import { SCORING_CONFIG, formatWeight } from '../../config/scoringWeights';
import ScoreCircle from './ScoreCircle';
import FactorCard from './FactorCard';
import ImprovementTips from './ImprovementTips';

/**
 * Main Score Dashboard Component
 * Displays the user's Alternative Credit Score with full transparency
 */
export default function ScoreDashboard() {
  const { user } = useAuth();
  const { scoreResult, isLoading, getFactorData } = useScore();
  const navigate = useNavigate();
  const [showWeightsInfo, setShowWeightsInfo] = useState(false);

  if (isLoading || !scoreResult) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Calculating your score...</p>
        </div>
      </div>
    );
  }

  const handleDispute = (factorKey) => {
    navigate('/disputes', { state: { prefillFactor: factorKey } });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {user?.fullName?.split(' ')[0]}
            </h1>
            <p className="text-blue-100 text-sm">
              {user?.persona} - Your Alternative Credit Score is ready
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {new Date(scoreResult.calculatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Main Score Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Score Circle */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
              Your Alternative Credit Score
            </h2>
            <ScoreCircle
              score={scoreResult.totalScore}
              tier={scoreResult.tier}
            />
          </div>
        </div>

        {/* Algorithm Transparency */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">How Your Score is Calculated</h2>
              <button
                onClick={() => setShowWeightsInfo(!showWeightsInfo)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {showWeightsInfo ? 'Hide' : 'Show'} weights
                <svg className={`w-4 h-4 transition-transform ${showWeightsInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Weights breakdown */}
            {showWeightsInfo && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Your score is calculated by combining four factors, each with a specific weight:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(SCORING_CONFIG.weights).map(([key, weight]) => (
                    <div key={key} className="flex items-center justify-between bg-white rounded px-3 py-2">
                      <span className="text-sm text-gray-700">{SCORING_CONFIG.factorLabels[key]}</span>
                      <span className="text-sm font-medium text-blue-600">{formatWeight(weight)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  These weights can be adjusted by platform administrators to reflect community values.
                </p>
              </div>
            )}

            {/* Score formula visualization */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 overflow-x-auto pb-2">
              <span className="font-medium text-gray-900">Formula:</span>
              {Object.entries(SCORING_CONFIG.weights).map(([key, weight], index) => (
                <span key={key} className="flex items-center gap-1 whitespace-nowrap">
                  {index > 0 && <span className="text-gray-400">+</span>}
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {SCORING_CONFIG.factorLabels[key].split(' ')[0]} × {formatWeight(weight)}
                  </span>
                </span>
              ))}
            </div>

            {/* Points breakdown */}
            <div className="space-y-2">
              {Object.entries(scoreResult.breakdown).map(([key, data]) => {
                const maxPoints = data.maxPossiblePoints;
                const earnedPoints = data.pointsEarned;
                const percentage = (earnedPoints / maxPoints) * 100;

                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 truncate">
                      {SCORING_CONFIG.factorLabels[key]}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-24 text-right">
                      +{earnedPoints} / {maxPoints}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <span className="font-medium text-gray-900">Total Score</span>
              <span className="text-xl font-bold text-blue-600">{scoreResult.totalScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Factor Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown by Factor</h2>
        <p className="text-sm text-gray-600 mb-4">
          Click any factor to see your data sources and submit a dispute if something looks incorrect.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(scoreResult.breakdown).map(([key, data]) => (
            <FactorCard
              key={key}
              factorKey={key}
              data={data}
              rawData={getFactorData(key)}
              onDispute={handleDispute}
            />
          ))}
        </div>
      </div>

      {/* Improvement Tips */}
      <div>
        <ImprovementTips
          improvements={scoreResult.improvements}
          fairnessFlags={scoreResult.fairnessFlags}
        />
      </div>

      {/* Transparency Notice */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-200 rounded-lg flex-shrink-0">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Our Commitment to Transparency</h3>
            <p className="text-sm text-gray-600">
              This Alternative Credit Score uses only the factors shown above. We never use criminal history,
              zip code-based penalization, or demographic inference. Every calculation is visible and
              can be disputed. This system exists to value community trust, consistency, and effort — not historical exclusion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
