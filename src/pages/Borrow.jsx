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
                    <h3>Greenwood Capital Score</h3>
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

            {/* Score Insights – transparent breakdown */}
            <section className="transparency-section">
                <h3><AlertCircle size={20} /> Score Insights</h3>
                <p>We believe in full transparency. Here is exactly how your score was calculated this month.</p>

                <div className="score-insights-content">
                    <div className="score-factors-table-wrap">
                        <table className="score-factors-table">
                            <thead>
                                <tr>
                                    <th>Factor</th>
                                    <th>Points</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rent Payments</td>
                                    <td className="points good">+20</td>
                                    <td><span className="badge good">Excellent</span></td>
                                </tr>
                                <tr>
                                    <td>Utilities</td>
                                    <td className="points good">+5</td>
                                    <td><span className="badge good">On time</span></td>
                                </tr>
                                <tr>
                                    <td>Circle Validation</td>
                                    <td className="points good">+50</td>
                                    <td><span className="badge good">Verified (5/5)</span></td>
                                </tr>
                                <tr>
                                    <td>Business Cashflow</td>
                                    <td className="points average">+17</td>
                                    <td><span className="badge average">Improving</span></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>Total added this month</strong></td>
                                    <td className="points text-gradient"><strong>+92</strong></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="score-chart-wrap">
                        <h4>Contribution by factor</h4>
                        <div className="score-chart">
                            <div className="score-chart-bar" data-label="Rent Payments" style={{ '--pct': '22' }}>
                                <span className="bar-fill" />
                                <span className="bar-label">Rent (+20)</span>
                            </div>
                            <div className="score-chart-bar" data-label="Utilities" style={{ '--pct': '5' }}>
                                <span className="bar-fill" />
                                <span className="bar-label">Utilities (+5)</span>
                            </div>
                            <div className="score-chart-bar" data-label="Circle Validation" style={{ '--pct': '54' }}>
                                <span className="bar-fill" />
                                <span className="bar-label">Circle (+50)</span>
                            </div>
                            <div className="score-chart-bar" data-label="Business Cashflow" style={{ '--pct': '18' }}>
                                <span className="bar-fill average" />
                                <span className="bar-label">Cashflow (+17)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BorrowDashboard;
