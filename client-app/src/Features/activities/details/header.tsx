import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Label, Segment } from 'semantic-ui-react';
import { UseStore } from '../../../App/Containers/storeContainer';
import { Activity } from '../../../App/Models/Activity';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function HeaderCompo({ activity }: Props) {
    const { activityStore: { attendActivityAction, isSubmitting, CancelToggle } } = UseStore();

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                {activity.isCancelled &&
                    (<Label style={{position: 'absolute', zIndex: 999, left: -14, top: 20}} 
                        color='red' ribbon content='Cancelled' />)
                }
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>{activity.hostProfile?.displayName}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHosting ? (
                    <>
                        <Button
                            onClick={CancelToggle}
                            loading={isSubmitting}
                            color='red'
                            floated='left'
                        >
                            {activity.isCancelled ? ("Re-Active") : "Cancel"}
                        </Button>
                        <Button
                            as={Link}
                            to={`/editRoom/${activity.id}`}
                            disabled={activity.isCancelled}
                            color='orange'
                            floated='right'>
                            Manage Event
                        </Button>
                    </>
                ) : activity.isJoined ? (
                    <Button loading={isSubmitting} onClick={attendActivityAction} color='red' content="Go Out" />
                ) : (
                    <Button loading={isSubmitting} onClick={attendActivityAction} color='teal' content="Join" />
                )}
            </Segment>
        </Segment.Group>
    )
})