import { useField } from "formik"
import { FormField, Label } from "semantic-ui-react"
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

export default function ReuseableDate(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!)

    return (
        <FormField style={{ fontSize: '1.2em' }} error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing="above" content={meta.error} />
            ) : null}
        </FormField>
    )
}