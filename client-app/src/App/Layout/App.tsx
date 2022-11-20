import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import TestErrors from '../../Features/activities/error/errorhandler';
import NotFound from '../../Features/activities/error/NotFound';
import ServerError from '../../Features/activities/error/servererror';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ProfilePage from '../../Features/activities/profiles/ProfilePage';
import LoginForm from '../../Features/activities/users/LoginForm';
import HomePage from '../../Features/home/HomePage';
import ModalsContainer from '../common/modals/ModalsContainer';
import { UseStore } from '../Containers/storeContainer';
import LoadingScreen from './loadingCompo';
import NavBar from './NavBar';
import './Style.css';

function App() {
  const { commonStore, userStore } = UseStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore])

  const location = useLocation();

  if (!commonStore.appLoaded) return <LoadingScreen content='LOADING THE WEBSITE......' />

  return (
    <>
      <ToastContainer position='bottom-center' hideProgressBar />
      <ModalsContainer />
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }} >
              <Switch>
                <Route exact path={'/login'} component={LoginForm} />
                <Route exact path={'/games'} component={ActivityDashboard} />
                <Route path={'/games/:id'} component={ActivityDetails} />
                <Route path={'/profile/:username'} component={ProfilePage} />
                <Route key={location.key} path={['/createRoom', '/editRoom/:id']} component={ActivityForm} />
                <Route path={'/testerror'} component={TestErrors} />
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
