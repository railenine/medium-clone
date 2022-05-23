import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Routes from './Routes';

const App = () => {
  return (
    <div>
      <h3>Welcome to Hooks!</h3>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Router>
      <Routes />
    </Router>
  </React.StrictMode>
);

