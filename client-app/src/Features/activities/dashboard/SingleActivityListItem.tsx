import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, ListItem, Popup, PopupContent } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";
import ProfileCard from "../profiles/ProfileCard";

interface Props {
    profile: Profile[];
}

export default observer(function SingleActivityListItem({ profile: profiles }: Props) {
    const style = {
        borderColor: 'orange',
        borderWidth: 2,
    }

    return (
        <List horizontal>
            {profiles.map(profile =>
                <Popup
                    hoverable
                    key={profile.userName}
                    size='tiny'
                    trigger={
                        <ListItem key={profile.userName} as={Link} to={`profile/${profile.userName}`}>
                            <Image src={profile.image || "/assets/user.png"}
                                size="mini" circular bordered style={profile.following ? style : null}
                            />
                        </ListItem>
                    }>
                    <PopupContent>
                        <ProfileCard profile={profile} />
                    </PopupContent>
                </Popup>
            )}
        </List>
    )
})