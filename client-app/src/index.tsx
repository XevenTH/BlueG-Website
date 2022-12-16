import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { container, storeContext } from './App/Containers/storeContainer';
import './App/Layout/Style.css';
import { router } from './App/router/Routes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <storeContext.Provider value={container}>
    <RouterProvider router={router} />
  </storeContext.Provider>
);

reportWebVitals();