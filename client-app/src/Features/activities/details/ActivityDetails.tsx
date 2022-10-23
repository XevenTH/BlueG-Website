import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";

interface Props {
    activities: Activity;
    cancelActivity: () => void;
    setFormMode: (id: string) => void;
}

export default function ActivityDetails({ activities, cancelActivity, setFormMode }: Props) {
    return (
        <Card style={{ 'width': '100%' }}>
            <Image src={`/assets/categoryImages/${activities.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activities.title}</Card.Header>
                <Card.Meta>{activities.date}</Card.Meta>
                <Card.Description>{activities.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={cancelActivity} basic icon='cancel' color='grey' content='Cancel' labelPosition='left' />
                <Button onClick={() => setFormMode(activities.id)} basic icon='pencil alternate' color='blue' content='Edit' floated='right' labelPosition='right' />
            </Card.Content>
        </Card>
    )
}