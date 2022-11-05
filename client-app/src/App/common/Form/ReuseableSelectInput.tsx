import { useField } from "formik"
import { Select, FormField, Label } from "semantic-ui-react"

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function ReuseableSelectInput(props: Props) {
    const [field, meta, helper] = useField(props.name)

    return (
        <FormField style={{ fontSize: '1.2em' }} error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                closeOnChange
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helper.setValue(d.value)}
                onBlur={() => helper.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing="above" content={meta.error} />
            ) : null}
        </FormField>
    )
}