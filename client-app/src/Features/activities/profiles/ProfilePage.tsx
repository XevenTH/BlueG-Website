import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>()
    const { ProfileStore } = UseStore();
    const { profile, loadProfile, SetProfile } = ProfileStore;

    useEffect(() => {
        SetProfile(username);
    }, [SetProfile, username])

    if (loadProfile) return <LoadingScreen content='PLEASE WAIT....' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                }
            </Grid.Column>
        </Grid>
    )
})