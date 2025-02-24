import React, { useState, useEffect } from "react";
import "./FloodForecast.css";
import FloodPred from "./FloodPred";
import Tooltip from "./Tooltip"; 
import FloodStageMenu from "./StageInfo"; 

// cd /Users/seanfagan/Desktop/juneau-flood-beta

const FloodPrediction = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [hydroGraphUrl, setHydroGraphUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeInfo, setActiveInfo] = useState(null);
  const [showFloodPred, setShowFloodPred] = useState(true); 

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
      { top: "76.5%", left: "82.5%", text: "1. Check to see when the image was last updated. This website pulls the most recent image." },
      { top: "5%", left: "80%", text: "2. Zoomed in elevation info." },
      { top: "55%", left: "19.5%", text: "3. Current glacial lake water levels" },
      { top: "70%", left: "48.5%", text: "4. Movement of floating ice can impact water level measurements on the hydrograph." },
    ],
    mendenhallLake: [
      { top: "93%", left: "47%", text: "Check to see when the graph was created. This website pulls the latest graph." },
      { top: "19%", left: "51%", text: "Last recorded water level at Mendenhall Lake" },
      { top: "22%", left: "48.5%", text: "Current flood stage if the GLOF occurred. 9ft is the lowest flood stage. For all flood stages click here." },
      { top: "72%", left: "90%", text: "Today's observation." },
    ],
  };

  return (
    
    <div className="flood-tracker" onClick={closeInfoBox}>

      <div className="title">
        <h3>Explore Flood Forecasting</h3>
      </div>
      <div className="subheading">
        <h4>How To Track Suicide Basin & Mendenhall Lake Water Levels</h4>
      </div>

      <div className="flood-content">
  <div className="image-pair-container">
    
    {/* Suicide Basin Image */}
    <div className="image-container suicide-basin-container">
      {loading ? (
        <p>Loading image...</p>
      ) : (
        <div className="image-wrapper suicide-basin-wrapper">
          <img
            src={imageUrl}
            alt="Live view of Suicide Basin glacial pool"
            className="flood-image suicide-basin-image"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
          <p className="image-caption" style={{ marginTop: "-10px" }}>
            Latest Image of Suicide Basin
          </p>

          <Tooltip
            markers={markers.suicideBasin}
            handleMarkerClick={handleMarkerClick}
            activeInfo={activeInfo}
            imageId="suicideBasin"
          />
          
        </div>
      )}
    </div>

    {/* Additional Image */}
    {/* NOAA Hydrograph Image */}
    <div className="image-container additional-image-container">
      <div className="image-wrapper additional-image-wrapper">
        <img
          src="https://water.noaa.gov/resources/hydrographs/jsba2_hg.png"
          alt="NOAA Hydrograph"
          className="flood-image additional-image"
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
        <p className="image-caption">Latest Water Elevation Chart for Suicide Basin Glacial Lake</p>
      </div>
      
    </div>

  </div>
</div>


      <div className="detail-card black-text">
        <h2>Forecasting Glacial Lake Outburst Floods</h2>
        <p>
          Suicide Basin is a glacial-dammed lake that annually drains, causing flooding in the Mendenhall Valley.
          Monitoring the basin helps predict potential floods to mitigate risks to the surrounding community.
        </p>

        <ul>
          <li>
            <strong>Flood Potential:</strong> The volume of lake water and the rate of release during a Glacial Lake Outburst Flood (GLOF)
            determine the severity of flooding. However, the factors controlling the release rate currently remain unknown.
          </li>
          <li>
            <strong>Changing Elevation:</strong> As the basin expands and the glacier melts, peak water elevation levels vary yearly. For example,
            a lower peak lake elevation in 2025 could hold a greater water volume than a peak elevation in 2024.
          </li>
          <li>
            <strong>Time to Prepare:</strong> Once drainage begins (GLOF starts), floodwaters take approximately one day to reach Mendenhall Lake.
          </li>
          <li>
            <strong>Flood Season:</strong> From the start of Summer and into early Fall.
          </li>
        </ul>
        <button className="more-data-button" onClick={() => window.open('https://www.weather.gov/ajk/suicideBasin')}>
          More Info
        </button>
      </div>

      <div className="lake-level-content">
  {/* Mendenhall Lake Image Wrapper */}
  <div className="flood-stage-menu-wrapper">
    {loading ? (
      <p>Loading graph...</p>
    ) : (
      <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
        <img
          src={hydroGraphUrl}
          alt="Mendenhall Lake water level hydrograph"
          className="mendenhall-lake-image"
          onError={(e) => (e.target.src = "/fallback-graph.jpg")}
        />
        <p className="image-caption">Latest NOAA Hydrograph for Mendenhall Lake</p>
        <Tooltip
          markers={markers.mendenhallLake}
          handleMarkerClick={handleMarkerClick}
          activeInfo={activeInfo}
          imageId="mendenhallLake"
        />
      </div>
    )}
  </div>

  {/* Flood Stage Menu (StageInfo.js) - Positioned to the Right */}
  <div className="flood-stage-menu-wrapper">
    <FloodStageMenu />
    <p className="image-caption">Flood Stage Levels Correspond to Mendenhall Lake Water Levels</p>
  </div>
  
</div>


      <div className="detail-card black-text">
        <h2>About Flooding from Mendenhall Lake</h2>
        <p>
          Mendenhall Lake is a glacially-fed lake at the terminus of Mendenhall Glacier. The lake's water levels fluctuate due to seasonal melting, precipitation, and periodic GLOFs from Suicide Basin, a side valley of the glacier. These outburst floods can cause rapid water level rises, impacting surrounding areas.
        </p>

        <ul>
          <li>
            <strong>Flood Stage:</strong> The flood potential if a GLOF was to occur. The flood stage begins at 9ft with minor flood potential.
          </li>
          <li>
            <strong>Monitoring & Forecasting:</strong> The NWS and USGS actively track lake levels and issue flood alerts based on water gage data, satellite imagery, and hydrological models.
          </li>
        </ul>
        <button className="more-data-button" onClick={() => window.open('https://waterdata.usgs.gov/monitoring-location/15052500/#dataTypeId=continuous-00065--1654777834&period=P7D&showMedian=false')}>
          More Info
        </button>
      </div>
      {showFloodPred && <FloodPred onClose={() => setShowFloodPred(false)} />} 
    </div>
  );
};

export default FloodPrediction;
