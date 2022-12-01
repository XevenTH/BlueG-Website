import { observer } from "mobx-react-lite";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";

export default observer(function Filter() {
    const { activityStore: { predicate, SetPredicate } } = UseStore()

    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: '42px' }}>
                <Header icon='filter' attached color='teal' content='Filter' />
                <Menu.Item 
                    content='All Room'
                    active={predicate.has('all')}
                    onClick={() => SetPredicate('all', 'true')}
                />
                <Menu.Item 
                    content='Hosted' 
                    active={predicate.has('isHost')}
                    onClick={() => SetPredicate('isHost', 'true')}
                />
                <Menu.Item 
                    content='On Going'
                    active={predicate.has('isGoing')}
                    onClick={() => SetPredicate('isGoing', 'true')}
                />
            </Menu>
            <Calendar
                onChange={(date: any) => SetPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
             />
        </>
    )
})