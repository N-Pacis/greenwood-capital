import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import BorrowDashboard from './pages/Borrow';
import InvestDashboard from './pages/Invest';
import Apply from './pages/Apply';
import Login from './pages/Login';

// Layout wrapper to conditionally show Footer or handle layout specifics
const Layout = ({ children }) => {
  return (
    <div className="app-min-h">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border-subtle)',
    padding: '2rem 0',
    textAlign: 'center',
    color: 'var(--text-muted)',
    marginTop: 'auto'
  }}>
    <div className="container">
      <p>&copy; 2024 BuildPath. Reimagining Credit.</p>
    </div>
  </footer>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/borrow" element={<BorrowDashboard />} />
          <Route path="/invest" element={<InvestDashboard />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
