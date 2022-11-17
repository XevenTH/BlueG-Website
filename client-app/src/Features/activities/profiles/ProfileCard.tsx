import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";

interface Props {
    profile: Profile
}

export default function ProfileCard({ profile }: Props) {
    return (
        <Card>
            <Image src={profile.image || '/assets/user.png'} />
            <CardContent>
                <CardHeader as={Link} to={`profile/${profile.userName}`} content={profile.displayName} />
                <CardDescription content='Bio' />
            </CardContent>
            <CardContent extra>
                <Icon name='user' />
                100 Followers
            </CardContent>
        </Card>
    )
}