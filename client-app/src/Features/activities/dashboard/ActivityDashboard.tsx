import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];

    selectedActivity: Activity | undefined
    formMode: boolean

    setActivity: (id: string) => void;
    cancelActivity: () => void;
    setFormMode: (id: string) => void;
    setCancelFormMode: () => void;
    setCreateEdit: (activity: Activity) => void;
    setDelete: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, formMode,
    setActivity, cancelActivity, setFormMode, setCancelFormMode, setCreateEdit, setDelete }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    setActivity={setActivity}
                    setDelete={setDelete}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !formMode &&
                    <ActivityDetails
                        activities={selectedActivity}
                        cancelActivity={cancelActivity}
                        setFormMode={setFormMode}
                    />}
                {formMode &&
                    <ActivityForm cancelFormMode={setCancelFormMode} selectedActivity={selectedActivity} setCreateEdit={setCreateEdit} />}
            </Grid.Column>
        </Grid>
    )
}

