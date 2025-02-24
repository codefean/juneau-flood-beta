import React from "react";
import "./Tooltip.css";

const TooltipMarker = ({ markers, handleMarkerClick, activeInfo, imageId }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <button
          key={index}
          className="info-marker"
          style={{
            top: marker.top, 
            left: marker.left,
            position: "absolute",
          }}
          onClick={(e) => handleMarkerClick(marker, e, imageId)}
        >
          ?
        </button>
      ))}
      {activeInfo?.imageId === imageId && (
        <div
          className="info-box"
        >
          {activeInfo.text}
        </div>
      )}
    </>
  );
};

export default TooltipMarker;

