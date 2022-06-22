import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/routesAdm'

function App() {
  return (
    <div>
        <Router>
          <Routes/>
        </Router>
    </div>
  );
}

export default App;
