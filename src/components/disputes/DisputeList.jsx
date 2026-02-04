import { SCORING_CONFIG } from '../../config/scoringWeights';
import DisputeStatus from './DisputeStatus';

/**
 * Dispute List Component
 * Shows all disputes submitted by the user with their current status
 */
export default function DisputeList({ disputes, onUpdateStatus }) {
  if (!disputes || disputes.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Disputes Yet</h3>
        <p className="text-sm text-gray-500">
          If you believe any of your scoring data is incorrect, you can submit a dispute above.
        </p>
      </div>
    );
  }

  // Sort by most recent first
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-4">
      {sortedDisputes.map(dispute => (
        <DisputeCard
          key={dispute.id}
          dispute={dispute}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}

function DisputeCard({ dispute, onUpdateStatus }) {
  const factorLabel = SCORING_CONFIG.factorLabels[dispute.factorType] || dispute.factorType;
  const createdDate = new Date(dispute.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900">{factorLabel}</span>
          <DisputeStatus status={dispute.status} />
        </div>
        <span className="text-xs text-gray-500">Submitted {createdDate}</span>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-3">{dispute.reason}</p>

        {/* Document attachment */}
        {dispute.supportingDocumentUrl && (
          <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>Document attached</span>
          </div>
        )}

        {/* Resolution notes (if resolved) */}
        {dispute.status === 'resolved' && dispute.resolutionNotes && (
          <div className="bg-green-50 rounded-lg p-3 mt-3">
            <p className="text-xs font-medium text-green-800 mb-1">Resolution</p>
            <p className="text-sm text-green-700">{dispute.resolutionNotes}</p>
          </div>
        )}

        {dispute.status === 'rejected' && dispute.resolutionNotes && (
          <div className="bg-red-50 rounded-lg p-3 mt-3">
            <p className="text-xs font-medium text-red-800 mb-1">Decision</p>
            <p className="text-sm text-red-700">{dispute.resolutionNotes}</p>
          </div>
        )}

        {/* Demo controls (for testing) */}
        {(dispute.status === 'submitted' || dispute.status === 'under_review') && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Demo: Simulate status change</p>
            <div className="flex gap-2">
              {dispute.status === 'submitted' && (
                <button
                  onClick={() => onUpdateStatus?.(dispute.id, 'under_review')}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Start Review
                </button>
              )}
              {dispute.status === 'under_review' && (
                <>
                  <button
                    onClick={() => onUpdateStatus?.(dispute.id, 'resolved', 'Your dispute has been verified and your score has been adjusted.')}
                    className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onUpdateStatus?.(dispute.id, 'rejected', 'After review, the original data was confirmed to be accurate.')}
                    className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status timeline */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <StatusTimeline status={dispute.status} />
      </div>
    </div>
  );
}

function StatusTimeline({ status }) {
  const steps = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'resolved', label: 'Resolved' }
  ];

  // Handle rejected as a variation of resolved
  const statusIndex = status === 'rejected'
    ? 2
    : steps.findIndex(s => s.key === status);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index <= statusIndex;
        const isCurrent = index === statusIndex;
        const isRejected = status === 'rejected' && index === 2;

        return (
          <div key={step.key} className="flex items-center flex-1">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isRejected
                    ? 'bg-red-500 text-white'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted && !isRejected ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : isRejected ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs mt-1 ${isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                {isRejected ? 'Rejected' : step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < statusIndex ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
