import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";

export default function ActivityList() {
    
    const { activityStore } = UseStore();
    const { sortingActivitiesByDate: activities, isSubmitting, DeleteActivity } = activityStore
    
    const [deleteTarget, setDeleteTarget] = useState('');

    function DeleteFunction(e: SyntheticEvent<HTMLButtonElement>, activityId: string) {
        setDeleteTarget(e.currentTarget.name);
        DeleteActivity(activityId);
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
                                <Button as={Link} to={`/games/${singleActivity.id}`}
                                    floated='right' content='Join' color='green' />
                                <Button
                                    name={singleActivity.id}
                                    onClick={(e) => DeleteFunction(e, singleActivity.id)}
                                    loading={isSubmitting && deleteTarget === singleActivity.id}
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