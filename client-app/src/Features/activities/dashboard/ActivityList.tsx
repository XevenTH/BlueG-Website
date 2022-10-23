import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";

interface Props {
    activities: Activity[];
    setActivity: (id: string) => void;
    setDelete: (id: string) => void;
}

export default function ActivityList({ activities, setActivity, setDelete }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(singleActivity => (
                    <Item key={singleActivity.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {singleActivity.title}
                            </Item.Header>
                            <Item.Meta>
                                {singleActivity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{singleActivity.description}</div>
                                <div>{singleActivity.city}, {singleActivity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => setActivity(singleActivity.id)} floated='right' content='Join' color='green' />
                                <Button onClick={() => setDelete(singleActivity.id)} floated='right' content='Delete' color='red' />
                                <Label style={{ 'marginTop': '0.5rem' }} as='a' content={singleActivity.category} color='red' tag />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
} 