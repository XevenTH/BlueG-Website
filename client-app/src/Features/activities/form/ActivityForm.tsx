import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity, GetInitialModel } from "../../../App/Models/Activity";

interface Props {
    selectedActivity: Activity | undefined
    cancelFormMode: () => void;
    setCreateEdit: (activity: Activity) => void;
    isSubmit: boolean
}

export default function ActivityForm({ selectedActivity, cancelFormMode, setCreateEdit, isSubmit}: Props) {

    GetInitialModel(selectedActivity)

    const [activity, setActivity] = useState(GetInitialModel(selectedActivity));

    function UpdateActivity() {
        setCreateEdit(activity);
    }

    function UpdateChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (

        <Segment>
            <Form onSubmit={UpdateActivity} autoComplete='off'>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Title</label>
                    <input name='title' value={activity.title} onChange={UpdateChangeHandler} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Discriprion</label>
                    <textarea name='description' value={activity.description} onChange={UpdateChangeHandler} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Date</label>
                    <input type={'date'} name='date' value={activity.date} onChange={UpdateChangeHandler} placeholder='Date' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Category</label>
                    <input name='category' value={activity.category} onChange={UpdateChangeHandler} placeholder='Category' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>City</label>
                    <input name='city' value={activity.city} onChange={UpdateChangeHandler} placeholder='City' />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input name='venue' value={activity.venue} onChange={UpdateChangeHandler} placeholder='Venue' />
                </Form.Field>
                <Button onClick={cancelFormMode} basic type='button' icon='cancel' color='grey' content='Cancel' labelPosition='left' />
                <Button loading={isSubmit} basic type='submit' floated='right' icon='hand point left outline' color='green' content='Submit' labelPosition='right' />
            </Form>
        </Segment>
    )

}