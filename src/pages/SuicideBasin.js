import React from "react";
import CompareImage from "react-compare-image";
import "./SuicideBasin.css";

const SuicideBasin = () => {
  const beforeImage = "https://basin-images.s3.us-east-2.amazonaws.com/1893_glacier.png";
  const afterImage = "https://basin-images.s3.us-east-2.amazonaws.com/2018_glacier.png";

  return (
    <div className="suicide-basin-container">
      <div className="suicide-basin">
        <h2>Suicide Basin Glacier Change</h2>
      </div>
      <p className="suicide-basin-subheading">
      </p>
      <div className="image-comparison-container">
        <CompareImage leftImage={beforeImage} rightImage={afterImage} />
      </div>
    </div>
  );
};

export default SuicideBasin;
