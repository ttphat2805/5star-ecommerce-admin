import { ErrorMessage, useField } from 'formik';
import './RadioField.scss';
const RadioField = ({ label, id, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input
                type="radio"
                id={id}
                {...field}
                {...props}
                checked={field.value === props.value}
                className={`radio-field ${meta.touched && meta.error && 'is-invalid'}`}
            />
            <label className="radio-field-label" htmlFor={id}>
                {label}
            </label>
            <ErrorMessage component="span" name={field.name} className="error-validate" />
        </>
    );
};

export default RadioField;
