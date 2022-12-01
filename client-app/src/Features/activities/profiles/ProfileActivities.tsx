import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Image, Menu, Tab } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import { Events } from "../../../App/Models/Events";

export default observer(function ProfileActivities() {
    const { ProfileStore: { eventsList, GetAllEvents, loading } } = UseStore();
    const { username } = useParams<{ username: string }>()

    const [activeTab, SetActiveTab] = useState<string>();
    const [choose, setChoose] = useState(false);

    function setEvents(predicate: string) {
        GetAllEvents(predicate, username);
        SetActiveTab(predicate);
        setChoose(true);
    }

    return (
        <Tab.Pane loading={loading}>
            <Grid >
                {!choose ? (
                    <Button
                        onClick={() => setEvents("future")}
                        size="huge"
                        content="See ALL Activities"
                        fluid
                        basic
                        positive style={{ marginTop: "3em", marginLeft: "20px", marginRight: "20px" }} />
                ) :
                    <Grid.Column width={16}>
                        <Menu tabular style={{ fontSize: '1.1em' }}>
                            <Menu.Item
                                content="Future Event"
                                onClick={() => setEvents("future")}
                                active={activeTab === "future"}
                            />
                            <Menu.Item
                                content="Past Events"
                                onClick={() => setEvents("past")}
                                active={activeTab === "past"}
                            />
                            <Menu.Item
                                content="Hosted"
                                onClick={() => setEvents("hosting")}
                                active={activeTab === "hosting"}
                            />
                        </Menu>
                    </Grid.Column>
                }
                <Grid.Column width={16} >
                    <Card.Group itemsPerRow={4} centered>
                        {eventsList.map((event: Events) => (
                            <Card
                                as={Link}
                                to={`/games/${event.id}`}
                                key={event.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${event.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }} />
                                <Card.Content>
                                    <Card.Header
                                        textAlign='center'>{event.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(event.date), 'do LLL')}</div>
                                        <div>{format(new Date(event.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})