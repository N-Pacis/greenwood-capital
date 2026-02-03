import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('borrower');

    const handleLogin = (e) => {
        e.preventDefault();
        if (role === 'borrower') navigate('/borrow');
        else navigate('/invest');
    };

    return (
        <div className="login-container">
            <div className="login-card card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>

                <div className="role-switch">
                    <button
                        className={`role-btn ${role === 'borrower' ? 'active' : ''}`}
                        onClick={() => setRole('borrower')}
                    >
                        Borrower
                    </button>
                    <button
                        className={`role-btn ${role === 'investor' ? 'active' : ''}`}
                        onClick={() => setRole('investor')}
                    >
                        Investor
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input-field" defaultValue="demo@buildpath.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="input-field" defaultValue="password" />
                    </div>
                    <button type="submit" className="btn btn-primary full-width">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
