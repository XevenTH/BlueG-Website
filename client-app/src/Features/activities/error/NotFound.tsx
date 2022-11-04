import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment, SegmentInline } from "semantic-ui-react";

export default function NotFound()
{
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Something Went Wrong
            </Header>
            <SegmentInline>
                <Button as={Link} to='/games' primary >
                    Go Back
                </Button>
            </SegmentInline>
        </Segment>
    )
}