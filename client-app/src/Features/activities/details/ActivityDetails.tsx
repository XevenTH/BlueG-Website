import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";

export default observer(function ActivityDetails() {

    const { activityStore } = UseStore();
    const { selectedActivity: activities, GetActivityById, initialLoading } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) GetActivityById(id);

    }, [id, GetActivityById])

    if (initialLoading || !activities) return <LoadingScreen content='PLEASE WAIT.....' />;

    return (
        <Card style={{ 'width': '100%' }}>
            <Image src={`/assets/categoryImages/${activities.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activities.title}</Card.Header>
                <Card.Meta>{activities.date}</Card.Meta>
                <Card.Description>{activities.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={'/games'}
                    basic icon='cancel' color='grey' content='Cancel' labelPosition='left' />

                <Button as={Link} to={`/editRoom/${activities.id}`}
                    basic icon='pencil alternate' color='blue' content='Edit' floated='right' labelPosition='right' />
            </Card.Content>
        </Card>
    )
})