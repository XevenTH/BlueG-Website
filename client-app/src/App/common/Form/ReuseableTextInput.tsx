import { useField } from "formik"
import { FormField, Label } from "semantic-ui-react"

interface Props {
    placeholder: string,
    name: string,
    label?: string,
}

export default function ReuseableTextInput(props: Props) {
    const [field, meta] = useField(props.name)

    return (
        <FormField style={{ fontSize: '1.2em' }} error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing="above" content={meta.error} />
            ) : null}
        </FormField>
    )
}