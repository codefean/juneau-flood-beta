import React, { useState } from 'react';
import './FloodStageMenu.css';

const FloodStageMenu = ({ setFloodLevelFromMenu }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (section, floodLevel) => {
    setExpanded(expanded === section ? null : section);
    if (floodLevel && setFloodLevelFromMenu) {
      setFloodLevelFromMenu(floodLevel);
    }
  };

  return (
    <div className="accordion-container">
      {/* Action Stage */}
      <div
        className={`accordion-section action-stage ${expanded === 'action' ? 'expanded' : ''}`}
        onClick={() => toggleAccordion('action', 9)} 
      >
        <h4>Action Stage (less than 9ft)</h4>
        {expanded === 'action' && (
          <div className="accordion-content">
            <p>Water levels are normal, below the minor flood stage threshold.</p>
          </div>
        )}
      </div>

      {/* Minor Flood Stage */}
      <div
        className={`accordion-section minor-stage ${expanded === 'minor' ? 'expanded' : ''}`}
        onClick={() => toggleAccordion('minor', 10)} 
      >
        <h4>Minor Flood Stage (9 - 10ft)</h4>
        {expanded === 'minor' && (
          <div className="accordion-content">
            <p>
              <strong>9 ft:</strong> Water starts to cover Skaters Cabin Road.
            </p>
            <p>
              <strong>9.5 ft:</strong> Areas along View Dr will start to flood; minor flooding of yards. ~0.5 feet of water over the Skaters Cabin Road. Campsite 7 will be flooded.
            </p>
          </div>
        )}
      </div>

      {/* Moderate Flood Stage */}
      <div
        className={`accordion-section moderate-stage ${expanded === 'moderate' ? 'expanded' : ''}`}
        onClick={() => toggleAccordion('moderate', 14)} 
      >
        <h4>Moderate Flood Stage (10 - 14ft)</h4>
        {expanded === 'moderate' && (
          <div className="accordion-content">
            <p>
              <strong>10 ft:</strong> Mendenhall Campground floods. Significant flooding around Mendenhall Lake, campground evacuation, and up to 3 ft of water in View Dr yards.
            </p>
            <p>
              <strong>11 ft:</strong> View Dr impassable, severe flooding, bank erosion below Back Loop Bridge, hazardous river navigation, and backyard flooding on Meander Way.
            </p>
            <p>
              <strong>13 ft:</strong> Backyards flood on north View Dr (1-4 ft). Flooding at Meander Way, Stream Ct, Northland St. Storm drain backups along Riverside and Riverwood Dr. Severe bank erosion.
            </p>
          </div>
        )}
      </div>

      {/* Major Flood Stage */}
      <div
        className={`accordion-section major-stage ${expanded === 'major' ? 'expanded' : ''}`}
        onClick={() => toggleAccordion('major', 15)} 
      >
        <h4>Major Flood Stage (14ft+)</h4>
        {expanded === 'major' && (
          <div className="accordion-content">
            <p>
              <strong>14 ft:</strong>  Flooding begins on Northland St, Turn St, Stephen Richards Memorial Dr, Parkview & Center Ct. Some homes begin flooding. Backyards along Killewich Dr and Riverside Dr flood. Severe flooding on View Dr.
            </p>
            <p>
              <strong>15 ft:</strong> ~2 ft of water on Killewich Dr. Backyards flood on south Marion Dr. ~1.5 ft of water on Rivercourt Way, Lakeview Ct, Center Ct, Parkview Ct, Turn St & Northland St. Riverside Dr at Tournure St, 1 ft of water.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodStageMenu;
