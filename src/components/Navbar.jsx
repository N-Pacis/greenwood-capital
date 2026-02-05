import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Landmark className="logo-icon" />
          <span>Greenwood Capital</span>
        </Link>

        <div className="navbar-links desktop">
          {isHome ? (
            <>
              <a href="#how-it-works" className="nav-link">How it works</a>
              <a href="#transparency" className="nav-link">Transparency</a>
            </>
          ) : (
            <Link to="/" className="nav-link">Home</Link>
          )}
          <Link to="/login" className="nav-link">Sign In</Link>
          <Link to="/login" className="btn btn-primary btn-sm">Get Started</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {isHome ? (
            <>
              <a href="#how-it-works" className="nav-link" onClick={() => setIsOpen(false)}>How it works</a>
              <a href="#transparency" className="nav-link" onClick={() => setIsOpen(false)}>Transparency</a>
            </>
          ) : (
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          )}
          <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-primary">Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
