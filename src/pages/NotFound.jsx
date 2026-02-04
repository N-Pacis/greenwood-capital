import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card card">
        <div className="not-found-icon">
          <AlertCircle size={64} strokeWidth={1.5} />
        </div>
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">This page doesn’t exist or has been moved.</p>
        <Link to="/" className="btn btn-primary btn-lg not-found-cta">
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
