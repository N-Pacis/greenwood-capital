import { SCORING_CONFIG } from '../../config/scoringWeights';

const priorityStyles = {
  high: {
    bg: 'bg-panel',
    border: 'border-warning',
    icon: 'text-warning',
    badge: 'bg-panel text-warning'
  },
  medium: {
    bg: 'bg-panel',
    border: 'border-primary',
    icon: 'text-primary',
    badge: 'bg-panel text-primary'
  },
  low: {
    bg: 'bg-panel',
    border: 'border-border',
    icon: 'text-muted',
    badge: 'bg-panel text-muted'
  }
};

/**
 * Improvement Tips Component
 * Shows actionable suggestions to help users improve their score
 */
export default function ImprovementTips({ improvements, fairnessFlags }) {
  if ((!improvements || improvements.length === 0) && (!fairnessFlags || fairnessFlags.length === 0)) {
    return (
      <div className="bg-panel rounded-xl p-6 border border-primary">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-card rounded-lg border border-border">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-main font-heading">You're Doing Great!</h3>
            <p className="text-sm text-muted">
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
        <div className="bg-panel rounded-xl p-4 border border-innovation">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-card rounded-lg flex-shrink-0 border border-border">
              <svg className="w-5 h-5 text-innovation" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-main mb-1 font-heading">Equity Check</h3>
              {fairnessFlags.map((flag, index) => (
                <p key={index} className="text-sm text-muted">
                  {flag.message}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h2 className="font-semibold text-main font-heading">Ways to Improve Your Score</h2>
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
                    <span className="text-xs text-primary font-medium">
                      +{improvement.potentialGain} points possible
                    </span>
                  </div>
                  <p className="text-sm text-main font-medium mb-1">
                    {improvement.suggestion}
                  </p>
                  <p className="text-xs text-muted">
                    <span className="font-medium">Action:</span> {improvement.actionable}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note about transparency */}
      <p className="text-xs text-muted text-center pt-2">
        These suggestions are based on your actual data. We never penalize based on factors outside your control.
      </p>
    </div>
  );
}
