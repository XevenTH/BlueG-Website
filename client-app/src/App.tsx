import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(res => {
      setActivites(res.data);
    })
  }, [])

  return (
    <div>
      <Header as='h1' color='teal' icon='users' content='BlueG' />
        <List>
          {activities.map((singleActivity: any) => (
            <List.Item key={singleActivity.id}> {singleActivity.title} </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
