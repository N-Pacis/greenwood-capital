import { SCORING_CONFIG } from '../../config/scoringWeights';

const priorityStyles = {
  high: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700'
  },
  medium: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700'
  },
  low: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    icon: 'text-gray-600',
    badge: 'bg-gray-100 text-gray-700'
  }
};

/**
 * Improvement Tips Component
 * Shows actionable suggestions to help users improve their score
 */
export default function ImprovementTips({ improvements, fairnessFlags }) {
  if ((!improvements || improvements.length === 0) && (!fairnessFlags || fairnessFlags.length === 0)) {
    return (
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-900">You're Doing Great!</h3>
            <p className="text-sm text-green-700">
              Your score is strong across all factors. Keep up the good work!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Fairness Flags */}
      {fairnessFlags && fairnessFlags.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Equity Check</h3>
              {fairnessFlags.map((flag, index) => (
                <p key={index} className="text-sm text-purple-700">
                  {flag.message}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h2 className="font-semibold text-gray-900">Ways to Improve Your Score</h2>
      </div>

      {/* Improvement Cards */}
      <div className="space-y-3">
        {improvements.map((improvement, index) => {
          const styles = priorityStyles[improvement.priority] || priorityStyles.medium;
          const factorLabel = SCORING_CONFIG.factorLabels[improvement.factor];

          return (
            <div
              key={index}
              className={`${styles.bg} rounded-xl p-4 border ${styles.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 ${styles.bg} rounded-lg flex-shrink-0`}>
                  <svg className={`w-5 h-5 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {factorLabel}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      +{improvement.potentialGain} points possible
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium mb-1">
                    {improvement.suggestion}
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Action:</span> {improvement.actionable}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note about transparency */}
      <p className="text-xs text-gray-500 text-center pt-2">
        These suggestions are based on your actual data. We never penalize based on factors outside your control.
      </p>
    </div>
  );
}
