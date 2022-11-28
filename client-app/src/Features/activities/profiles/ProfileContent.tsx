import { observer } from "mobx-react-lite"
import { Tab } from "semantic-ui-react"
import { UseStore } from "../../../App/Containers/storeContainer"
import { Profile } from "../../../App/Models/profile"
import FollowingFollowers from "./FollowingFollowers"
import ProfileAbout from "./ProfileAbout"
import ProfilePhotos from "./ProfilePhotos"

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({ profile }: Props) {
    const { ProfileStore } = UseStore();

    const panes = [
        { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
        { menuItem: 'Followers', render: () => <FollowingFollowers /> },
        { menuItem: 'Following', render: () => <FollowingFollowers /> }
    ]

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => ProfileStore.SetActiveTab(data.activeIndex)}
        />
    )
})