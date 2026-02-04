import { useState } from 'react';
import { SCORING_CONFIG, formatWeight } from '../../config/scoringWeights';
import Modal from '../common/Modal';

const factorIcons = {
  rentPayments: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  utilityPayments: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  communityEndorsements: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  mentorshipCompletion: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
};

/**
 * Factor Card Component
 * Shows a scoring factor with its contribution and allows drilling down into details
 */
export default function FactorCard({ factorKey, data, rawData, onDispute }) {
  const [showDetails, setShowDetails] = useState(false);

  const label = SCORING_CONFIG.factorLabels[factorKey];
  const description = SCORING_CONFIG.factorDescriptions[factorKey];
  const weight = SCORING_CONFIG.weights[factorKey];
  const percentage = data.rawScore;

  // Determine color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500' };
    if (score >= 60) return { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-500' };
    if (score >= 40) return { bg: 'bg-yellow-50', text: 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: 'bg-gray-50', text: 'text-gray-700', bar: 'bg-gray-400' };
  };

  const colors = getScoreColor(percentage);

  return (
    <>
      <div
        className={`${colors.bg} rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer`}
        onClick={() => setShowDetails(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowDetails(true)}
        aria-label={`View details for ${label}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
              {factorIcons[factorKey]}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">{label}</h3>
              <p className="text-xs text-gray-500">Weight: {formatWeight(weight)}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-lg font-bold ${colors.text}`}>+{data.pointsEarned}</span>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Factor Score</span>
            <span>{percentage}/100</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Explanation */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {data.explanation}
        </p>

        {/* Click hint */}
        <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Click to see data sources and dispute
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={label}
        size="lg"
      >
        <div className="space-y-6">
          {/* Weight explanation */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-1">How This Factor Works</h4>
            <p className="text-sm text-blue-700">{description}</p>
            <p className="text-sm text-blue-600 mt-2">
              This factor accounts for <strong>{formatWeight(weight)}</strong> of your total score.
            </p>
          </div>

          {/* Score breakdown */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
            <div className="grid grid-cols-2 gap-3">
              <ScoreDetail label="Factor Score" value={`${data.rawScore}/100`} />
              <ScoreDetail label="Points Earned" value={`+${data.pointsEarned}`} />
              <ScoreDetail label="Max Possible" value={`+${data.maxPossiblePoints}`} />
              <ScoreDetail label="Data Source" value={data.dataSource} />
            </div>
          </div>

          {/* Raw data preview */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Your Data ({rawData?.length || 0} records)</h4>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
              {rawData && rawData.length > 0 ? (
                <table className="w-full text-sm">
                  <tbody>
                    {rawData.slice(0, 5).map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2 text-gray-600">
                          {renderDataItem(factorKey, item)}
                        </td>
                      </tr>
                    ))}
                    {rawData.length > 5 && (
                      <tr>
                        <td className="px-3 py-2 text-gray-400 text-center">
                          +{rawData.length - 5} more records
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="px-3 py-4 text-gray-500 text-center">No data on file</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setShowDetails(false);
                onDispute?.(factorKey);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Dispute This Data
            </button>
            <button
              onClick={() => setShowDetails(false)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function ScoreDetail({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

function renderDataItem(factorKey, item) {
  switch (factorKey) {
    case 'rentPayments':
      return (
        <div className="flex justify-between items-center">
          <span>{item.landlordName} - ${item.amount}</span>
          <StatusBadge status={item.status} />
        </div>
      );
    case 'utilityPayments':
      return (
        <div className="flex justify-between items-center">
          <span className="capitalize">{item.utilityType} - ${item.amount}</span>
          <StatusBadge status={item.status} />
        </div>
      );
    case 'communityEndorsements':
      return (
        <div className="flex justify-between items-center">
          <span>{item.endorserName} ({item.endorserType.replace('_', ' ')})</span>
          <span className="text-yellow-600">{'★'.repeat(item.trustLevel)}</span>
        </div>
      );
    case 'mentorshipCompletion':
      return (
        <div className="flex justify-between items-center">
          <span>{item.programName}</span>
          {item.verified && <span className="text-green-600 text-xs">Verified</span>}
        </div>
      );
    default:
      return JSON.stringify(item);
  }
}

function StatusBadge({ status }) {
  const statusStyles = {
    on_time: 'bg-green-100 text-green-700',
    late: 'bg-yellow-100 text-yellow-700',
    missed: 'bg-red-100 text-red-700'
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
