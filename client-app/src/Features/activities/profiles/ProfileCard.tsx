import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";

interface Props {
    profile: Profile
}

export default function ProfileCard({ profile }: Props) {

    function truncate(str: string | undefined) {
        if (str) {
        return str.length > 40 ? str.substring(0, 37) + '...' : str;
        }
        }

    return (
        <Card>
            <Image src={profile.image || '/assets/user.png'} />
            <CardContent>
                <CardHeader as={Link} to={`profile/${profile.userName}`} content={profile.displayName} />
                <CardDescription content={truncate(profile.bio)} style={{fontSize: '1.25em'}} />
            </CardContent>
            <CardContent extra>
                <Icon name='user' />
                100 Followers
            </CardContent>
        </Card>
    )
}