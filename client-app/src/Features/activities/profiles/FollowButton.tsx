import { observer } from "mobx-react-lite"
import { SyntheticEvent } from "react"
import { Button, Reveal } from "semantic-ui-react"
import { UseStore } from "../../../App/Containers/storeContainer"
import { Profile } from "../../../App/Models/profile"

interface Props {
    profile: Profile
}

export default observer(function FollowButton({ profile }: Props) {
    const { ProfileStore, userStore } = UseStore();
    const { uploading, FollowingFollowers } = ProfileStore;

    if (userStore.user?.userName === profile.userName) return null;

    function followHandle(e: SyntheticEvent) {
        e.preventDefault();
        profile.following ? FollowingFollowers(profile.userName, false) : FollowingFollowers(profile.userName, true);
    }

    return (
        <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                    fluid
                    color={profile.following ? 'green' : 'teal'}
                    content={profile.following ? 'Following' : 'Follow'} />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
                <Button
                    onClick={e => followHandle(e)}
                    fluid
                    basic
                    color={profile.following ? 'red' : 'teal'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={uploading} />
            </Reveal.Content>
        </Reveal>
    )
})