import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function Filter() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: '35px' }}>
                <Header icon='filter' attached color='teal' content='Filter' />
                <Menu.Item content='All Room' />
                <Menu.Item content='All Room' />
                <Menu.Item content='All Room' />
            </Menu>
            <Calendar />
        </>
    )
}