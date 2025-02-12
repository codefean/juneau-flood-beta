import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between true and false
  };

  return (
    <nav className="navigation">
      {/* Hamburger menu toggle */}
      <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
      {/* Menu items */}
      <ul className={isMenuOpen ? 'open' : ''}>
        <li>
          <NavLink to="/flood-levels" activeClassName="active-link">
            Flood Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/flood-forecast" activeClassName="active-link">
            Flood Forecast
          </NavLink>
        </li>
        <li>
          <a href="https://www.arcgis.com/apps/Cascade/index.html?appid=ad88fd5ccd7848139315f42f49343bb5" 
             target="_blank" 
             rel="noopener noreferrer"
             className="external-link">
            Flood Story
          </a>
        </li>
        <li>
          <NavLink to="/glacier-info" activeClassName="active-link">
            Glacier Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
