import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";
import ActivityList from "./ActivityList";
import Filter from "./filter";

export default observer(function ActivityDashboard() {
    const { activityStore } = UseStore();
    const {activitiesMap, GetAllActivities, initialLoading} = activityStore;

    useEffect(() => {
        if(activitiesMap.size <= 1) GetAllActivities();
    }, [activitiesMap.size, GetAllActivities]);

    if (initialLoading) return <LoadingScreen content='PLEASE WAIT.....' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <Filter />
            </Grid.Column>
        </Grid>
    )
})