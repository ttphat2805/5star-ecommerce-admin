import { Tbody, Td, Tr } from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React from 'react';
import { InputField } from '../../CustomField';
const FieldArrayTable = ({ formik }: any) => {
    return (
        <FieldArray
            name="variable_attribute"
            render={(arrayHelpers) => {
                return (
                    <Tbody>
                        {formik.values.classify_1?.map((item1: any, index: any) => {
                            const lengthOfClassify_2 = formik.values.classify_2.length || 2;
                            return (
                                <React.Fragment key={index}>
                                    {formik.values.classify_2?.map((item2: any, index: any) => (
                                        <Tr key={index}>
                                            {/* CHECK AVOID RENDER MULTIPLE && DATA HAVE TO EXIST*/}
                                            {index === 0 && (
                                                <Td className="!text-center" rowSpan={lengthOfClassify_2}>
                                                    {item1.attribute || 'Tên'}
                                                </Td>
                                            )}
                                            <Td className="!text-center"> {item2.attribute || 'Loại'}</Td>
                                            <Td className="!text-center">
                                                <InputField
                                                    type="text"
                                                    required
                                                    name={`variable_attribute.${index}.price.${item1.attribute}`}
                                                />
                                            </Td>
                                            <Td className="!text-center">
                                                <InputField
                                                    type="text"
                                                    required
                                                    name={`variable_attribute.${index}.quantity.${item1.attribute}`}
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </Tbody>
                );
            }}
        />
    );
};

export default FieldArrayTable;
