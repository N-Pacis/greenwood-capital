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
    <div className="min-h-screen bg-app flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-heading">
            <span className="text-white font-bold text-2xl">GC</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-main font-heading">
          Greenwood Capital
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          See your score based on what really matters
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-sm rounded-xl sm:px-10 border border-border">
          {/* Demo user quick login */}
          {showDemoUsers && (
            <div className="mb-6">
              <p className="text-sm font-medium text-main mb-3">Quick Start - Choose a Demo Profile</p>
              <div className="space-y-2">
                {demoUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user.id)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:border-accent hover:bg-panel transition-all text-left disabled:opacity-50"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-main truncate">{user.fullName}</p>
                      <p className="text-xs text-muted truncate">{user.persona}</p>
                    </div>
                    <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <button
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="px-2 bg-card text-muted hover:text-main"
              >
                {showDemoUsers ? 'Or sign in with email' : 'Use demo profiles'}
              </button>
            </div>
          </div>

          {/* Email login form */}
          {!showDemoUsers && (
            <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-main">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-border rounded-lg bg-app text-main focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full py-2 px-4 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-heading"
              >
                {isLoading ? 'Signing in...' : 'Continue'}
              </button>
              <p className="text-xs text-muted text-center">
                For demo purposes, any email will work
              </p>
            </form>
          )}
        </div>

        {/* Info box */}
        <div className="mt-6 bg-panel rounded-xl p-4 mx-4 sm:mx-0 border border-border">
          <h3 className="text-sm font-medium text-main mb-2 font-heading">About This Demo</h3>
          <p className="text-xs text-muted">
            This Alternative Credit Scoring system uses non-traditional indicators like rent payments,
            utility bills, community endorsements, and mentorship completion. No credit history,
            criminal records, or zip codes are used.
          </p>
        </div>
      </div>
    </div>
  );
}
