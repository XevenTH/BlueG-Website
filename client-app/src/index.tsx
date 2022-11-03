import 'react-calendar/dist/Calendar.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { container, storeContext } from './App/Containers/storeContainer';
import App from './App/Layout/App';
import './App/Layout/Style.css';
import reportWebVitals from './reportWebVitals';

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