import { useState } from 'react';
import { SCORING_CONFIG } from '../../config/scoringWeights';
import { useScore } from '../../context/ScoreContext';

const factorOptions = Object.entries(SCORING_CONFIG.factorLabels).map(([key, label]) => ({
  value: key,
  label
}));

/**
 * Dispute Form Component
 * Allows users to submit disputes with explanation and optional document upload
 */
export default function DisputeForm({ prefillFactor, onSuccess, onCancel }) {
  const { submitDispute, getFactorData } = useScore();
  const [formData, setFormData] = useState({
    factorType: prefillFactor || '',
    reason: '',
    documentName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const selectedFactorData = formData.factorType ? getFactorData(formData.factorType) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.factorType) {
      setError('Please select which factor you want to dispute');
      return;
    }

    if (!formData.reason.trim()) {
      setError('Please explain why you believe this data is incorrect');
      return;
    }

    if (formData.reason.trim().length < 20) {
      setError('Please provide more detail in your explanation (at least 20 characters)');
      return;
    }

    setIsSubmitting(true);

    try {
      const dispute = await submitDispute({
        factorType: formData.factorType,
        factorId: null, // In a real app, this would reference specific data
        reason: formData.reason.trim(),
        supportingDocumentUrl: formData.documentName ? `/uploads/${formData.documentName}` : null
      });

      onSuccess?.(dispute);
    } catch {
      setError('Failed to submit dispute. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase Storage
      setFormData(prev => ({ ...prev, documentName: file.name }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Factor selection */}
      <div>
        <label htmlFor="factorType" className="block text-sm font-medium text-gray-700 mb-2">
          Which factor do you want to dispute?
        </label>
        <select
          id="factorType"
          value={formData.factorType}
          onChange={(e) => setFormData(prev => ({ ...prev, factorType: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a factor...</option>
          {factorOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Show relevant data for selected factor */}
      {selectedFactorData && selectedFactorData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Your {SCORING_CONFIG.factorLabels[formData.factorType]} Data
          </h4>
          <p className="text-xs text-gray-500 mb-2">
            Review the data below. Your dispute will be reviewed against these records.
          </p>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {selectedFactorData.slice(0, 5).map((item, index) => (
              <div key={index} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                {formatDataItem(formData.factorType, item)}
              </div>
            ))}
            {selectedFactorData.length > 5 && (
              <p className="text-xs text-gray-400">+{selectedFactorData.length - 5} more records</p>
            )}
          </div>
        </div>
      )}

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
          Why do you believe this data is incorrect?
        </label>
        <textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Please explain in detail what you believe is incorrect and why. Include specific dates or amounts if applicable."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.reason.length}/500 characters
        </p>
      </div>

      {/* Document upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supporting Documentation (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          {formData.documentName ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">{formData.documentName}</span>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, documentName: '' }))}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600 mb-1">
                Upload bank statements, receipts, or other proof
              </p>
              <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
                Choose file
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">PDF, JPG, or PNG up to 10MB</p>
            </>
          )}
        </div>
      </div>

      {/* What happens next */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Your dispute will be marked as "Submitted"</li>
          <li>Our team will review your explanation and any documents</li>
          <li>You'll be notified when the review is complete</li>
          <li>If approved, your score will be updated automatically</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Dispute'
          )}
        </button>
      </div>
    </form>
  );
}

function formatDataItem(factorType, item) {
  switch (factorType) {
    case 'rentPayments':
      return `${item.landlordName} - $${item.amount} (${item.status.replace('_', ' ')})`;
    case 'utilityPayments':
      return `${item.utilityType} - $${item.amount} (${item.status.replace('_', ' ')})`;
    case 'communityEndorsements':
      return `${item.endorserName} - ${item.endorserType.replace('_', ' ')}`;
    case 'mentorshipCompletion':
      return `${item.programName} - ${item.organization}`;
    default:
      return JSON.stringify(item);
  }
}
