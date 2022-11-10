import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { UseStore } from "../../App/Containers/storeContainer";
import LoginForm from "../activities/users/LoginForm";
import RegisterForm from "../activities/users/RegisterForm";

export default function HomePage() {
    const { userStore, modalsStore } = UseStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 15 }} />
                    BlueG
                </Header>
                {userStore.IsLogging ?
                    <>
                        <Header as='h2' inverted content='Welcome To BlueG' />
                        <Button as={Link} to='/games' size="huge" inverted content='Find Games' />
                    </>
                    :
                    <>
                        <Button onClick={() => modalsStore.openForm(<LoginForm />)} size="huge" inverted content='Login' />
                        <Button onClick={() => modalsStore.openForm(<RegisterForm />)} size="huge" inverted content='Register' />
                    </>
                }
            </Container>
        </Segment>
    )
}