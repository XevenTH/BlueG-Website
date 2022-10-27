import React, { useEffect, useState } from 'react';
import './Style.css';
import { v4 as uuid } from 'uuid'
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import agent from '../API/APIAgent';
import LoadingScreen from './loadingCompo';

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [formMode, setFormMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    agent.handler.List.then(res => {
      const updatedActivities: Activity[] = [];
      res.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        updatedActivities.push(activity);
      })
      setActivites(updatedActivities);
      setIsLoading(false);
    })
  }, [])

  function SelectActivityHandler(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function CancelActivityHandler() {
    setSelectedActivity(undefined);
  }

  function DeleteHandler(id: string) {
    setIsSubmit(true);
    agent.handler.delete(id).then(() => {
      setActivites([...activities.filter(x => x.id !== id)]);
      setIsSubmit(false);
    });
  }

  function FormModeHandler(id?: string) {
    id ? SelectActivityHandler(id) : CancelActivityHandler();
    setFormMode(true);
  }

  function FormCloseHandler() {
    setFormMode(false);
  }

  function CreateEditHandler(activity: Activity) {
    setIsSubmit(true);
    if (activity.id) {
      agent.handler.update(activity).then(() => {
        setActivites([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setFormMode(false);
        setIsSubmit(false);
      });
    }
    else {
      activity.id = uuid();
      agent.handler.post(activity).then(() => {
        setActivites([...activities, activity]);
        setSelectedActivity(activity);
        setFormMode(false);
        setIsSubmit(false);
      });
    }
  }

  if (isLoading) return <LoadingScreen content='PLEASE WAIT.....' />

  return (
    <>
      <NavBar
        formMode={FormModeHandler}
      />
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard
          activities={activities}
          isSubmit={isSubmit}

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
