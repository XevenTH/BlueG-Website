import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";

export default function ActivityDetails() {

    const { activityStore } = UseStore();
    const { selectedActivity: activities } = activityStore;

    if (!activities) return <LoadingScreen />;

    return (
        <Card style={{ 'width': '100%' }}>
            <Image src={`/assets/categoryImages/${activities.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activities.title}</Card.Header>
                <Card.Meta>{activities.date}</Card.Meta>
                <Card.Description>{activities.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={activityStore.CancelActivityHandler}
                    basic icon='cancel' color='grey' content='Cancel' labelPosition='left' />

                <Button onClick={() => activityStore.FormModeHandler(activities.id)}
                    basic icon='pencil alternate' color='blue' content='Edit' floated='right' labelPosition='right' />
            </Card.Content>
        </Card>
    )
}