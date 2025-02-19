import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./FloodEvents.css";

const S3_CSV_URL = "https://flood-events.s3.us-east-2.amazonaws.com/FloodEvents.csv";

const COLUMN_NAME_MAPPING = {
  "Release Stage D.S. Gage (ft)": "Release Start Stage at Mendenhall Lake (ft)",
  "D.S. Gage Release Flow (cfs)": "Release Flow Rate at Mendenhall Lake (cfs)",
  "Crest Date": "Peak Water Level Date",
  "Crest Stage D.S. Gage (ft)": "Peak Water Level Stage at Mendenhall Lake (ft)",
  "D.S. Gage Crest Flow (cfs)": "Peak Water Level Flow Rate (cfs)",
  "Impacts": "NWS Impacts",
};

const EXCLUDED_COLUMNS = ["Remarks", "Lake Peak Stage (ft)", "Release Volume (ac-ft)"];

const getFloodStageColor = (stage) => {
  if (stage < 9) return "#d4e157"; // Action Stage (Yellow-Green)
  if (stage >= 9 && stage < 10) return "#fdae61"; // Minor Flood Stage (Orange)
  if (stage >= 10 && stage < 14) return "#d73027"; // Moderate Flood Stage (Red)
  return "#7b3294"; // Major Flood Stage (Purple)
};

const FloodEvents = () => {
  const [data, setData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(S3_CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setLoading(false);
            const filteredHeaders = result.meta.fields
              .filter(header => !EXCLUDED_COLUMNS.includes(header))
              .map(header => COLUMN_NAME_MAPPING[header] || header);
            setHeaders(filteredHeaders);

            const filteredData = result.data.map((row) => {
              const filteredRow = {};
              Object.keys(row).forEach((key) => {
                if (!EXCLUDED_COLUMNS.includes(key)) {
                  const newKey = COLUMN_NAME_MAPPING[key] || key;
                  filteredRow[newKey] = cleanValue(row[key]);
                }
              });
              return cleanRow(filteredRow);
            });
            setData(filteredData);

            const scatterPoints = filteredData
              .filter(row => row["Peak Water Level Date"] && row["Peak Water Level Stage at Mendenhall Lake (ft)"])
              .map(row => {
                const rawDate = row["Peak Water Level Date"];
                const dateObj = new Date(rawDate);
                const stageValue = parseFloat(row["Peak Water Level Stage at Mendenhall Lake (ft)"]);
                return {
                  x: dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                  y: stageValue,
                  timestamp: dateObj.getTime(),
                  fill: getFloodStageColor(stageValue),
                };
              })
              .sort((a, b) => a.timestamp - b.timestamp);
            setScatterData(scatterPoints);
          },
        });
      })
      .catch((error) => {
        console.error("Error loading CSV from S3:", error);
        setLoading(false);
      });
  }, []);

  const cleanValue = (value) => (value === "-" ? "" : value);
  
  const cleanRow = (row) => ({
    ...row,
    "NWS Impacts": row["NWS Impacts"] && ["None reported", "No Impacts"].includes(row["NWS Impacts"].trim())
      ? "No impacts reported"
      : row["NWS Impacts"] || "No impacts reported",
  });

  return (
    <div className="flood-events-container">
      <h2>Flood Events</h2>
      <div className="scatter-chart-container">
        <h3>GLOF Peak Water Levels Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
            <CartesianGrid />
            <XAxis
              type="category"
              dataKey="x"
              name="Peak Water Level Date"
              tickFormatter={(tick) =>
                new Date(tick).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
              }
              domain={["auto", "auto"]}
              allowDataOverflow={false}
              label={{ value: "Peak Water Level Date", position: "bottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Peak Water Level Stage (ft)"
              unit=" ft"
              label={{ value: "Peak Water Level Stage (ft)", angle: -90, position: "outsideLeft", dx: -25 }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value, name) => (name === "x" ? value : value)} />
            <Scatter name="Flood Events" data={scatterData}>
              {scatterData.map((entry, index) => (
                <Scatter key={index} fill={entry.fill} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="flood-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="sortable">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="no-data">No data available</td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header] || "—"}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FloodEvents;
