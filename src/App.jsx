import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ScoreProvider } from './context/ScoreContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DisputesPage from './pages/DisputesPage';
import Login from './components/auth/Login';

/**
 * Alternative Credit Scoring Application
 *
 * An equity-first credit scoring system that values:
 * - Rent payment history
 * - Utility bill payments
 * - Community endorsements
 * - Business mentorship completion
 *
 * This system deliberately excludes:
 * - Criminal history
 * - Zip code-based penalization
 * - Demographic inference
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <ScoreProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/disputes" element={<DisputesPage />} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScoreProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
