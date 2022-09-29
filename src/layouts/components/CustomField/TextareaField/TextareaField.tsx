import { FormControl, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
const TextareaField = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <FormControl>
            <Textarea {...props} {...field} />
        </FormControl>
    );
};

export default TextareaField;
