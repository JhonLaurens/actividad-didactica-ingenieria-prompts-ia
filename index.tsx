
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DevApp from './DevApp';

// Use DevApp for testing GameContext improvements
// Change isDevelopment to false to use the normal App
const isDevelopment = true;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {isDevelopment ? <DevApp /> : <App />}
  </React.StrictMode>
);
