import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScore } from '../context/ScoreContext';
import Header from '../components/common/Header';
import DisputeForm from '../components/disputes/DisputeForm';
import DisputeList from '../components/disputes/DisputeList';

/**
 * Disputes Page
 * Allows users to submit and track disputes for their scoring data
 */
export default function DisputesPage() {
  const { isAuthenticated, isLoading: authLoading, checkSession } = useAuth();
  const { disputes, updateDisputeStatus } = useScore();
  const navigate = useNavigate();
  const location = useLocation();

  // Get prefilled factor from navigation state
  const prefillFactor = location.state?.prefillFactor;

  const [showForm, setShowForm] = useState(!!prefillFactor);
  const [successMessage, setSuccessMessage] = useState(null);

  // Check for existing session on mount and clear navigation state
  useEffect(() => {
    checkSession();
    // Clear the navigation state to prevent re-showing on refresh
    if (prefillFactor) {
      window.history.replaceState({}, document.title);
    }
  }, [checkSession, prefillFactor]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleDisputeSuccess = () => {
    setShowForm(false);
    setSuccessMessage('Your dispute has been submitted successfully. We will review it and get back to you.');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dispute Center</h1>
          <p className="text-gray-600">
            If you believe any of your scoring data is incorrect, you can submit a dispute here.
            We'll review your claim and update your score if appropriate.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-500 hover:text-green-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* New Dispute Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Submit a Dispute</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                New Dispute
              </button>
            )}
          </div>

          {showForm ? (
            <div className="p-6">
              <DisputeForm
                prefillFactor={prefillFactor}
                onSuccess={handleDisputeSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Click "New Dispute" to submit a correction request</p>
            </div>
          )}
        </div>

        {/* Your Disputes Section */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Your Disputes</h2>
          <DisputeList
            disputes={disputes}
            onUpdateStatus={updateDisputeStatus}
          />
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="space-y-3 text-sm text-blue-700">
            <p>
              <strong>What can I dispute?</strong> You can dispute any data point used in your
              score calculation - rent payments, utility bills, endorsements, or mentorship records.
            </p>
            <p>
              <strong>What happens after I submit?</strong> Our team will review your dispute within
              5 business days. You'll receive a notification when a decision is made.
            </p>
            <p>
              <strong>What documents should I include?</strong> Bank statements, receipts, or any
              proof that supports your claim. The more documentation, the faster we can resolve your dispute.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
