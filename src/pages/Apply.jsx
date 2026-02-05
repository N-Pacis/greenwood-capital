import React, { useState } from 'react';
import { Home, Lightbulb } from 'lucide-react';
import './Apply.css';

const Apply = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="apply-container container">
            <div className="apply-card card">
                <div className="progress-indicators">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Basics</div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Alternative Data</div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Validation Circle</div>
                </div>

                {step === 1 && (
                    <div className="form-step fade-in">
                        <h2>Let's get started.</h2>
                        <p className="text-muted">Tell us about you and your business.</p>

                        <div className="form-group">
                            <label>Business Name</label>
                            <input type="text" className="input-field" placeholder="e.g. Sarah's Bakery" />
                        </div>
                        <div className="form-group">
                            <label>Industry</label>
                            <select className="input-field">
                                <option>Retail</option>
                                <option>Food & Bev</option>
                                <option>Tech Services</option>
                            </select>
                        </div>
                        <div className="form-action">
                            <button className="btn btn-primary" onClick={() => setStep(2)}>Next: Add Alternative Data</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step fade-in">
                        <h2>Beyond the Credit Score.</h2>
                        <p className="text-muted">We use real data to approve you, not just history.</p>

                        <div className="data-source-row">
                            <div className="source-icon">
                                <Home className="w-6 h-6 text-primary" />
                            </div>
                            <div className="source-info">
                                <h4>Rent History</h4>
                                <p>Connect your rental portal or upload last 12 months receipts.</p>
                            </div>
                            <button className="btn btn-secondary btn-sm">Connect</button>
                        </div>

                        <div className="data-source-row">
                            <div className="source-icon">
                                <Lightbulb className="w-6 h-6 text-primary" />
                            </div>
                            <div className="source-info">
                                <h4>Utility Payments</h4>
                                <p>Demonstrate reliability with your electricity/internet bills.</p>
                            </div>
                            <button className="btn btn-secondary btn-sm">Connect</button>
                        </div>

                        <div className="form-action">
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                            <button className="btn btn-primary" onClick={() => setStep(3)}>Next: Validation Circle</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step fade-in">
                        <h2>Community Trust.</h2>
                        <p className="text-muted">Invite 3-5 peers to vouch for your character.</p>

                        <div className="form-group">
                            <label>Invite by Email</label>
                            <input type="email" className="input-field" placeholder="peer@business.com" />
                        </div>

                        <div className="form-action">
                            <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                            <button className="btn btn-primary" onClick={() => alert("Application Submitted!")}>Submit Application</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Apply;
