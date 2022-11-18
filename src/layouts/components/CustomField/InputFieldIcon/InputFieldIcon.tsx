import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const InputFieldIcon = ({
    label,
    className = '',
    icon,
    fontSize = '20px',
    color = '#636e72',
    error,
    control,
    name,
    ...propFieldInput
}: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    height="100%"
                                    left="5px"
                                    fontWeight="bold"
                                    fontSize={fontSize}
                                    color={color}
                                    children={icon}
                                />
                                <Input
                                    {...field}
                                    {...propFieldInput}
                                    borderRight="2px solid var(--primary)"
                                    className={`${className} ${error && name && error[name]?.message && 'is-invalid'}`}
                                />
                            </InputGroup>
                            <p className="error-validate">{error && name && error[name]?.message}</p>
                        </>
                    );
                }}
            />
        </FormControl>
    );
};

export default InputFieldIcon;
