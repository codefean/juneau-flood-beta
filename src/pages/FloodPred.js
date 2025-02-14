import React, { useState, useEffect } from "react";
import "./FloodPred.css";

const FloodPred = ({ onClose }) => {  // Accept onClose as a prop
  const [nwsFloodForecast, setNwsFloodForecast] = useState("Loading...");
  const [nwsAlertUrl, setNwsAlertUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFloodData = async () => {
      try {
        const nwsRes = await fetch("https://api.weather.gov/alerts/active?zone=AKZ025");
        const nwsData = await nwsRes.json();

        if (nwsData.features.length > 0) {
          const alert = nwsData.features[0].properties;
          setNwsFloodForecast(alert.headline);
          setNwsAlertUrl(alert?.["@id"] || alert?.instruction || null);
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
    const interval = setInterval(fetchFloodData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flood-prediction">
      {loading ? (
        <p>Loading forecast...</p>
      ) : (
        <div className="flood-pred-details">
          <div className="flood-pred-card alert">
            <h2>National Weather Service Flood Forecast</h2>
            <p>{nwsFloodForecast}</p>

            {nwsAlertUrl && (
              <a href={nwsAlertUrl} target="_blank" rel="noopener noreferrer">
                <button className="more-info-btn">More Info</button>
              </a>
            )}

            <div className="more-info-container">
              <a href="https://www.weather.gov/ajk/suicidebasin#" target="_blank" rel="noopener noreferrer">
                <button className="more-info-btn">Full NWS Flood Forecast</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloodPred;
