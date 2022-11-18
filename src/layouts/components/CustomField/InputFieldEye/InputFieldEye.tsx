import { Button, FormControl, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

const InputFieldEye = ({
    label,
    error,
    control,
    name,
    showPassword,
    setShowPassword,
    className = '',
    ...propFieldInput
}: any) => {
    return (
        <FormControl>
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
                                    fontSize="20px"
                                    color="#636e72"
                                    children={<RiLockPasswordLine />}
                                />
                                <Input
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    name={name}
                                    borderRadius="10px"
                                    paddingY={7}
                                    {...propFieldInput}
                                    borderRight="2px solid var(--primary)"
                                    className={`${className} ${error && name && error[name]?.message && 'is-invalid'}`}
                                />
                                <InputRightElement height="100%" right="10px" fontWeight="bold" fontSize="20px">
                                    <Button h="1.75rem" size="sm" fontSize="lg" onClick={setShowPassword}>
                                        {showPassword ? <HiEyeOff /> : <HiEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
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

export default InputFieldEye;
