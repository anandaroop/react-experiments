import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.css'

import artworks from './artworks-100.json'

ReactDOM.render(
  <App artworks={artworks} />,
  document.getElementById('root')
);
