import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Login Component
 * For demo purposes, allows quick login as different user personas
 */
export default function Login() {
  const { loginWithEmail, getDemoUsers, switchUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(true);

  const demoUsers = getDemoUsers();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    await loginWithEmail(email);
    navigate('/dashboard');
  };

  const handleDemoLogin = async (userId) => {
    await switchUser(userId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">AC</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Alternative Credit Score
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          See your score based on what really matters
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-xl sm:px-10 border border-gray-100">
          {/* Demo user quick login */}
          {showDemoUsers && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Start - Choose a Demo Profile</p>
              <div className="space-y-2">
                {demoUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user.id)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.persona}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <button
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="px-2 bg-white text-gray-500 hover:text-gray-700"
              >
                {showDemoUsers ? 'Or sign in with email' : 'Use demo profiles'}
              </button>
            </div>
          </div>

          {/* Email login form */}
          {!showDemoUsers && (
            <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Continue'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                For demo purposes, any email will work
              </p>
            </form>
          )}
        </div>

        {/* Info box */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 mx-4 sm:mx-0">
          <h3 className="text-sm font-medium text-blue-900 mb-2">About This Demo</h3>
          <p className="text-xs text-blue-700">
            This Alternative Credit Scoring system uses non-traditional indicators like rent payments,
            utility bills, community endorsements, and mentorship completion. No credit history,
            criminal records, or zip codes are used.
          </p>
        </div>
      </div>
    </div>
  );
}
