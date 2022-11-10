import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import ReuseableTextInput from "../../../App/common/Form/ReuseableTextInput";
import { UseStore } from "../../../App/Containers/storeContainer";
import ErrorView from "../error/errorview";

export default observer(function RegisterForm() {
    const { userStore } = UseStore();

    const validations = Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    })

    return (
        <Formik initialValues={{ displayName: '', userName: '', email: '', password: '', error: null }}
            onSubmit={((value, { setErrors }) => userStore.register(value).catch(error =>
                setErrors({ error })))}
            validationSchema={validations}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign Up To BlueG' size='huge' color='teal' textAlign='center' />
                    <ReuseableTextInput name='email' placeholder='Email' />
                    <ReuseableTextInput name='password' placeholder='Password' type='Password' />
                    <ReuseableTextInput name='displayName' placeholder='Display Name' />
                    <ReuseableTextInput name='userName' placeholder='User Name' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ErrorView error={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting}
                        positive fluid content='Sign Up!' type='submit' />
                </Form>
            )}
        </Formik>
    )
})