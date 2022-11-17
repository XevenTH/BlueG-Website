import { Fragment } from "react";
import { Header, Item } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import SingleActivityList from "./SingleActivityList";

export default function ActivityList() {

    const { activityStore } = UseStore();
    const { groupAllActivities: activities} = activityStore

    return (
        <>
            {activities.map(([dateArray, activitiy]) => (

                //Data Example
                // [
                //  ["2021-10-1": [ {Activity}, {Activity} ]],
                //  ["2021-11-12": [ {Activity}, {Activity} ]],
                // ]

                <Fragment key={dateArray}>
                    <Header sub color="green" style={{fontSize: '1.3em'}}>
                       Hosted At {dateArray}
                    </Header>
                    <Item.Group divided>
                        {activitiy.map(singleActivity => (
                            <SingleActivityList key={singleActivity.id} singleActivity={singleActivity} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </>
    )
} 
