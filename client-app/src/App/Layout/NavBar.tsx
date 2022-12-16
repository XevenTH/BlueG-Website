import { observer } from 'mobx-react-lite';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
import { UseStore } from '../Containers/storeContainer';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = UseStore();
    const navigate = useNavigate();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to={'/'} header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    BlueG
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/games'} name='Activities' />
                <Menu.Item as={NavLink} to={'/testerror'} name='Erorr' />
                <Menu.Item>
                    <Button as={NavLink} to={'/createroom'} positive content='Create Room' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName} >
                        <DropdownMenu>
                            <DropdownItem as={Link} to={`/profile/${user?.userName}`} 
                                text='Profile' icon='user' />
                            <DropdownItem onClick={() => logout().then(() => navigate('/'))} 
                                text='Logout' icon='power' />
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})