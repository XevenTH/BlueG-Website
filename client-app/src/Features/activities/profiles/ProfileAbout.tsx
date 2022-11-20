import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Grid, Header, Item, Tab } from "semantic-ui-react";
import ReuseableTextArea from "../../../App/common/Form/ReuseableTextArea";
import ReuseableTextInput from "../../../App/common/Form/ReuseableTextInput";
import { UseStore } from "../../../App/Containers/storeContainer";
import { AboutInitialModel, Profile } from "../../../App/Models/profile";
import * as Yup from 'yup'

interface Props {
    profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { ProfileStore: { UpdateBio }, ProfileStore: { isLoggedUser } } = UseStore()
    const [isEditing, setIsEditing] = useState(true);

    const validations = Yup.object({
        displayName: Yup.string().required('This Field Cannot Be Empty'),
    })

    function LocalUpdateProfile(value: AboutInitialModel) {
        UpdateBio(value).then(() => setIsEditing(!isEditing));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Item.Group>
                        <Header floated='left' as='h1' content={"About " + profile.displayName} />
                        {isLoggedUser && (
                            <>
                                {isEditing ? (
                                    <Button onClick={() => setIsEditing(!isEditing)}
                                        basic floated='right' color="green" content="Edit" icon='pencil alternate' />
                                ) :
                                    <Button onClick={() => setIsEditing(!isEditing)}
                                        basic floated='right' color="red" content="Cancel" icon='cancel' />
                                }
                            </>
                        )}
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={16}>
                    {isEditing ? (
                        <Item.Content style={{ fontSize: "1.15em", whiteSpace: 'pre-wrap' }} content={profile.bio} />
                    ) :
                        <>
                            <Formik validationSchema={validations}
                                initialValues={{ displayName: profile?.displayName, bio: profile?.bio }} enableReinitialize
                                onSubmit={value => LocalUpdateProfile(value)}>
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form autoComplete='off' className='ui form' onSubmit={handleSubmit} >
                                        <ReuseableTextInput
                                            placeholder='Display Name'
                                            name='displayName'
                                            label='Display Name' />
                                        <ReuseableTextArea
                                            rows={4}
                                            placeholder='Bio'
                                            name='bio'
                                            label='Bio' />
                                        <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting}
                                            basic type='submit' floated='right' icon='hand point left outline' color='green' content='Submit' labelPosition='right' />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})