import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { Image, Item, Label, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/Models/Activity'

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, hostUserName } }: Props) {
    if (!attendees) return null
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(profile => (
                        <Item style={{ position: 'relative' }} key={profile.userName} >
                            {hostUserName === profile.userName && (
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                            )}
                            <Image size='tiny' src={ profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${profile.userName}`}>{profile.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})