import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import { UseStore } from '../Containers/storeContainer';
import LoadingScreen from './loadingCompo';
import NavBar from './NavBar';
import './Style.css';

function App() {
  const { activityStore } = UseStore()

  useEffect(() => {
    activityStore.getAllActivities();
  }, [activityStore])

  if (activityStore.initialLoading) return <LoadingScreen content='PLEASE WAIT.....' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
