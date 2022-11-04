import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import TestErrors from '../../Features/activities/error/errorhandler';
import NotFound from '../../Features/activities/error/NotFound';
import ServerError from '../../Features/activities/error/servererror';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import HomePage from '../../Features/home/HomePage';
import NavBar from './NavBar';
import './Style.css';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-center' hideProgressBar />
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }} >
              <Switch>
                <Route exact path={'/games'} component={ActivityDashboard} />
                <Route path={'/games/:id'} component={ActivityDetails} />
                <Route path={'/testerror'} component={TestErrors} />
                <Route key={location.key} path={['/createRoom', '/editRoom/:id']} component={ActivityForm} />
                <Route path={'/server-error'} component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )
        }
      />
    </>
  );

}

export default observer(App);
