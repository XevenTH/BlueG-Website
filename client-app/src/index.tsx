import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/Layout/Style.css';
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { container, storeContext } from './App/Containers/storeContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <storeContext.Provider value={container}>
    <App />
  </storeContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
