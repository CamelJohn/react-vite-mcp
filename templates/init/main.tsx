import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRoutesProvider } from './routes/provider';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found');

const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <React.StrictMode>
    <MainRoutesProvider />
  </React.StrictMode>
);
