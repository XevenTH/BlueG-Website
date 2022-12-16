import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../Features/home/HomePage';
import ModalsContainer from '../common/modals/ModalsContainer';
import { UseStore } from '../Containers/storeContainer';
import LoadingScreen from './loadingCompo';
import NavBar from './NavBar';
import './Style.css';

function App() {
  const { commonStore, userStore } = UseStore();
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore])

  if (!commonStore.appLoaded) return <LoadingScreen content='LOADING THE WEBSITE......' />

  return (
    <>
      <ScrollRestoration />
      <ModalsContainer />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );

}

export default observer(App);
