import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <a href="https://akcasc.org/" target="_blank" rel="noopener noreferrer">
        <img src="/AK CASC horiz white.png" alt="Alaska Climate Adaptation Science Center Logo" className="header-logo" />
      </a>
      <div>
        <h1>Mendenhall Glacier Flood Tracker</h1>
      </div>
    </header>
  );
};

export default Header;

