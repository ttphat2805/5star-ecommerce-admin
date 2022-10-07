import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, FastField } from 'formik';
const InputField = ({ label, className, name, ...props }: any) => {
    // const [field, meta] = useField(props);

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
                                className={`${className} ${meta.touched && meta.error && 'is-invalid'}`}
                            />
                            <ErrorMessage component="span" name={field.name} className="error" />
                        </>
                    );
                }}
            </FastField>
        </FormControl>
    );
};

export default InputField;
