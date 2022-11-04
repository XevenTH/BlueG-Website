import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";


export default observer(function ServerError() {
    const { commonStore } = UseStore();
    const { error } = commonStore

    return (
        <Container>
            <Segment style={{ textAlign: 'center' }}>
                <Header as='h1' content='SERVER ERROR' color="red" />
                <Header as='h3' content={error?.message} />
            </Segment>
            {error?.details &&
                <Segment placeholder>
                    <code style={{ marginTop: '10px' }}>{error.details}</code>
                </Segment>
            }
        </Container>
    )
})