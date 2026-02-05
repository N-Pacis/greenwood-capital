import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import ScoreDashboard from '../components/dashboard/ScoreDashboard';

/**
 * Dashboard Page
 * Main page showing the user's Alternative Credit Score
 */
export default function DashboardPage() {
  const { isAuthenticated, isLoading, checkSession } = useAuth();
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-app">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScoreDashboard />
      </main>
    </div>
  );
}
