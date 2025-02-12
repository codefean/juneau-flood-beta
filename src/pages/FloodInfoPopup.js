import React, { useState, useEffect } from "react";
import "./FloodInfoPopup.css";

const FloodInfoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup only on desktop and only if it hasn't been dismissed before
    const hasDismissedPopup = localStorage.getItem("floodPopupDismissed");
    if (!hasDismissedPopup && window.innerWidth >= 768) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("floodPopupDismissed", "true"); // Prevent showing again
  };

  if (!isVisible) return null;

  return (
    <div className="flood-popup-overlay" onClick={handleClose}>
      <div className="flood-popup-box">
        <h2>Welcome to the Flood Levels Map</h2>
  
        <p>
            This interactive tool helps you plan for flooding in the Mendenhall Valley. For emergency flood information, refer to the 
            <a href="https://www.weather.gov/ajk/suicideBasin" target="_blank" rel="noopener noreferrer"> National Weather Service </a>.
        </p>
  
        <div className="popup-info">
          <p><strong>Search Your Address:</strong> Check if your location is in a flood-prone zone.</p>
          <p><strong>Explore Flood Levels:</strong> See various flood maps with water depth (-/+). </p>
          <p><strong>Forecasted Flood Potential:</strong> See an <em>estimate</em> flood stage from available data.</p>
        </div>
  
        <p className="popup-disclaimer">
          This tool is for <em>informational purposes only</em>.  
          Flood risks shown here are <strong>estimates</strong> and should be used for planning; not for emergency decision-making.
        </p>
  
        <button onClick={handleClose} className="popup-close-button">Got it!</button>
      </div>
    </div>
  );
  
  
  
};

export default FloodInfoPopup;
