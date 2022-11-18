import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
const TextareaField = ({ label, error, control, name, className = '', ...propFieldInput }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            <Textarea
                                {...propFieldInput}
                                {...field}
                                className={`${error && name && error[name]?.message && 'is-invalid'}`}
                            />
                            <p className="error-validate">{error && name && error[name]?.message}</p>
                        </>
                    );
                }}
            />
        </FormControl>
    );
};

export default TextareaField;
