import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import ProfileCard from "./ProfileCard";

export default observer(function FollowingFollowers() {
    const { ProfileStore } = UseStore();
    const { profile, loading: loadFollowers, followingUsers, activeTab } = ProfileStore

    return (
        <Tab.Pane loading={loadFollowers}>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                    floated='left' 
                    icon='user' 
                    content={ activeTab === 3 ? `${profile?.displayName} Followers` : `Following` } />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followingUsers.map((profile) => (
                            <ProfileCard key={profile.userName} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})