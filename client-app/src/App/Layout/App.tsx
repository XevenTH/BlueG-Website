import React, { useEffect, useState } from 'react';
import './Style.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid'
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [formMode, setFormMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(res => {
      setActivites(res.data);
    })
  }, [])

  function SelectActivityHandler(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function CancelActivityHandler() {
    setSelectedActivity(undefined);
  }

  function DeleteHandler(id: string)
  {
    setActivites([...activities.filter(x => x.id !== id)]);
  }

  function FormModeHandler(id?: string) {
    id ? SelectActivityHandler(id) : CancelActivityHandler();
    setFormMode(true);
  }

  function FormCloseHandler() {
    setFormMode(false);
  }

  function CreateEditHandler(activity: Activity) {
    activity.id ? setActivites([...activities.filter(x => x.id !== activity.id), activity])
      : setActivites([...activities, { ...activity, id: uuid() }]);

    setFormMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar
        formMode={FormModeHandler}
      />
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard
          activities={activities}

          selectedActivity={selectedActivity}
          setActivity={SelectActivityHandler}
          cancelActivity={CancelActivityHandler}

          formMode={formMode}
          setFormMode={FormModeHandler}
          setCancelFormMode={FormCloseHandler}
          setCreateEdit={CreateEditHandler}

          setDelete={DeleteHandler}
        />
      </Container>
    </>
  );
}

export default App;
