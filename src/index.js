import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import TopBar from './components/topBar/TopBar';

import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);