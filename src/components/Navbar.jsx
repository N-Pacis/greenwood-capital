import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Landmark } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Landmark className="logo-icon" />
          <span>Greenwood Capital</span>
        </Link>
        
        <div className="navbar-links desktop">
          <Link to="/borrow" className="nav-link">For Borrowers</Link>
          <Link to="/invest" className="nav-link">For Investors</Link>
          <Link to="/login" className="nav-link">Sign In</Link>
          <Link to="/apply" className="btn btn-primary btn-sm">Get Started</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="/borrow" onClick={() => setIsOpen(false)}>For Borrowers</Link>
          <Link to="/invest" onClick={() => setIsOpen(false)}>For Investors</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
          <Link to="/apply" onClick={() => setIsOpen(false)} className="btn btn-primary">Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
