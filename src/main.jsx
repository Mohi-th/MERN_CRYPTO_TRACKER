import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App.jsx';
import CryptoContext from './context/CryptoContext.jsx';
import 'react-alice-carousel/lib/alice-carousel.css';

createRoot(document.getElementById('root')).render(
  <CryptoContext>
    <App />
  </CryptoContext>
);
