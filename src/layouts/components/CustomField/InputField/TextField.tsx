import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const InputField = ({ label, error, control, name, className = '', ...propFieldInput }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            <Input
                                {...field}
                                {...propFieldInput}
                                className={`${className} ${error && name && error[name]?.message && 'is-invalid'}`}
                            />
                            <ErrorMessage
                                errors={error}
                                name={name}
                                render={({ message }) => <p className="error-validate">{message}</p>}
                            />
                        </>
                    );
                }}
            />
        </FormControl>
    );
};

export default InputField;
