import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App2.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FloodLevels from './pages/FloodLevels';
import FloodForecast from './pages/FloodForecast';
import FloodEvents from './pages/FloodEvents';
import GlacierInfo from './pages/GlacierInfo';

// Custom hook for setting the document title
const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};

// Wrapper components to set the title for each route
const FloodLevelsPage = () => {
  useDocumentTitle('Juneau Flood Risk');
  return <FloodLevels />;
};

const FloodPredictionPage = () => {
  useDocumentTitle('Flood Forecast');
  return <FloodForecast />;
};

const FloodEventsPage = () => {
  useDocumentTitle('Flood Events');
  return <FloodEvents />;
};

const GlacierInfoPage = () => {
  useDocumentTitle('Glacier Information');
  return <GlacierInfo />;
};

const App2 = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/flood-levels" />} />
          <Route path="/flood-levels" element={<FloodLevelsPage />} />
          <Route path="/flood-forecast" element={<FloodPredictionPage />} />
          <Route path="/flood-events" element={<FloodEventsPage />} />
          <Route path="/glacier-info" element={<GlacierInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App2;
