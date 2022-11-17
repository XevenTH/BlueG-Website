import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import ReuseableDate from '../../../App/common/Form/ReuseableDate';
import ReuseableSelectInput from '../../../App/common/Form/ReuseableSelectInput';
import ReuseableTextArea from '../../../App/common/Form/ReuseableTextArea';
import ReuseableTextInput from '../../../App/common/Form/ReuseableTextInput';
import { Options } from '../../../App/common/Options/SelectInputOptions';
import { UseStore } from "../../../App/Containers/storeContainer";
import LoadingScreen from "../../../App/Layout/loadingCompo";
import { ActivityFormValues } from "../../../App/Models/Activity";

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = UseStore();
    const { UpdateActivity, CreateActivity, GetActivityById, initialLoading } = activityStore
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    useEffect(() => {
        if (id) GetActivityById(id).then(data => setActivity(new ActivityFormValues(data)));
    }, [id, GetActivityById])

    const validations = Yup.object({
        title: Yup.string().required('This Field Cannot Be Empty'),
        description: Yup.string().required('This Field Cannot Be Empty'),
        date: Yup.string().required('This Field Cannot Be Empty').nullable(),
        category: Yup.string().required('This Field Cannot Be Empty'),
        city: Yup.string().required('This Field Cannot Be Empty'),
        venue: Yup.string().required('This Field Cannot Be Empty'),
    })

    function LocalUpdateActivity(activity: ActivityFormValues) {
        if (!activity.id) {
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

    if (initialLoading) return <LoadingScreen content='PLEASE WAIT.....' />;

    return (
        <Segment clearing>
            <Formik validationSchema={validations}
                enableReinitialize initialValues={activity} onSubmit={value => LocalUpdateActivity(value)}  >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form autoComplete='off' className='ui form' onSubmit={handleSubmit}>
                        <ReuseableTextInput placeholder='Title' name='title' label='Title' />
                        <ReuseableTextArea rows={4} placeholder='Description' name='description' label='Description' />
                        <ReuseableDate
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <ReuseableSelectInput options={Options} placeholder='Category' name='category' label='Category' />
                        <ReuseableTextInput placeholder='City' name='city' label='City' />
                        <ReuseableTextInput placeholder='Vanue' name='venue' label='Venue' />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting}
                            basic style={{ marginTop: '1.1em' }} type='submit' floated='right' icon='hand point left outline' color='green' content='Submit' labelPosition='right' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})