import React from 'react';
import './StageInfo.css';

const FloodStageTable = () => {
  return (
    <div className="flood-stage-table-container">
      <table className="flood-stage-table">
        <thead>
          <tr>
            <th>Flood Stage</th>
            <th>Water Level (ft)</th>
            <th>Impacts</th>
          </tr>
        </thead>
        <tbody>
          {/* Action Stage */}
          <tr className="action-stage">
            <td>Action Stage</td>
            <td>&lt;9 ft</td>
            <td>TBD<br /></td>
          </tr>

          {/* Minor Flood Stage */}
          <tr className="minor-stage">
            <td>Minor Flood</td>
            <td>9 - 10 ft</td>
            <td>
              <strong>9 ft:</strong> TBD<br />
              <strong>9.5 ft:</strong> TBD<br />
            </td>
          </tr>

          {/* Moderate Flood Stage */}
          <tr className="moderate-stage">
            <td>Moderate Flood</td>
            <td>10 - 14 ft</td>
            <td>
              <strong></strong>TBD <br />
              <strong></strong> TBD <br />
            </td>
          </tr>

          {/* Major Flood Stage */}
          <tr className="major-stage">
            <td>Major Flood</td>
            <td>14+ ft</td>
            <td>
              <strong></strong> TBD <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FloodStageTable;
