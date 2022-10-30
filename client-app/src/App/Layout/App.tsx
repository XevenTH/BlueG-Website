import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import HomePage from '../../Features/home/HomePage';
import NavBar from './NavBar';
import './Style.css';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }} >
              <Route exact path={'/games'} component={ActivityDashboard} />
              <Route path={'/games/:id'} component={ActivityDetails} />
              <Route key={location.key} path={['/createRoom', '/editRoom/:id']} component={ActivityForm} />
            </Container>
          </>
        )
        }
      />
    </>
  );

}

export default observer(App);
