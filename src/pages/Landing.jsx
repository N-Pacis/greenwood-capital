import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, TrendingUp, Users, Scale, LayoutDashboard, Map } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Rebuilding Finance <br />
                            <span className="text-gradient">Equity-First.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Greenwood Capital dismantles the credit paradox for minority entrepreneurs by replacing algorithms of exclusion with community powered capital.
                        </p>
                        <div className="hero-actions">
                            <Link to="/borrow" className="btn btn-primary btn-lg">I Need Capital</Link>
                            <Link to="/invest" className="btn btn-secondary btn-lg">I Want to Invest</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="section problem-section">
                <div className="container">
                    <h2 className="section-title">The Credit Paradox</h2>
                    <p className="section-subtitle">Why traditional systems fail minority entrepreneurs.</p>

                    <div className="grid-3">
                        <div className="feature-card">
                            <ShieldAlert className="card-icon danger" />
                            <h3>Credit Invisibility</h3>
                            <p>45 million Americans have no credit score, systematically excluding them from traditional loans despite reliable bill payment history.</p>
                        </div>
                        <div className="feature-card">
                            <Scale className="card-icon warning" />
                            <h3>Algorithmic Bias</h3>
                            <p>Old FICO models effectively redline entire communities by ignoring rent and utility data while penalizing lack of generational wealth.</p>
                        </div>
                        <div className="feature-card">
                            <Users className="card-icon" />
                            <h3>Network Gaps</h3>
                            <p>Access to investors often depends on "who you know," leaving brilliant founders in investment deserts without capital.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Solution Section */}
            <section className="section solution-section">
                <div className="container">
                    <h2 className="section-title">The Greenwood Capital Solution</h2>

                    <div className="feature-row">
                        <div className="feature-text">
                            <h3>Alternative Credit Scoring</h3>
                            <p>Our transparent algorithm counts what actually matters: rent payments, community reputation, and business mentorship. See exactly how your score is built.</p>
                        </div>
                        <div className="feature-visual">
                            <div className="mock-score-card">
                                <span className="score-label">Greenwood Capital Score</span>
                                <span className="score-value text-gradient">742</span>
                                <div className="score-bar">
                                    <div className="score-progress" style={{ width: '75%' }}></div>
                                </div>
                                <div className="score-factors">
                                    <span>+ Rent History</span>
                                    <span>+ Community Vouch</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="feature-row reverse">
                        <div className="feature-text">
                            <h3>Community Validation Circles</h3>
                            <p>Borrowers form groups of 5-10 businesses that vouch for each other, replacing collateral with social capital and shared accountability.</p>
                        </div>
                        <div className="feature-visual">
                            <div className="mock-circle-visual">
                                <Users size={64} color="var(--color-primary)" />
                                <div className="circle-badge">Trusted Circle</div>
                            </div>
                        </div>
                    </div>

                    <div className="feature-row">
                        <div className="feature-text">
                            <h3>Impact Tracking</h3>
                            <p>Investors can see exactly where their money goes—targeting specific neighborhoods, industries, or demographics to close the wealth gap.</p>
                        </div>
                        <div className="feature-visual">
                            <Map size={80} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <h2>Ready to change the system?</h2>
                    <Link to="/apply" className="btn btn-primary btn-lg">Start Your Journey</Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
