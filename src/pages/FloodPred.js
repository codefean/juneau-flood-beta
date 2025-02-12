import React, { useState, useEffect } from "react";
import "./FloodPred.css";

const FloodPred = () => {
  const [nwsFloodForecast, setNwsFloodForecast] = useState("Loading...");
  const [nwsAlertUrl, setNwsAlertUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFloodData = async () => {
      try {
        // Fetch NWS Flood Forecast Data
        const nwsRes = await fetch(
          "https://api.weather.gov/alerts/active?zone=AKZ025"
        );
        const nwsData = await nwsRes.json();

        console.log("NWS API Response:", nwsData); // Debugging

        if (nwsData.features.length > 0) {
          const alert = nwsData.features[0].properties;
          setNwsFloodForecast(alert.headline);

          // Check for a valid alert URL
          const alertUrl = alert?.['@id'] || alert?.instruction || null;
          setNwsAlertUrl(alertUrl);
        } else {
          setNwsFloodForecast("No predicted flooding event");
          setNwsAlertUrl(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching flood data:", error);
        setNwsFloodForecast("Data unavailable");
        setNwsAlertUrl(null);
        setLoading(false);
      }
    };

    fetchFloodData();
    const interval = setInterval(fetchFloodData, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flood-prediction">
      {loading ? (
        <p>Loading forecast...</p>
      ) : (
        <div className="flood-pred-details">
          <div className="flood-pred-card alert">
            <h2>NWS Flood Forecast</h2>
            <p>{nwsFloodForecast}</p>
            
            {nwsAlertUrl && (
              <a href={nwsAlertUrl} target="_blank" rel="noopener noreferrer">
                <button className="more-info-btn">More Info</button>
              </a>
            )}
            
            <div className="more-info-container">
            <a href="https://www.weather.gov/ajk/suicidebasin#" target="_blank" rel="noopener noreferrer">
            <button className="more-info-btn">More Info</button>
            </a>
            </div>
  
          </div>
        </div>
      )}
    </div>
  );
  
};

export default FloodPred;
