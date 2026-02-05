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
    <header className="bg-panel border-b border-border sticky top-0 z-50 font-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <span className="font-semibold text-main hidden sm:block">
              Greenwood Capital
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
                      ? 'bg-card text-primary'
                      : 'text-muted hover:text-main hover:bg-card'
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:border-muted transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="text-sm text-main hidden sm:block">{user.fullName}</span>
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-1 w-64 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2 border-b border-border">
                    <p className="text-xs text-muted px-2 py-1">Switch Demo User</p>
                    {demoUsers.map(demoUser => (
                      <button
                        key={demoUser.id}
                        onClick={() => switchUser(demoUser.id)}
                        className={`w-full text-left px-2 py-2 rounded-md flex items-center gap-2 hover:bg-panel ${
                          user.id === demoUser.id ? 'bg-panel' : ''
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: demoUser.avatarColor }}
                        >
                          {demoUser.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-main truncate">{demoUser.fullName}</p>
                          <p className="text-xs text-muted truncate">{demoUser.persona}</p>
                        </div>
                        {user.id === demoUser.id && (
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-2 py-2 rounded-md text-sm text-danger hover:bg-panel"
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
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
