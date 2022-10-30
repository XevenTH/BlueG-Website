import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/Layout/Style.css';
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { container, storeContext } from './App/Containers/storeContainer';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <storeContext.Provider value={container}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </storeContext.Provider>
);

reportWebVitals();