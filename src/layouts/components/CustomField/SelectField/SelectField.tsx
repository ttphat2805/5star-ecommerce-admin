import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

const SelectField = ({ label, options, defaultValue, placeholder, ...props }: any) => {
    const [field, meta] = useField(props);

    return (
        <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <Select {...field} {...props} className={`${meta.touched && meta.error && 'is-invalid'}`}>
                <option hidden>{placeholder}</option>
                {options?.map((category: string | any, index: number) => (
                    <option key={index} value={category.value}>
                        {category.value}
                    </option>
                ))}
            </Select>
            <ErrorMessage component="span" name={field.name} className="error" />
        </FormControl>
    );
};

export default SelectField;
