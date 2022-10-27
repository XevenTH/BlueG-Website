import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";

interface Props {
    activities: Activity[];
    isSubmit: boolean;
    setActivity: (id: string) => void;
    setDelete: (id: string) => void;
}

export default function ActivityList({ activities, setActivity, setDelete, isSubmit }: Props) {
    const [deleteTarget, setDeleteTarget] = useState('');
    
    function newFunction(e: SyntheticEvent<HTMLButtonElement>, activity: string) {
        setDeleteTarget(e.currentTarget.name);
        setDelete(activity);
    }

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
                                <Button 
                                name = {singleActivity.id}
                                onClick={(e) => newFunction(e, singleActivity.id)} 
                                loading={isSubmit && deleteTarget === singleActivity.id} 
                                floated='right' content='Delete' color='red' 
                                />
                                <Label style={{ 'marginTop': '0.5rem' }} as='a' content={singleActivity.category} color='red' tag />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
} 