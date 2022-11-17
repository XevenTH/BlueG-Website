import { format } from "date-fns";
import { Button, Icon, Item, ItemDescription, ItemGroup, Label, Segment, SegmentGroup } from "semantic-ui-react";
import { history } from "../../..";
import { UseStore } from "../../../App/Containers/storeContainer";
import { Activity } from "../../../App/Models/Activity";
import SingleActivityListItem from "./SingleActivityListItem";

interface Props {
    singleActivity: Activity;
}

export default function SingleActivityList({ singleActivity }: Props) {
    const { activityStore } = UseStore();
    const { isSubmitting } = activityStore

    return (
        <SegmentGroup>
            <Segment>
                {singleActivity.isCancelled && 
                    <Label color='red' attached='top' style={{textAlign: 'center', fontSize: '14px'}}
                        content='This Activity Is No Longer Available' />
                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header content={singleActivity.title} />
                            <Item.Description content='Hosted By User' />
                            <ItemDescription>
                                {singleActivity.isHosting && (
                                    <Label color="orange" content="You Hosting This Event" basic />
                                )}
                                {singleActivity.isJoined && singleActivity.isHosting !== true && (
                                    <Label color="green" content="You Joined This Event" basic />
                                )}
                            </ItemDescription>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <ItemGroup>
                    <Icon name="clock" />{format(singleActivity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="location arrow" style={{ marginLeft: '1.5em' }} />{singleActivity.venue}
                </ItemGroup>
            </Segment>
            <Segment secondary>
                <span>
                    <SingleActivityListItem profile={singleActivity.attendees!} />
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    {singleActivity.description}
                </span>
                <Button
                    loading={isSubmitting}
                    onClick={() => history.push(`/games/${singleActivity.id}`)}
                    floated='right' content='View' color='teal'
                />
            </Segment>
        </SegmentGroup>
    )
}
