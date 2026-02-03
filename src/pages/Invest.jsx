import React from 'react';
import { Target, Map, TrendingUp } from 'lucide-react';
import './Dashboard.css'; // Reuse basic dashboard styles

const InvestDashboard = () => {
    return (
        <div className="dashboard-container container">
            <header className="dashboard-header">
                <h1>Investor Portal</h1>
                <p>Deploy capital for meaningful impact and returns.</p>
            </header>

            <div className="dashboard-grid">
                {/* Portfolio Summary */}
                <div className="card" style={{ gridColumn: 'span 3' }}>
                    <div className="flex-center" style={{ justifyContent: 'space-around' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Total Invested</h3>
                            <span className="score-value">$50,000</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Impact Generated</h3>
                            <span className="score-value text-gradient">25 Jobs</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Avg Return</h3>
                            <span className="score-value">6.5%</span>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="card" style={{ gridColumn: 'span 1' }}>
                    <h3><Target size={20} /> Equity Filters</h3>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>Match your values.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="checkbox-row">
                            <input type="checkbox" checked readOnly /> Woman-Owned
                        </label>
                        <label className="checkbox-row">
                            <input type="checkbox" /> Veteran-Owned
                        </label>
                        <label className="checkbox-row">
                            <input type="checkbox" checked readOnly /> Neighborhood: Bronzeville
                        </label>
                    </div>
                </div>

                {/* Opportunities List */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3>Top Matches</h3>
                    <div className="opportunity-list">
                        <div className="opportunity-item">
                            <div className="opp-info">
                                <h4>Sarah's Bakery</h4>
                                <span className="tag">Woman-Owned</span>
                                <span className="tag">Level 2 Capital</span>
                            </div>
                            <div className="opp-actions">
                                <span className="match-score">98% Match</span>
                                <button className="btn btn-primary btn-sm">Fund $500</button>
                            </div>
                        </div>
                        <div className="opportunity-item">
                            <div className="opp-info">
                                <h4>TechFix Repairs</h4>
                                <span className="tag">Veteran-Owned</span>
                                <span className="tag">Level 1 Capital</span>
                            </div>
                            <div className="opp-actions">
                                <span className="match-score">92% Match</span>
                                <button className="btn btn-primary btn-sm">Fund $200</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InvestDashboard;
