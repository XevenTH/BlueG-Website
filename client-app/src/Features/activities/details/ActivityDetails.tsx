import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";
import Chat from "./chat";
import HeaderCompo from "./header";
import Info from "./info";
import Side from "./side";

export default observer(function ActivityDetails() {

    const { activityStore: { selectedActivity: activities, GetActivityById, initialLoading, ClearSelectedActivity } } = UseStore();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) GetActivityById(id);
        return () => ClearSelectedActivity();

    }, [id, GetActivityById, ClearSelectedActivity])

    if (initialLoading || !activities) return <LoadingScreen content='PLEASE WAIT.....' />;

    return (
        <Grid>
            <GridColumn width={10}>
                <HeaderCompo activity={activities} />
                <Info activity={activities} />
                <Chat activityId={activities.id} activity={activities} />
            </GridColumn>
            <GridColumn width={6}>
                <Side activity={activities} />
            </GridColumn>
        </Grid>
    )
})