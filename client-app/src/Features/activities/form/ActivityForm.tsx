import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";
import { GetInitialModel } from "../../../App/Models/Activity";

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = UseStore();
    const { CreateActivity, UpdateActivity, GetActivityById, isSubmitting, initialLoading } = activityStore
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState(GetInitialModel());

    useEffect(() => {
        if (id) GetActivityById(id).then(data => setActivity(data!));
    }, [id, GetActivityById])

    function LocalUpdateActivity() {
        if (activity.id.length === 0) {
            CreateActivity(activity).then(data => {
                history.push(`/games/${data!.id}`);
            })
        }
        else {
            UpdateActivity(activity).then(() => {
                history.push(`/games/${activity.id}`);
            })
        }
    }

    function OnChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (initialLoading) return <LoadingScreen content='PLEASE WAIT.....' />;

    return (

        <Segment>
            <Form onSubmit={LocalUpdateActivity} autoComplete='off'>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Title</label>
                    <input name='title' value={activity.title} onChange={OnChangeHandler} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Discriprion</label>
                    <textarea name='description' value={activity.description} onChange={OnChangeHandler} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Date</label>
                    <input type={'date'} name='date' value={activity.date} onChange={OnChangeHandler} placeholder='Date' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>Category</label>
                    <input name='category' value={activity.category} onChange={OnChangeHandler} placeholder='Category' />
                </Form.Field>
                <Form.Field>
                    <label style={{ 'fontSize': '1.1em' }}>City</label>
                    <input name='city' value={activity.city} onChange={OnChangeHandler} placeholder='City' />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input name='venue' value={activity.venue} onChange={OnChangeHandler} placeholder='Venue' />
                </Form.Field>
                <Button as={Link} to={'/games'}
                    basic type='button' icon='cancel' color='grey' content='Cancel' labelPosition='left' />

                <Button loading={isSubmitting}
                    basic type='submit' floated='right' icon='hand point left outline' color='green' content='Submit' labelPosition='right' />
            </Form>
        </Segment>
    )
})