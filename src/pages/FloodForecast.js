import React, { useState, useEffect } from "react";
import "./FloodForecast.css";
import FloodPred from "./FloodPred";

// cd /Users/seanfagan/Desktop/mapbox-example4

const FloodPrediction = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [hydroGraphUrl, setHydroGraphUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeInfo, setActiveInfo] = useState(null);

  useEffect(() => {
    const updateImages = () => {
      setImageUrl(
        `https://www.weather.gov/images/ajk/suicideBasin/current.jpg?timestamp=${Date.now()}`
      );
      setHydroGraphUrl(
        `https://water.noaa.gov/resources/hydrographs/mnda2_hg.png?timestamp=${Date.now()}`
      );
      setLoading(false);
    };

    updateImages();
    const interval = setInterval(updateImages, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkerClick = (marker, event, imageId) => {
    const wrapperRect = event.target.closest(".image-wrapper").getBoundingClientRect();
    const markerRect = event.target.getBoundingClientRect();

    if (activeInfo && activeInfo.imageId === imageId && activeInfo.text === marker.text) {
      setActiveInfo(null);
    } else {
      setActiveInfo({
        imageId,
        text: marker.text,
        top: markerRect.top - wrapperRect.top + markerRect.height + 5,
        left: markerRect.left - wrapperRect.left + markerRect.width / 2,
      });
    }
  };

  const closeInfoBox = (e) => {
    if (!e.target.closest(".info-box") && !e.target.closest(".info-marker")) {
      setActiveInfo(null);
    }
  };
  

  const markers = {
    suicideBasin: [
      { top: "75%", left: "82%", text: "1. Check to see when the image was last updated. This website pulls the most recent image." },
      { top: "1.5%", left: "79%", text: "2. The latest glacial pool elevation in meters." },
      {top: "52.5%", left: "18.5%", text: "3. Years indicate annual peak water levels." },
      {top: "70%", left: "48.5%", text: "4. Movement of ice can impact percieved water levels." },
    ],
    mendenhallLake: [
      { top: "93%", left: "46%", text: "Check to see when the graph was created. This website pulls the latest graph." },
      { top: "16%", left: "50%", text: "Last recorded water level at Mendenhall Lake" },
      { top: "21%", left: "47.5%", text: "Current flood stage if the GLOF occured. 9ft is the lowest flood stage. For all flood stages click here." },
      { top: "79%", left: "92%", text: "Todays observation." },
    ],
  };

  return (
    <div className="flood-tracker" onClick={closeInfoBox}>
    <FloodPred /> 
      <h2>Suicide Basin Glacial Pool</h2>
      <h4> How to Understand Suicide Basin Data</h4>
      <div className="flood-content">
        <div className="image-container">
          {loading ? (
            <p>Loading image...</p>
          ) : (
            <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
              <img
                src={imageUrl}
                alt="Live view of Suicide Basin glacial pool"
                className="flood-image"
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
              {markers.suicideBasin.map((marker, index) => (
              <button
              key={index}
              className="info-marker"
              style={{ top: marker.top, left: marker.left }}
              onClick={(e) => handleMarkerClick(marker, e, "suicideBasin")}
                >
              {index + 1} {/* Sequential numbering */}
              </button>
              ))}
              {activeInfo?.imageId === "suicideBasin" && (
                <div
                  className="info-box"
                  style={{ top: `${activeInfo.top}px`, left: `${activeInfo.left}px` }}
                >
                  {activeInfo.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="detail-card black-text">
        <h2>About Suicide Basin</h2>
        <p>
          Suicide Basin is a glacial-dammed lake that annually drains, causing flooding in the Mendenhall Valley.
           Monitoring the basin helps predict potential floods to mitigate risks to the surrounding community.
      </p>

       <ul>
          <li><strong>Flood Potential:</strong> The volume of lake water and the rate of release during a Glacial Lake Outburst Flood (GLOF)
           determine the severity of flooding. However, the factors controlling the release rate currently remain unknown.</li>
          <li><strong>Changing Elevation:</strong> As the basin expands and the glacier melts, peak water elevation levels vary yearly. For example,
           A lower peak lake elevation in 2025 could hold a greater water volume than a peak elevation in 2024.</li>
          <li><strong>Time to Prepare:</strong> Once drainage begins (GLOF starts), floodwaters take approximately one day to reach Mendenhall Lake.</li>
          <li><strong>Flood Season:</strong> From the start of Summer and into early Fall.</li>
      </ul>
      <button className="more-data-button" onClick={() => window.open('https://www.weather.gov/ajk/suicideBasin')}>
      More Info
      </button>
      </div>

      <h2>Mendenhall Lake Water Level</h2>
      <h4> How to Understand Mendenhall Lake Data</h4>
      <div className="lake-level-content">
        <div className="image-container">
          {loading ? (
            <p>Loading graph...</p>
          ) : (
            <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
              <img
                src={hydroGraphUrl}
                alt="Mendenhall Lake water level hydrograph"
                className="hydrograph-image"
                onError={(e) => (e.target.src = "/fallback-graph.jpg")}
              />
              {markers.mendenhallLake.map((marker, index) => (
              <button
                key={index}
                className="info-marker"
                style={{ top: marker.top, left: marker.left }}
                onClick={(e) => handleMarkerClick(marker, e, "mendenhallLake")}
              >
              {index + 1}
              </button>
              ))}
              {activeInfo?.imageId === "mendenhallLake" && (
                <div
                  className="info-box"
                  style={{ top: `${activeInfo.top}px`, left: `${activeInfo.left}px` }}
                >
                  {activeInfo.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="detail-card black-text">
      <h2>About Mendenhall Lake</h2>
      <p>
      Mendenhall Lake is a glacially-fed lake at the terminus of Mendenhall Glacier. The lake's water levels fluctuate due to seasonal melting, precipitation, and periodic GLOFs from Suicide Basin, a side valley of the glacier. These outburst floods can cause rapid water level rises, impacting surrounding areas.
      </p>

      <ul>
      <li><strong>Flood Stage:</strong> The flood potential if a GLOF was to occur. The flood stage begins at 9ft with minor flood potenital.</li>
      <li><strong>Monitoring & Forecasting:</strong> The NWS and USGS actively track lake levels and issue flood alerts based on water gage data, satellite imagery, and hydrological models.</li>
      </ul>
      <button className="more-data-button" onClick={() => window.open('https://www.weather.gov/ajk/suicideBasin')}>
      More Info
      </button>
      </div>
    </div>
  );
};

export default FloodPrediction;
