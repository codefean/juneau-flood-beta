import React from "react";
import "./glacial-info.css"; // Import the CSS file for styles

const LatestImageWithTimelapses = () => {
  const timelapse1Url =
    "https://usgs-nims-images.s3.amazonaws.com/timelapse/AK_Glacial_Lake_2_and_half_miles_North_of_Nugget_Creek_near_Auke_Bay/AK_Glacial_Lake_2_and_half_miles_North_of_Nugget_Creek_near_Auke_Bay_720.mp4";
  const timelapse2Url =
    "https://usgs-nims-images.s3.amazonaws.com/timelapse/AK_Glacial_Lake_near_Nugget_LOOKING_UPSTREAM_GLACIER_VIEW/AK_Glacial_Lake_near_Nugget_LOOKING_UPSTREAM_GLACIER_VIEW_720.mp4";

  const timelapse1Info = {
    siteNumber: "1505248591",
    cameraName: "Glacial Lake 2 and half miles North of Nugget Creek near Auke Bay",
    description:
      "Glacial Lake 2.5 miles North of Nugget Creek near Auke Bay, AK - Water flows into the Mendenhall River",
    state: "AK",
    location: "58.4595557, -134.5038334",
    collectionInterval: "Every 61 minutes",
    collectionWindow: "247",
    usgsLink:
      "https://waterdata.usgs.gov/monitoring-location/1505248590/#dataTypeId=continuous-00020-0&period=P7D&showMedian=true",
  };

  const timelapse2Info = {
    siteNumber: "1505248590",
    cameraName: "Glacial Lake near Nugget Creek",
    description: "Glacial Lake near Nugget LOOKING UPSTREAM GLACIER VIEW",
    state: "AK",
    location: "58.4595556, -134.5038333",
    collectionInterval: "Every 60 minutes",
    collectionWindow: "247",
    usgsLink:
      "https://apps.usgs.gov/hivis/camera/AK_Glacial_Lake_near_Nugget_LOOKING_UPSTREAM_GLACIER_VIEW",
  };

  const renderTable = (info) => (
    <table className="info-table">
      <tbody>
        {Object.entries(info).map(([key, value]) => (
          <tr key={key}>
            <th>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </th>
            <td>
              {key === "usgsLink" ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-button"
                >
                  More Info
                </a>
              ) : (
                value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="page-container">
      <section>
        {/* Timelapse 1 */}
        <div className="video-container">
          <div className="video">
            <h3>Glacial Lake North of Nugget Creek</h3>
            <video controls>
              <source src={timelapse1Url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="info-section">{renderTable(timelapse1Info)}</div>
        </div>

        {/* Timelapse 2 */}
        <div className="video-container">
          <div className="video">
            <h3>Upstream Glacier View Near Nugget Creek</h3>
            <video controls>
              <source src={timelapse2Url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="info-section">{renderTable(timelapse2Info)}</div>
        </div>
      </section>
    </div>
  );
};

export default LatestImageWithTimelapses;
