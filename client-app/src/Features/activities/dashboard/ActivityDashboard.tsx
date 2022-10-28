import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = UseStore();
    const { selectedActivity, formMode } = activityStore

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !formMode &&
                    <ActivityDetails />}
                {formMode &&
                    <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})