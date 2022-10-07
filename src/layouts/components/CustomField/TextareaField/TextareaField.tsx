import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ErrorMessage, FastField } from 'formik';
const TextareaField = ({ label, name, ...props }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <FastField name={name}>
                {(props: any) => {
                    const { field, meta } = props;
                    return (
                        <>
                            <Textarea
                                {...props}
                                {...field}
                                className={`${meta.touched && meta.error && 'is-invalid'}`}
                            />
                            <ErrorMessage component="span" name={field.name} className="error" />
                        </>
                    );
                }}
            </FastField>
        </FormControl>
    );
};

export default TextareaField;
