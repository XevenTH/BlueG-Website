import React from 'react'
import { Button, Container, Menu } from "semantic-ui-react";
import { UseStore } from '../Containers/storeContainer';

export default function NavBar() {
    const { activityStore } = UseStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    BlueG
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => activityStore.FormModeHandler()} positive content='Create Room' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}