import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import ReuseableTextInput from "../../../App/common/Form/ReuseableTextInput";
import { UseStore } from "../../../App/Containers/storeContainer";

export default observer(function LoginForm() {
    const { userStore } = UseStore()

    return (
        <Formik initialValues={{ email: '', password: '', error: null }}
            onSubmit={((value, { setErrors }) => userStore.login(value).catch(() =>
                setErrors({ error: 'Invalid Email or Password' })))}
        > 
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login To BlueG' size='huge' color='teal' textAlign='center' />
                    <ReuseableTextInput name='email' placeholder='Email' />
                    <ReuseableTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive fluid content='Login!' type='submit' />
                </Form>
            )}
        </Formik>
    )
})