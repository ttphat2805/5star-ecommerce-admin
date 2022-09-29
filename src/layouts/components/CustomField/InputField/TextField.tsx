import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
const InputField = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);

    return (
        <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <Input {...props} {...field} className={`${meta.touched && meta.error && 'is-invalid'}`} />
            <ErrorMessage component="span" name={field.name} className="error" />
        </FormControl>
    );
};

export default InputField;
