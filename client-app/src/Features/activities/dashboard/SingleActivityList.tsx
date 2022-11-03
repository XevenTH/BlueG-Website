import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment, SegmentGroup } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import { Activity } from "../../../App/Models/Activity";

interface Props {
    singleActivity: Activity;
}

export default function SingleActivityList({ singleActivity }: Props) {
    const { activityStore } = UseStore();
    const { isSubmitting, DeleteActivity } = activityStore

    const [deleteTarget, setDeleteTarget] = useState('');

    function DeleteFunction(e: SyntheticEvent<HTMLButtonElement>, activityId: string) {
        setDeleteTarget(e.currentTarget.name);
        DeleteActivity(activityId);
    }

    return (
        <SegmentGroup>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header content={singleActivity.title} as={Link} to={`/games/${singleActivity.id}`} />
                            <Item.Description content='Hosted By User' />
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name="clock" /> {singleActivity.date}
                <Icon name="location arrow" style={{marginLeft: '1.5em'}} /> location
            </Segment>
            <Segment secondary>
                <span>
                    Waiters.....
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    {singleActivity.description}
                </span>
                <Button
                    name={singleActivity.id}
                    onClick={(e) => DeleteFunction(e, singleActivity.id)}
                    loading={isSubmitting && deleteTarget === singleActivity.id}
                    floated='right' content='Delete' color='red'
                />
            </Segment>
        </SegmentGroup>
    )
}
