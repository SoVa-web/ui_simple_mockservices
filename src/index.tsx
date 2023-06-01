import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import API_LIB from 'simple-mock-services/src/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const lib:API_LIB = new API_LIB()
export default lib


