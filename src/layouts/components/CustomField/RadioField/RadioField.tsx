import { Controller } from 'react-hook-form';
import './RadioField.scss';
const RadioField = ({ label, error, id, control, name, ...propFieldInput }: any) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <>
                        <input
                            type="radio"
                            id={id}
                            {...field}
                            {...propFieldInput}
                            checked={String(field.value) === String(propFieldInput.value)}
                            className={`radio-field ${error && name && error[name]?.message && 'is-invalid'}`}
                        />
                        <label className="radio-field-label" htmlFor={id}>
                            {label}
                        </label>
                        <span className="error-validate">{error && name && error[name]?.message}</span>
                    </>
                );
            }}
        />
    );
};

export default RadioField;
