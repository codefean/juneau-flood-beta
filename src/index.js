import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './App2'; // Import the new main component
import './styles/App2.css'; // Ensure your global styles are loaded

ReactDOM.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
  document.getElementById('root')
);