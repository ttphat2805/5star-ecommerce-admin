import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const SelectField = ({ label, error, control, name, options, defaultValue, placeholder, ...props }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { isTouched } }) => {
                    return (
                        <>
                            <Select
                                {...field}
                                {...props}
                                className={`${error && name && error[name]?.message && 'is-invalid'}`}
                            >
                                <option hidden>{placeholder}</option>
                                {options?.map((category: string | any, index: number) => (
                                    <option key={index} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </Select>
                            <p className="error-validate">{error && name && error[name]?.message}</p>
                        </>
                    );
                }}
            />
        </FormControl>
    );
};

export default SelectField;
