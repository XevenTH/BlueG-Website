import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to={'/'} exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    BlueG
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/games'} name='Activities' />
                <Menu.Item>
                    <Button as={NavLink} to={'/createroom'} positive content='Create Room' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}