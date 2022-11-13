import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ErrorMessage, FastField } from 'formik';
const InputFieldIcon = ({
    label,
    className = '',
    icon,
    fontSize = '20px',
    color = '#636e72',
    name,
    ...props2
}: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <FastField name={name}>
                {(props: any) => {
                    const { field, meta } = props;
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
                                    {...props2}
                                    borderRight="2px solid var(--primary)"
                                    className={`${className} ${meta.touched && meta.error && 'is-invalid'}`}
                                />
                            </InputGroup>

                            <ErrorMessage component="div" name={field.name} className="error-validate" />
                        </>
                    );
                }}
            </FastField>
        </FormControl>
    );
};

export default InputFieldIcon;
