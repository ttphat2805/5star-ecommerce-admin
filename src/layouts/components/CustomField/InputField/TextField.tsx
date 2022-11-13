import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, FastField } from 'formik';
const InputField = ({ label, className = '', name, ...props2 }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <FastField name={name}>
                {(props: any) => {
                    const { field, meta } = props;
                    return (
                        <>
                            <Input
                                {...field}
                                {...props2}
                                className={`${className} ${meta.touched && meta.error && 'is-invalid'}`}
                            />
                            <ErrorMessage component="div" name={field.name} className="error-validate" />
                        </>
                    );
                }}
            </FastField>
        </FormControl>
    );
};

export default InputField;
