import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserData } from '../data/mockData';
import { calculateScore } from '../lib/scoreCalculator';

const ScoreContext = createContext(null);

/**
 * Score Context Provider
 *
 * Manages the user's credit score data and calculations.
 * Provides transparent access to all scoring factors and breakdowns.
 */
export function ScoreProvider({ children }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user data from mock data
  const loadUserData = useCallback(async (userId) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const data = getUserData(userId);
    setUserData(data);
    setDisputes(data.disputes || []);

    // Calculate score
    const result = calculateScore(data);
    setScoreResult(result);

    setIsLoading(false);
  }, []);

  // Load user data when user changes - intentional data fetching pattern
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUserData(user.id);
    } else {
      setUserData(null);
      setScoreResult(null);
      setDisputes([]);
    }
  }, [user, loadUserData]);

  // Refresh score (recalculate)
  const refreshScore = useCallback(() => {
    if (userData) {
      const result = calculateScore(userData);
      setScoreResult(result);
    }
  }, [userData]);

  // Submit a dispute
  const submitDispute = useCallback(async (disputeData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newDispute = {
      id: crypto.randomUUID(),
      ...disputeData,
      status: 'submitted',
      resolutionNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setDisputes(prev => [...prev, newDispute]);

    return newDispute;
  }, []);

  // Update dispute status (for demo purposes)
  const updateDisputeStatus = useCallback(async (disputeId, newStatus, notes = null) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    setDisputes(prev => prev.map(d =>
      d.id === disputeId
        ? { ...d, status: newStatus, resolutionNotes: notes, updatedAt: new Date().toISOString() }
        : d
    ));
  }, []);

  // Get data for a specific factor
  const getFactorData = useCallback((factorType) => {
    if (!userData) return null;

    switch (factorType) {
      case 'rentPayments':
        return userData.rentPayments;
      case 'utilityPayments':
        return userData.utilityPayments;
      case 'communityEndorsements':
        return userData.communityEndorsements;
      case 'mentorshipCompletion':
        return userData.mentorshipPrograms;
      default:
        return null;
    }
  }, [userData]);

  const value = {
    userData,
    scoreResult,
    disputes,
    isLoading,
    loadUserData,
    refreshScore,
    submitDispute,
    updateDisputeStatus,
    getFactorData
  };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
