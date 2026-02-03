import React from 'react';
import { CreditCard, Users, BookOpen, AlertCircle } from 'lucide-react';
import './Dashboard.css';

const BorrowDashboard = () => {
    return (
        <div className="dashboard-container container">
            <header className="dashboard-header">
                <h1>Welcome back, Marcus</h1>
                <p>Your financial journey is on track.</p>
            </header>

            <div className="dashboard-grid">
                {/* Main Score Card */}
                <div className="card score-card-main">
                    <h3>BuildPath Score</h3>
                    <div className="score-display">
                        <span className="score-number text-gradient">742</span>
                        <span className="score-trend">+15 this month</span>
                    </div>
                    <div className="score-breakdown">
                        <div className="factor">
                            <span>Rent Payments</span>
                            <span className="good">Excellent</span>
                        </div>
                        <div className="factor">
                            <span>Community Vouch</span>
                            <span className="good">Verified (5/5)</span>
                        </div>
                        <div className="factor">
                            <span>Business Cashflow</span>
                            <span className="average">Improving</span>
                        </div>
                    </div>
                    <button className="btn btn-secondary full-width">View Full Report</button>
                </div>

                {/* Current Loan Status */}
                <div className="card loan-status-card">
                    <h3>Active Microloan</h3>
                    <div className="loan-amount">$2,000</div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '40%' }}></div>
                    </div>
                    <p className="repayment-text">40% Repaid • Next payment due in 5 days</p>
                    <button className="btn btn-primary full-width">Make Payment</button>
                </div>

                {/* Validation Circle */}
                <div className="card circle-card">
                    <h3><Users size={20} /> Validation Circle</h3>
                    <p>Your circle "Uptown Innovators" is active.</p>
                    <div className="circle-members">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="member-avatar" title={`Member ${i}`}></div>
                        ))}
                    </div>
                    <button className="btn btn-secondary btn-sm">Manage Circle</button>
                </div>

                {/* Education */}
                <div className="card education-card">
                    <h3><BookOpen size={20} /> Locked: Level 2 Capital</h3>
                    <p>Complete "Financial Statements 101" to unlock up to $5,000.</p>
                    <button className="btn btn-primary btn-sm">Start Module</button>
                </div>
            </div>

            {/* Dispute / Transparency Section */}
            <section className="transparency-section">
                <h3><AlertCircle size={20} /> Score Insights</h3>
                <p>We believe in full transparency. Here is exactly how your score was calculated this month.</p>
                {/* Placeholder for table/graph */}
                <div className="transparency-placeholder">
                    Calculation Log: Rent(+20), Utilities(+5), Circle Validation(+50)...
                </div>
            </section>
        </div>
    );
};

export default BorrowDashboard;
