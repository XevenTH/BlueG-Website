import { createBrowserHistory } from 'history';
import 'react-calendar/dist/Calendar.css';
import ReactDOM from 'react-dom/client';
import { Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { container, storeContext } from './App/Containers/storeContainer';
import App from './App/Layout/App';
import './App/Layout/Style.css';
import reportWebVitals from './reportWebVitals';

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <storeContext.Provider value={container}>
    <Router history={history}>
      <App />
    </Router>
  </storeContext.Provider>
);

reportWebVitals();