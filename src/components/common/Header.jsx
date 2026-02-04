import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout, getDemoUsers, switchUser } = useAuth();
  const location = useLocation();
  const demoUsers = getDemoUsers();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/disputes', label: 'Disputes' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">
              Alternative Credit
            </span>
          </Link>

          {/* Navigation */}
          {user && (
            <nav className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Demo User Switcher */}
              <div className="relative group">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700 hidden sm:block">{user.fullName}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 px-2 py-1">Switch Demo User</p>
                    {demoUsers.map(demoUser => (
                      <button
                        key={demoUser.id}
                        onClick={() => switchUser(demoUser.id)}
                        className={`w-full text-left px-2 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50 ${
                          user.id === demoUser.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: demoUser.avatarColor }}
                        >
                          {demoUser.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{demoUser.fullName}</p>
                          <p className="text-xs text-gray-500 truncate">{demoUser.persona}</p>
                        </div>
                        {user.id === demoUser.id && (
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-2 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
